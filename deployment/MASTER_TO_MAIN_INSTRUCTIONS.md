# Master to Main Transition Instructions

## From `main` branch:

```sh
# deploy with master as stage and imports included as variant
IMPORT_VARIANT=imports_included ./run deploy --stage master

# figure out what is needed for the import! and note all the ids!!!!!

# destroy master
./run destroy --stage master
```

### Collect retained resource value ids:

cloudfront distribution id -
user pool id -

### Use PITR to make correctly named tables which we import with other stuff

`master-banners` -> `main-banners`
`master-measure` -> `main-measure`
`master-coreSet` -> `main-coreSet`
`master-rate` -> `main-rate`

Manually turn on new and old image streaming for each restored table.

### Copy secret for `qmr-master` to `qmr-main`

add 2 new secret values inside `qmr-main`

- kafkaClientId: `qmr-master`
- userPoolName: `master-user-pool`

### Remove if statement in setBranchName to changes main to master

### Fix `const vpnOnly = (isDev || stage === "master")` to look to main

```sh
IMPORT_VARIANT=empty ./run deploy --stage main
IMPORT_VARIANT=imports_included PROJECT=qmr cdk import --context stage=main --force
IMPORT_VARIANT=imports_included ./run deploy --stage main
./run deploy --stage main
```

### Commit the setBranchName change and push to main

### TEST APP!

### Tidy up

- remove `qmr-master` secret
- clean out isDev's definition
- remove reference to master in `deployment-config.ts`
- update readmes and scripts to use stage as main
- manually fix all exported logs to have 30 month retention policy
- remove all the code used for the transition
