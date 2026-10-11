import assert from 'node:assert/strict';
class Node {
  constructor(tag = '#text', text = '') { this.tagName = tag; this.textContent = text; this.children = []; }
  append(...nodes) { for (const node of nodes) { if (node.tagName === '#fragment') this.children.push(...node.children); else this.children.push(node); } }
  replaceChildren(...nodes) { this.children = []; this.append(...nodes); }
}
globalThis.document = { createElement: tag => new Node(tag), createTextNode: text => new Node('#text', text), createDocumentFragment: () => new Node('#fragment') };
const { renderMarkdown } = await import('../public/assets/js/features/assistantMarkdown.js');
const target = new Node('div'), all = root => [root, ...root.children.flatMap(all)];
renderMarkdown(target, '### Plan\n\n**Música** y *cultura*\n\n- Primero\n- Segundo\n\n| Pueblo | Plan |\n|---|---|\n| San Juan | Música |\n\n```js\n<script>no()</script>\n```');
for (const tag of ['h3','strong','em','ul','li','table','th','td','pre','code']) assert.ok(all(target).some(n => n.tagName === tag), tag);
renderMarkdown(target, '<script>alert(1)</script>\n\n![foto](https://evil.test/track)\n\n[bad](javascript:alert(1)) [remote](https://evil.test/) [real](/e/real-plan) [fake](/e/fake-plan)', ['/e/real-plan']);
assert.ok(!all(target).some(n => ['script','img'].includes(n.tagName)));
assert.deepEqual(all(target).filter(n => n.tagName === 'a').map(n => n.href), ['/e/real-plan']);
assert.ok(all(target).some(n => n.textContent.includes('<script>')), 'raw HTML remains text');
renderMarkdown(target, '- [x] Hecho\n- [ ] Pendiente');
const checks = all(target).filter(n => n.tagName === 'input');
assert.equal(checks.length, 2); assert.ok(checks.every(n => n.disabled)); assert.equal(checks[0].checked, true);
renderMarkdown(target, 'x'.repeat(9000));
assert.equal(all(target).map(n => n.textContent).join('').length, 6000);
console.log('PASS: Markdown structure, raw HTML/image rejection, verified-only links, disabled tasks and output bounds');
