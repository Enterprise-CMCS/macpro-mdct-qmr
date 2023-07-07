//  @ts-nocheck

export const isDevEnv = () => {
  return (
    configToExport.BRANCH_NAME !== undefined &&
    configToExport.BRANCH_NAME !== "prod"
  );
};

let branchName = window._env_.BRANCH_NAME;
let signOutRedirectURL = window._env_.COGNITO_REDIRECT_SIGNOUT;

const redirectSignOurURL = () => {
  if (branchName === "master") {
    return (signOutRedirectURL = "https://test.home.idm.cms.gov/app/UserHome");
  } else if (branchName === "val") {
    return (signOutRedirectURL = "https://impl.home.idm.cms.gov/app/UserHome");
  } else if (branchName === "prod") {
    return (signOutRedirectURL = "https://idm.cms.gov/app/UserHome");
  } else {
    return signOutRedirectURL;
  }
};

const configToExport = {
  PROD_URL: window._env_.PROD_URL,
  BRANCH_NAME: window._env_.BRANCH_NAME,
  MAX_ATTACHMENT_SIZE: 5000000,
  LOCAL_LOGIN: window._env_.LOCAL_LOGIN,
  IS_FEATURE_BRANCH: window._env_.IS_FEATURE_BRANCH,
  s3: {
    LOCAL_ENDPOINT: window._env_.S3_LOCAL_ENDPOINT,
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
    REDIRECT_SIGNIN: window._env_.COGNITO_REDIRECT_SIGNOUT,
    REDIRECT_SIGNOUT: redirectSignOurURL(),
  },
  currentReportingYear: "2021",
  REACT_APP_LD_SDK_CLIENT: window._env_.REACT_APP_LD_SDK_CLIENT,
};

export default configToExport;
