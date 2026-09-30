const assert=require('node:assert/strict');
const {databaseConfig}=require('../functions/src/lib/database-config');
const base='postgresql://user:secret@example.test/db';
for(const suffix of ['', '?sslmode=require&channel_binding=require','?sslmode=verify-full','?ssl=true']){
  const config=databaseConfig(base+suffix,true);
  assert.equal(config.ssl.rejectUnauthorized,true);
  assert(!new URL(config.connectionString).searchParams.has('sslmode'));
  if(suffix.includes('channel_binding')) assert.equal(new URL(config.connectionString).searchParams.get('channel_binding'),'require');
}
for(const suffix of ['?sslmode=no-verify','?sslmode=disable','?sslmode=prefer','?ssl=0','?ssl=false','?sslrootcert=/tmp/ca','?sslcert=/tmp/cert','?sslkey=/tmp/key','?uselibpqcompat=true']){
  assert.throws(()=>databaseConfig(base+suffix,true),e=>!e.message.includes('secret')&&!e.message.includes('user'));
}
assert.throws(()=>databaseConfig('invalid',true));assert.throws(()=>databaseConfig(undefined,true));
assert.equal(databaseConfig(base,false).ssl,false);
console.log('explicit certificate validation, override rejection, preserved binding parameter and sanitized configuration errors passed');
