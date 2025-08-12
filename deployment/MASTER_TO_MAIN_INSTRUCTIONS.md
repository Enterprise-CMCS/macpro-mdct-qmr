# Master to Main Transition Instructions

## From `main` branch:

```sh
# deploy with master as stage and imports included as variant
IMPORT_VARIANT=imports_included ./run deploy --stage master

# figure out what is needed for the import! and note all the ids!!!!!

# comment out the delete_topics part of destroy in run.ts since it isn't going to exist for master/main
# destroy master
./run destroy --stage master
```

### Collect retained resource value ids:

cloudfront distribution id -
user pool id -
bucketEncryptionKey -
AttachmentsBucket -
DynamoSnapshotBucket -

### Use PITR to make correctly named tables which we import with other stuff

`master-banners` -> `main-banners`
`master-measure` -> `main-measure`
`master-coreSet` -> `main-coreSet`
`master-rate` -> `main-rate`

Manually turn on new and old image streaming for each restored table.

### Copy secret for `qmr-master` to `qmr-main`

add new secret values inside `qmr-main`

- kafkaClientId: `qmr-master`
- userPoolName: `master-user-pool`
- bucketPrefix: `uploads-master`

### Remove if statement in setBranchName to changes main to master

### Fix `const vpnOnly = (isDev || stage === "master")` to look to main

```sh
IMPORT_VARIANT=empty ./run deploy --stage main
IMPORT_VARIANT=imports_included PROJECT=qmr cdk import --context stage=main --force
IMPORT_VARIANT=imports_included ./run deploy --stage main
# delete attachment bucket and dynamo snapshot buckets' policies just before deploying
./run deploy --stage main
```

### Commit the setBranchName change and push to main

### TEST APP!

### Tidy up

- update the cognito secrets in the 1password for qmr_secrets
- remove `qmr-master` secret
- clean out isDev's definition
- remove reference to master in `deployment-config.ts`
- update readmes and scripts to use stage as main
- manually fix all exported logs to have 30 month retention policy (including cloudfront s3 master log bucket)
- remove all the code used for the transition
