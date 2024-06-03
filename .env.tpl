LOCAL_LOGIN=true
SKIP_PREFLIGHT_CHECK=true

# AWS
API_URL=http://localhost:3030/local
COGNITO_REDIRECT_SIGNOUT=http://localhost:3000/
DYNAMODB_URL=http://localhost:8000

## S3 BUCKETS
S3_ATTACHMENTS_BUCKET_NAME=op://mdct_devs/qmr_secrets/S3_ATTACHMENTS_BUCKET_NAME
S3_LOCAL_ENDPOINT=http://localhost:4569

## DYNAMO TABLES
bannerTableName=local-banners
coreSetTableName=local-coreSets
DYNAMO_TABLE_ARN=local_nonsense_if_unset_we_search_CF_for
measureTableName=local-measures

# LAUNCHDARKLY
LD_PROJECT_KEY=op://mdct_devs/qmr_secrets/LD_PROJECT_KEY
LD_SDK_KEY=op://mdct_devs/qmr_secrets/LD_SDK_KEY #pragma: allowlist secret

docraptorApiKey=YOUR_API_KEY_HERE #pragma: allowlist secret

CYPRESS_STATE_USER_2=op://mdct_devs/qmr_secrets/CYPRESS_STATE_USER_2
CYPRESS_STATE_USER_4=op://mdct_devs/qmr_secrets/CYPRESS_STATE_USER_4
CYPRESS_ADMIN_USER=op://mdct_devs/qmr_secrets/CYPRESS_ADMIN_USER
CYPRESS_QMR_PASSWORD=op://mdct_devs/qmr_secrets/CYPRESS_QMR_PASSWORD #pragma: allowlist secret