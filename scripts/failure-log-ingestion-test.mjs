import assert from 'node:assert/strict';
import {mkdtempSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import worker from '../server/failure-log/worker.js';
const exec=promisify(execFile),dir=mkdtempSync(join(tmpdir(),'boricua-log-test-')),db=join(dir,'test.sqlite');
const python=`import json,sqlite3,sys
c=sqlite3.connect(sys.argv[1],timeout=10)
sql,args,script=json.loads(sys.argv[2])
try:
 if script:c.executescript(sql);result=[];changes=0
 else:
  cur=c.execute(sql,args);result=cur.fetchall() if cur.description else [];changes=cur.rowcount
 c.commit();print(json.dumps({'meta':{'changes':max(0,changes)},'rows':result}))
except:
 c.rollback();raise
finally:c.close()`;
const query=async(sql,args=[],script=false)=>JSON.parse((await exec('python3',['-c',python,db,JSON.stringify([sql,args,script])])).stdout);
const env={DB:{prepare(sql){return {bind(...args){return {run:()=>query(sql,args)};},run:()=>query(sql)};}}};
const event={method:'GET',path:'/test',status:503,elapsed:1,reason:'controlled',release:'test'};
const request=()=>new Request('https://log.test/failures',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(event)});
const day=new Date().toISOString().slice(0,10),originalLog=console.log;console.log=()=>{};
try{
 await query(readFileSync('server/failure-log/schema.sql','utf8'),[],true);
 await query('insert into failure_days(day,n) values (?,4999)',[day]);
 const results=await Promise.all([worker.fetch(request(),env),worker.fetch(request(),env)]);
 assert.deepEqual(results.map(x=>x.status).sort(),[204,429],'only one concurrent request claims the final slot');
 assert.equal((await query('select n from failure_days where day=?',[day])).rows[0][0],5000);
 assert.equal((await query('select count(*) from failures')).rows[0][0],1);
 assert.equal((await worker.fetch(request(),env)).status,429);
 await query('update failure_days set n=0 where day=?',[day]);
 await query("create trigger test_failure after insert on failures begin select raise(abort,'test failure');end;",[],true);
 assert.equal((await worker.fetch(request(),env)).status,503);
 assert.equal((await query('select n from failure_days where day=?',[day])).rows[0][0],0,'failed report rolls quota back');
 await query('drop trigger test_failure');
 const row='insert into failures(at,method,path,status) values (?,\'GET\',\'/rollover\',503)';
 for(const at of ['2000-01-01T23:59:59.999Z','2000-01-02T00:00:00.000Z'])await query(row,[at]);
 assert.deepEqual((await query("select day,n from failure_days where day like '2000%' order by day")).rows,[['2000-01-01',1],['2000-01-02',1]],'day follows the exact captured row timestamp');
 await worker.scheduled({},env);
 assert.equal((await query('select count(*) from failures')).rows[0][0],1,'retention removes old reports only');
 assert.deepEqual((await query('select day from failure_days')).rows,[[day]],'retention keeps current counter');
 assert.equal((await worker.fetch(new Request('https://log.test/other'),env)).status,404);
}finally{console.log=originalLog;rmSync(dir,{recursive:true,force:true});}
console.log('PASS: actual ingestion, concurrent final quota slot, cap refusal, atomic rollback, UTC rollover and retention');
