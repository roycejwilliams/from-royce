const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');
function fixture(component) {
  let cursor = 0, values = [], uploadCalls = 0, creates = [], finishUpload;
  const refs = [], React = {
    createElement: (type, props, ...children) => ({type, props: props || {}, children}),
    useState: initial => { const i=cursor++; if (!(i in values)) values[i]=initial; return [values[i],v=>{values[i]=v}]; },
    useRef: initial => { const i=cursor++; return refs[i] ||= {current: initial}; },
    useEffect: () => {}
  };
  const mutation = {mutate: (data, opts) => creates.push({data,opts}), isPending:false,isSuccess:false,isError:false,reset:()=>{}};
  const sdk = {uploadImageForDraft: async () => {uploadCalls++; return new Promise((resolve,reject)=>{finishUpload={resolve,reject}});}};
  const module = {exports:{}};
  const requireMock = id => {
    if (id==='react') return {...React,default:React};
    if (id.includes('firebase')) return {storage:{}};
    if (id.includes('upload-image')) return sdk;
    if (id.includes('hooks')) return {useCreatePost:()=>mutation,useCreateWork:()=>mutation};
    return {default: id,Send:'Send',Aperture:'Aperture',CircleCheckBig:'Ok',CircleSlash:'Error'};
  };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(`src/components/${component}.tsx`,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React}}).outputText,{module,exports:module.exports,require:requireMock,URL:{revokeObjectURL:()=>{}},window:{innerHeight:900},setTimeout,clearTimeout});
  function render() {cursor=0;return module.exports.default();}
  function nodes(n) {return !n||typeof n!=='object'?[]:[n,...(n.children||[]).flat(Infinity).flatMap(nodes)];}
  function all() {return nodes(render());}
  function field(placeholder,value){const n=all().find(x=>x.props.placeholder===placeholder);assert(n,placeholder);n.props.onChange({target:{value,style:{},scrollHeight:40}});}
  function image(){const n=all().find(x=>x.props.onFilesSelected);n.props.onFilesSelected([{name:'photo.jpg',url:'blob:test'}]);}
  function submit(){const n=all().find(x=>x.type==='form');assert(n);n.props.onSubmit({preventDefault:()=>{}});}
  return {render,all,field,image,submit,get uploadCalls(){return uploadCalls},get creates(){return creates},get finishUpload(){return finishUpload}};
}
(async()=>{
  for(const component of ['draft','workDraft']) {
    const f=fixture(component);
    f.field('Title','Test');
    if(component==='draft') f.field('Let it out.','Body');
    else {f.field('One line descriptor','Descriptor');f.field('Role','Designer');f.field('Year','2026');}
    f.image();
    // Capture the same event handler before React has time to re-render.
    const submit=f.all().find(x=>x.type==='form').props.onSubmit;
    submit({preventDefault:()=>{}});submit({preventDefault:()=>{}});
    assert.equal(f.uploadCalls,1);assert.equal(f.creates.length,0);
    f.finishUpload.reject(new Error('offline'));await new Promise(r=>setImmediate(r));
    assert(f.all().some(x=>x.props.role==='alert'));assert(f.all().some(x=>x.type==='form'));
    f.submit();assert.equal(f.uploadCalls,2);f.finishUpload.resolve('https://example.test/photo.jpg');await new Promise(r=>setImmediate(r));
    assert.equal(f.creates.length,1);assert(!f.all().some(x=>x.type==='form'));
    // An uncertain create failure leaves the successful upload URL in state.
    f.creates[0].opts.onSettled();f.submit();await new Promise(r=>setImmediate(r));
    assert.equal(f.uploadCalls,2);assert.equal(f.creates.length,2);
    assert.equal(f.creates[1].data[component==='draft'?'image':'src'],'https://example.test/photo.jpg');
    f.creates[1].opts.onSuccess();f.creates[1].opts.onSettled();
    assert.equal(f.all().find(x=>x.props.placeholder==='Title').props.value,'');
  }
  console.log('both editors: rapid double-submit, upload failure recovery, successful URL reuse on uncertain create, and success reset pass');
})().catch(error=>{console.error(error);process.exit(1)});
