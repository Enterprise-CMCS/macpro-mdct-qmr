// // @ts-nocheck
const configToExport = {
  MAX_ATTACHMENT_SIZE: 5000000,
  LOCAL_LOGIN: "false",
  s3: {
    LOCAL_ENDPOINT: "http://localhost:4569",
    REGION: "us-east-1",
    BUCKET: "uploads-master-attachments-024259748323",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://r4g987sql7.execute-api.us-east-1.amazonaws.com/master",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_XjQUt5Qs8",
    APP_CLIENT_ID: "39jvme8ebutq75cttgno8c1vn4",
    APP_CLIENT_DOMAIN:
      "master-login-39jvme8ebutq75cttgno8c1vn4.auth.us-east-1.amazoncognito.com",
    IDENTITY_POOL_ID: "us-east-1:5e824210-fbcf-4e7e-b4e3-faae749b545f",
    REDIRECT_SIGNIN: "http://localhost:3000/",
    REDIRECT_SIGNOUT: "http://localhost:3000/",
  },
};

export const currentReportingYear = "2021";

// const config = {
//   LOCAL_LOGIN: "false",
//   API_REGION: "us-east-1",
//   API_URL: "https://r4g987sql7.execute-api.us-east-1.amazonaws.com/master",
//   COGNITO_REGION: "us-east-1",
//   COGNITO_IDENTITY_POOL_ID: "us-east-1:5e824210-fbcf-4e7e-b4e3-faae749b545f",
//   COGNITO_USER_POOL_ID: "us-east-1_XjQUt5Qs8",
//   COGNITO_USER_POOL_CLIENT_ID: "39jvme8ebutq75cttgno8c1vn4",
//   COGNITO_USER_POOL_CLIENT_DOMAIN:
//     "master-login-39jvme8ebutq75cttgno8c1vn4.auth.us-east-1.amazoncognito.com",
//   COGNITO_REDIRECT_SIGNIN: "https://mdctqmrdev.cms.gov/",
//   COGNITO_REDIRECT_SIGNOUT: "https://mdctqmrdev.cms.gov/",
//   S3_ATTACHMENTS_BUCKET_REGION: "us-east-1",
//   S3_ATTACHMENTS_BUCKET_NAME: "uploads-master-attachments-024259748323",
//   S3_LOCAL_ENDPOINT: "http://localhost:4569",
// };

export default configToExport;
