const assert=require('node:assert/strict');
const fs=require('node:fs');const vm=require('node:vm');const ts=require('typescript');
function load(path,requireFn,extra={}) {const exports={};vm.runInNewContext(ts.transpileModule(fs.readFileSync(path,'utf8'),{fileName:path,compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React}}).outputText,{exports,require:requireFn,process:{env:{NODE_ENV:'production'}},AbortSignal,...extra});return exports;}
(async()=>{
 let responses=[],urls=[];
 const fetch=async(url)=>{urls.push(url);return responses.shift()};
 const server=load('src/lib/server/detail-data.ts',()=>({formatPost:p=>p,formatProject:p=>p}),{fetch});
 responses=[{status:404}];assert.equal(await server.loadBlogDetail('absent'),null);
 responses=[{status:500,ok:false}];await assert.rejects(()=>server.loadBlogDetail('failure'));
 responses=[{status:200,ok:true,json:async()=>({post_title:'Test'})}];assert.equal((await server.loadBlogDetail('a /b')).post_title,'Test');assert(urls.at(-1).endsWith('a%20%2Fb'));assert(urls.every(url=>url.startsWith('https://nextapp-gzf6b33bla-uc.a.run.app/')));
 for(const [kind,loader] of [['blog','loadBlogDetail'],['work','loadWorkDetail']]){
  let outcome;
  const page=load(`src/pages/${kind}/[slug].tsx`,id=>id.includes('detail-data')?{[loader]:async()=>{if(outcome==='error')throw new Error('api');return outcome}}:id.includes('work')?{}:{default:()=>null});
  let headers={},res={statusCode:200,setHeader:(k,v)=>headers[k]=v};
  outcome=null;assert.equal((await page.getServerSideProps({params:{slug:'none'},res})).notFound,true);
  outcome='error';let error=await page.getServerSideProps({params:{slug:'none'},res});assert.equal(res.statusCode,503);assert.equal(error.props.loadError,true);assert.equal(headers['Retry-After'],'30');
  outcome=kind==='blog'?{post_title:'test'}:{project:{title:'test'},projects:[]};let success=await page.getServerSideProps({params:{slug:'yes'},res});assert.equal(success.props.loadError,false);
 }
 console.log('detail API missing/error/encoding and page404/503/success tests passed');
})().catch(e=>{console.error(e);process.exit(1)});
