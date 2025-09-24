import { Construct } from "constructs";
import {
  aws_iam as iam,
  aws_cloudfront as cloudfront,
  Duration,
  aws_s3 as s3,
  aws_s3_deployment as s3_deployment,
  custom_resources as cr,
} from "aws-cdk-lib";
import path from "path";
import { execSync } from "node:child_process";

interface DeployFrontendProps {
  scope: Construct;
  stage: string;
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
}

export function deployFrontend(props: DeployFrontendProps) {
  const {
    scope,
    stage,
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
  } = props;

  const reactAppPath = "./services/ui-src/";
  const buildOutputPath = path.join(reactAppPath, "build");
  const fullPath = path.resolve(reactAppPath);

  execSync("SKIP_PREFLIGHT_CHECK=true yarn run build", {
    cwd: fullPath,
    stdio: "inherit",
  });

  const deploymentRole = new iam.Role(scope, "BucketDeploymentRole", {
    assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
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
        s3_deployment.CacheControl.noCache(),
      ],
      role: deploymentRole,
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

  const invalidateCloudfront = new cr.AwsCustomResource(
    scope,
    "InvalidateCloudfront",
    {
      onUpdate: {
        service: "CloudFront",
        action: "createInvalidation",
        parameters: {
          DistributionId: distribution.distributionId,
          InvalidationBatch: {
            Paths: {
              Quantity: 1,
              Items: ["/*"],
            },
            CallerReference: new Date().toISOString(),
          },
        },
        physicalResourceId: cr.PhysicalResourceId.of(
          `InvalidateCloudfront-${stage}`
        ),
      },
      role: deploymentRole,
    }
  );

  distribution.grantCreateInvalidation(invalidateCloudfront.grantPrincipal);

  invalidateCloudfront.node.addDependency(deployTimeConfig);
}
