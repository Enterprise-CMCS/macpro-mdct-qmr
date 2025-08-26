# Prod to Production Transition Instructions

## From `production` branch:

```sh
# deploy with prod as stage and imports included as variant
IMPORT_VARIANT=imports_included ./run deploy --stage prod

# figure out what is needed for the import! and note all the ids!!!!!

# comment out the delete_topics part of destroy in run.ts since it isn't going to exist for prod/production
# destroy prod
./run destroy --stage prod
```

### Collect retained resource value ids:

cloudfront distribution id -
user pool id -
bucketEncryptionKey -
AttachmentsBucket -
DynamoSnapshotBucket -

### Use PITR to make correctly named tables which we import with other stuff

`prod-banners` -> `production-banners`
`prod-measure` -> `production-measure`
`prod-coreSet` -> `production-coreSet`
`prod-rate` -> `production-rate`

Manually turn on new and old image streaming for each restored table (EXCEPT production-banners!!!)

### Copy secret for `qmr-prod` to `qmr-production`

add new secret values inside `qmr-production`

- kafkaClientId: `qmr-prod`
- userPoolName: `prod-user-pool`
- bucketPrefix: `uploads-prod`

### Remove if statement in setBranchName to changes production to prod

### Fix `const vpnOnly = (isDev || stage === "prod")` to look to production

### Fix `configToExport.BRANCH_NAME !== "prod"` to look to production

### Fix the names of this in the github secrets, use `qmr_secrets` in 1password for find value:

- PROD_AWS_OIDC_ROLE_TO_ASSUME: PRODUCTION_AWS_OIDC_ROLE_TO_ASSUME

```sh
IMPORT_VARIANT=empty ./run deploy --stage production
IMPORT_VARIANT=imports_included PROJECT=qmr cdk import --context stage=production --force
IMPORT_VARIANT=imports_included ./run deploy --stage production
# delete attachment bucket and dynamo snapshot buckets' policies just before deploying
./run deploy --stage production
```

### Commit the setBranchName change and push to production

### TEST APP!

### Tidy up

- update the cognito secrets in the 1password for qmr_secrets
- remove `qmr-prod` secret
- clean out isDev's definition
- remove reference to prod in `deployment-config.ts`
- update readmes and scripts to use stage as production
- manually fix all exported logs to have 30 month retention policy (including cloudfront s3 prod log bucket)
- remove all the code used for the transition
