import { Construct } from "constructs";
import {
  aws_cloudfront as cloudfront,
  aws_iam as iam,
  aws_s3 as s3,
  aws_s3_deployment as s3_deployment,
  Duration,
} from "aws-cdk-lib";
import path from "path";
import { execSync } from "node:child_process";

interface DeployFrontendProps {
  scope: Construct;
  uiBucket: s3.Bucket;
  distribution: cloudfront.Distribution;
  apiGatewayRestApiUrl: string;
  applicationEndpointUrl: string;
  identityPoolId: string;
  userPoolId: string;
  userPoolClientId: string;
  userPoolClientDomain: string;
  launchDarklyClient: string;
  redirectSignout: string;
  attachmentsBucketName: string;
  isDev: boolean;
}

export function deployFrontend(props: DeployFrontendProps) {
  const {
    scope,
    distribution,
    apiGatewayRestApiUrl,
    applicationEndpointUrl,
    identityPoolId,
    userPoolId,
    userPoolClientId,
    userPoolClientDomain,
    uiBucket,
    launchDarklyClient,
    redirectSignout,
    attachmentsBucketName,
    isDev,
  } = props;

  const reactAppPath = "./services/ui-src/";
  const buildOutputPath = path.join(reactAppPath, "build");
  const fullPath = path.resolve(reactAppPath);

  execSync("SKIP_PREFLIGHT_CHECK=true yarn run build", {
    cwd: fullPath,
    stdio: "inherit",
  });

  const deployWebsite = new s3_deployment.BucketDeployment(
    scope,
    "DeployWebsite",
    {
      sources: [s3_deployment.Source.asset(buildOutputPath)],
      destinationBucket: uiBucket,
      distribution,
      distributionPaths: ["/*"],
      prune: true,
      cacheControl: [
        s3_deployment.CacheControl.setPublic(),
        s3_deployment.CacheControl.maxAge(Duration.days(365)),
      ],
    }
  );

  const deployTimeConfig = new s3_deployment.DeployTimeSubstitutedFile(
    scope,
    "DeployTimeConfig",
    {
      destinationBucket: uiBucket,
      destinationKey: "env-config.js",
      source: path.join("./deployment/stacks/", "env-config.template.js"),
      substitutions: {
        branchName: process.env.branch_name!,
        attachmentsBucketName,
        apiGatewayRestApiUrl,
        applicationEndpointUrl,
        identityPoolId,
        userPoolId,
        userPoolClientId,
        userPoolClientDomain,
        timestamp: new Date().toISOString(),
        launchDarklyClient,
        redirectSignout,
      },
    }
  );

  deployTimeConfig.node.addDependency(deployWebsite);

  if (isDev) {
    const denyLogs = new iam.PolicyStatement({
      effect: iam.Effect.DENY,
      actions: ["logs:CreateLogGroup"],
      resources: ["*"],
    });
    deployWebsite.handlerRole.addToPrincipalPolicy(denyLogs);
  }
}
