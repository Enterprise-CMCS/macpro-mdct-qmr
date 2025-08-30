//  @ts-nocheck

export const isDevEnv = () => {
  return (
    configToExport.BRANCH_NAME !== undefined &&
    configToExport.BRANCH_NAME !== "production"
  );
};

const configToExport = {
  PROD_URL: window._env_.PROD_URL,
  BRANCH_NAME: window._env_.BRANCH_NAME,
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: window._env_.S3_ATTACHMENTS_BUCKET_REGION,
    BUCKET: window._env_.S3_ATTACHMENTS_BUCKET_NAME,
  },
  apiGateway: {
    REGION: window._env_.API_REGION,
    URL: window._env_.API_URL,
  },
  cognito: {
    REGION: window._env_.COGNITO_REGION,
    USER_POOL_ID: window._env_.COGNITO_USER_POOL_ID,
    APP_CLIENT_ID: window._env_.COGNITO_USER_POOL_CLIENT_ID,
    APP_CLIENT_DOMAIN: window._env_.COGNITO_USER_POOL_CLIENT_DOMAIN,
    IDENTITY_POOL_ID: window._env_.COGNITO_IDENTITY_POOL_ID,
    REDIRECT_SIGNIN: window._env_.COGNITO_REDIRECT_SIGNIN,
    REDIRECT_SIGNOUT: window._env_.COGNITO_REDIRECT_SIGNOUT,
  },
  POST_SIGNOUT_REDIRECT: window._env_.POST_SIGNOUT_REDIRECT,
  currentReportingYear: "2025",
  REACT_APP_LD_SDK_CLIENT: window._env_.REACT_APP_LD_SDK_CLIENT,
};

export default configToExport;
