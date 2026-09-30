const assert=require('node:assert/strict'),net=require('node:net'),tls=require('node:tls'),fs=require('node:fs');
const {Client}=require('../functions/node_modules/pg');const {databaseConfig}=require('../functions/src/lib/database-config');
(async()=>{
const path=require('node:path'),os=require('node:os'),{execFileSync}=require('node:child_process');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'royce-tls-test-'));
execFileSync('openssl',['req','-x509','-newkey','rsa:2048','-nodes','-keyout',path.join(dir,'key.pem'),'-out',path.join(dir,'cert.pem'),'-days','1','-subj','/CN=localhost','-addext','subjectAltName=DNS:localhost'],{stdio:'ignore'});
const key=fs.readFileSync(path.join(dir,'key.pem')),cert=fs.readFileSync(path.join(dir,'cert.pem'));
const context=tls.createSecureContext({key,cert});const sockets=new Set();
const server=net.createServer(socket=>{sockets.add(socket);socket.on('close',()=>sockets.delete(socket));socket.once('data',()=>{socket.write('S');const secure=new tls.TLSSocket(socket,{isServer:true,secureContext:context});secure.on('error',()=>{});secure.once('data',()=>{const message=Buffer.from('SERROR\0C28000\0Mfixture authenticated TLS only\0\0');const packet=Buffer.alloc(message.length+5);packet[0]=69;packet.writeInt32BE(message.length+4,1);message.copy(packet,5);secure.end(packet);});});});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const port=server.address().port;
async function attempt(host,extra={}){const cfg=databaseConfig(`postgresql://test:test@${host}:${port}/fixture?sslmode=require`,true);cfg.ssl={...cfg.ssl,...extra};cfg.connectionTimeoutMillis=3000;const c=new Client(cfg);try{await c.connect();throw new Error('fixture must reject authentication');}catch(e){return e;}finally{await c.end().catch(()=>{});}}
try{
const bad=await attempt('127.0.0.1');assert(/self.signed/i.test(bad.message));
const mismatch=await attempt('127.0.0.1',{ca:cert,servername:'not-localhost.test'});assert(/altname|hostname/i.test(mismatch.message));
const trusted=await attempt('127.0.0.1',{ca:cert,servername:'localhost'});assert.equal(trusted.message,'fixture authenticated TLS only');
console.log('installed pg driver rejects untrusted certificate and wrong hostname; trusted hostname reaches only fixture authentication');
}finally{for(const s of sockets)s.destroy();await new Promise(r=>server.close(r));fs.rmSync(dir,{recursive:true,force:true});}
})().catch(e=>{console.error(e.message);process.exit(1)});
