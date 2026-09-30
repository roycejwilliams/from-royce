const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const { format, parseISO } = require('date-fns');
const { toSlug, validateTitle, slugForNewRecord, insertWithStableSlug } = require('../src/lib/slug');
async function main() {
  assert.equal(toSlug(' Hello -- World! '), 'hello-world');
  assert.equal(toSlug('日本語の題名'), '日本語の題名');
  assert.equal(toSlug('Ｈｅｌｌｏ'), 'hello');
  for (const value of [' ! ', '', {}, 8, null, 'x'.repeat(501)]) assert.throws(() => validateTitle(value), {status:400});
  assert.throws(() => validateTitle('x'.repeat(256), 255), {status:400});
  assert.notEqual(slugForNewRecord('Same', true), slugForNewRecord('Same', true));
  let calls = [];
  await insertWithStableSlug('Same', async slug => { calls.push(slug); if (calls.length === 1) throw {code:'23505'}; return slug; });
  assert.equal(calls[0], 'same'); assert.match(calls[1], /^same-/);
  await assert.rejects(() => insertWithStableSlug('Fine', async () => {throw {code:'other'};}), {code:'other'});
  // Exercise the actual route handlers against a fake pool, never the real database.
  for (const [name, table, titleField] of [['posts','post','post_title'], ['work','project','title']]) {
    let handlers = {}, queries = [];
    const router = {}; for(const method of ['post','get','put','delete']) router[method]=(path,fn)=>{handlers[method+path]=fn;};
    const source = fs.readFileSync(`${__dirname}/../src/routes/${name}.js`, 'utf8');
    vm.runInNewContext(source, {require: id => id==='express' ? {Router:()=>router} : id==='../db/db' ? {query:async(sql,values)=>{queries.push({sql,values});return {rows:[{slug:values?.at(-1)}]};}} : require('../src/lib/slug'), module:{exports:{}}, console});
    let status=200, body; const res={status:code=>{status=code;return res}, json:value=>{body=value;return res},send:value=>{body=value;return res}};
    await handlers['post/']({body:{title:'!!!'}},res);assert.equal(status,400);assert.equal(queries.length,0);
    status=200;
    await handlers['post/']({body:{title:' Hello -- World! ',content:'text',descriptor:'text',role:'owner',year:'2026',src:'https://example.test/a.jpg'}},res);
    assert.equal(status,200); assert(queries[0].values.includes('hello-world'));
    await handlers['put/:id']({params:{id:'1'},body:{title:'A new title',content:'text',descriptor:'text',role:'owner',year:'2026',src:'https://example.test/a.jpg'}},res);
    assert(!/SET\s+slug|,\s*slug\s*=/i.test(queries[1].sql));assert.equal(queries[1].values.at(-1),'1');
  }
  const api = ts.transpileModule(fs.readFileSync(`${__dirname}/../../src/lib/post-format.ts`, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
  const exports={};vm.runInNewContext(api, {exports,require:id=>id==='date-fns'?{format,parseISO}:{auth:null},process});
  for (const tz of ['UTC','America/Los_Angeles','Asia/Tokyo']) {
    process.env.TZ=tz;
    for(const post_date of ['2026-09-29','2026-09-29T00:00:00.000Z']) assert.equal(exports.formatPost({post_date,post_title:'Test',slug:'test'}).formatted_date,'09/29/26');
  }
  const parsers={};vm.runInNewContext(fs.readFileSync(`${__dirname}/../src/db/db.js`,'utf8'),{require:id=>id==='pg'?{Pool:class{},types:{setTypeParser:(id,fn)=>parsers[id]=fn}}:require('../src/lib/database-config'),process:{env:{NODE_ENV:'production',DATABASE_URL:'postgresql://u:p@example.test/db?sslmode=require'}},module:{exports:{}}});
  assert.equal(parsers[1082]('2026-09-29'),'2026-09-29');
  console.log('calendar date and stable slug tests passed');
}
main().catch(error=>{console.error(error);process.exit(1);});
