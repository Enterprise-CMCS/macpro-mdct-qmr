import path, { dirname } from "path";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outputPath = path.join(__dirname, "../../services/ui-src", "public");
const configFilePath = path.resolve(outputPath, "env-config.js");

const region = "us-east-1";

export async function writeLocalUiEnvFile(apiUrl: string) {
  const envVariables = {
    PROD_URL: "mdctqmr.cms.gov",
    BRANCH_NAME: "local-branch",
    S3_ATTACHMENTS_BUCKET_REGION: "us-east-1",
    S3_ATTACHMENTS_BUCKET_NAME: process.env.S3_ATTACHMENTS_BUCKET_NAME,
    API_REGION: region,
    API_URL: apiUrl.replace("https", "http"),
    COGNITO_IDP_NAME: "Okta",
    COGNITO_IDENTITY_POOL_ID: process.env.COGNITO_IDENTITY_POOL_ID,
    COGNITO_REDIRECT_SIGNIN: "http://localhost:3000/",
    COGNITO_REDIRECT_SIGNOUT: "http://localhost:3000/",
    COGNITO_REGION: region,
    COGNITO_USER_POOL_CLIENT_ID: process.env.COGNITO_USER_POOL_CLIENT_ID,
    COGNITO_USER_POOL_CLIENT_DOMAIN:
      process.env.COGNITO_USER_POOL_CLIENT_DOMAIN,
    COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
    POST_SIGNOUT_REDIRECT: "http://localhost:3000/",
    REACT_APP_LD_SDK_CLIENT: process.env.REACT_APP_LD_SDK_CLIENT,
  };

  await fs.rm(configFilePath, { force: true });

  const envConfigContent = [
    "window._env_ = {",
    ...Object.entries(envVariables).map(
      ([key, value]) => `  ${key}: "${value}",`
    ),
    "};",
  ].join("\n");

  await fs.writeFile(configFilePath, envConfigContent);
}
