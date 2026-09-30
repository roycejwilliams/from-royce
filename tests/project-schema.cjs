const assert = require('node:assert/strict');
const fs = require('node:fs');
const { spawnSync } = require('node:child_process');
const { migrateProjectSchema } = require('../functions/scripts/migrate-project-schema');
(async () => {
  const calls = [];
  const client = { query: async sql => { calls.push(sql); } };
  await migrateProjectSchema(client);
  assert.equal(calls[0], 'BEGIN');
  assert.equal(calls.at(-1), 'COMMIT');
  const sql = calls[1].replace(/--[^\n]*/g, '');
  assert(!/\b(INSERT|UPDATE|DELETE|TRUNCATE|DROP)\b/i.test(sql));
  assert(/CREATE TABLE IF NOT EXISTS project/.test(sql));
  assert(/CREATE UNIQUE INDEX IF NOT EXISTS project_slug_idx/.test(sql));
  await migrateProjectSchema(client);
  assert.equal(calls[1], calls[4]);
  const failed = [];
  await assert.rejects(() => migrateProjectSchema({ query: async sql => {
    failed.push(sql); if (sql.includes('CREATE TABLE')) throw new Error('denied');
  }}));
  assert.equal(failed.at(-1), 'ROLLBACK');
  for (const args of [[], ['--apply-local']]) {
    const result = spawnSync(process.execPath, ['functions/scripts/migrate-project-schema.js', ...args], {
      env: { ...process.env, NODE_ENV: 'production' }, encoding: 'utf8'
    });
    assert.equal(result.status, 1);
  }
  const seed = spawnSync(process.execPath, ['functions/scripts/seed-projects.js'], { encoding: 'utf8' });
  assert.equal(seed.status, 1);
  assert(!fs.readFileSync('functions/scripts/seed-projects.js','utf8').includes('INSERT'));
  console.log('schema-only migration transaction/rollback/repeat and disabled dummy seeding tests passed');
})().catch(error => { console.error(error); process.exit(1); });
