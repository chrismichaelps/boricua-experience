-- One row per server failure the site reports: when, what was asked, how it answered, and why.
create table if not exists failures (
  id integer primary key autoincrement,
  at text not null,
  release text not null default '',
  method text not null,
  path text not null,
  status integer not null,
  elapsed_ms integer not null default 0,
  reason text not null default ''
);
create index if not exists failures_at on failures (at);
create index if not exists failures_path on failures (path, at);

-- Reports written each day, the shared cap every isolate checks.
create table if not exists failure_days (day text primary key, n integer not null);

-- Admission and the report row share a transaction, including rollback on insert failure.
create trigger if not exists failures_daily_limit before insert on failures
begin
  insert into failure_days (day, n) values (substr(new.at, 1, 10), 1)
    on conflict (day) do update set n = n + 1 where n < 5000;
  select case when changes() = 0 then raise(ignore) end;
end;
