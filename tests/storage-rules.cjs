const fs=require('node:fs');
const {initializeTestEnvironment,assertSucceeds,assertFails}=require('@firebase/rules-unit-testing');
const {ref,uploadBytes,getBytes,deleteObject,updateMetadata}=require('firebase/storage');
(async()=>{
const env=await initializeTestEnvironment({projectId:'demo-from-royce-rules',storage:{host:'127.0.0.1',port:9199,rules:fs.readFileSync('storage.rules','utf8')}});
try{
const owner=env.authenticatedContext('H4pmMiCJHyVkqLU0RvPPd4blP4l1').storage(),anon=env.unauthenticatedContext().storage(),other=env.authenticatedContext('not-the-owner').storage();
const bytes=new Uint8Array([1,2,3]),path='posts/local-emulator-test.png';
await assertSucceeds(uploadBytes(ref(owner,path),bytes,{contentType:'image/png'}));
await assertSucceeds(getBytes(ref(anon,path)));
for(const user of [anon,other]){
await assertFails(uploadBytes(ref(user,'posts/denied.png'),bytes,{contentType:'image/png'}));
await assertFails(deleteObject(ref(user,path)));
await assertFails(updateMetadata(ref(user,path),{contentType:'image/jpeg'}));
}
await assertSucceeds(uploadBytes(ref(owner,'work/jpeg.jpg'),bytes,{contentType:'image/jpeg'}));
await assertFails(uploadBytes(ref(owner,'posts/html.png'),bytes,{contentType:'text/html'}));
await assertFails(uploadBytes(ref(owner,'posts/webp.webp'),bytes,{contentType:'image/webp'}));
await assertFails(uploadBytes(ref(owner,'posts/untyped'),bytes,{contentType:'application/octet-stream'}));
await assertSucceeds(uploadBytes(ref(owner,'posts/boundary.png'),new Uint8Array(10*1024*1024),{contentType:'image/png'}));
await assertFails(uploadBytes(ref(owner,'posts/oversized.png'),new Uint8Array(10*1024*1024+1),{contentType:'image/png'}));
await assertFails(updateMetadata(ref(owner,path),{contentType:'text/html'}));
await assertSucceeds(uploadBytes(ref(owner,path),bytes,{contentType:'image/jpeg'}));
await env.withSecurityRulesDisabled(async context=>uploadBytes(ref(context.storage(),'legacy/file.bin'),bytes,{contentType:'application/octet-stream'}));
await assertSucceeds(getBytes(ref(anon,'legacy/file.bin')));
await assertSucceeds(deleteObject(ref(owner,'legacy/file.bin')));
await assertSucceeds(deleteObject(ref(owner,path)));
console.log('owner JPEG/PNG10MiB boundary/update/delete pass; anonymous/non-owner/other MIME/oversize denied; legacy reads/deletes preserved');
}finally{await env.cleanup();}
})().catch(e=>{console.error(e);process.exit(1)});
