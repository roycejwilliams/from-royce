# Storage rules regression

`storage.rules` is the exact policy read from the live default bucket on2026-09-29: public reads, writes only for the specific owner UID. The test uses a demo emulator project and creates/deletes only local test objects.

Use Node22 and Java21 or newer. From this folder run `npm ci`, then from the repository root run:

```sh
NODE_PATH=tests/storage/node_modules tests/storage/node_modules/.bin/firebase emulators:exec --project demo-from-royce-rules --config firebase.storage-test.json --only storage 'node tests/storage-rules.cjs'
```

The test verifies anonymous/non-owner upload and delete denial, owner upload/delete and public read. Current live rules have no size/type limits; those need a tested policy decision rather than a silent restriction on existing uploads.

Main deployment still selects only functions,hosting, so adding the Storage configuration does not deploy rules. A live rules change must use an explicit reviewed `firebase deploy --only storage` path. Do not loosen permissions to fix uploads.

Candidate limit policy: future owner uploads/updates accept JPEG or PNG MIME metadata and at most10MiB. Existing public reads and owner deletion remain allowed for legacy files of any size/type. MIME metadata is not byte-level content validation. The tests include size boundaries, invalid MIME, update denial and legacy read/delete. Main CI still does not deploy Storage rules; review and confirm the new limit policy before an explicit live rules deployment.
