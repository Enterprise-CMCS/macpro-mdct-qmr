import { Construct } from "constructs";
import {
  aws_ec2 as ec2,
  aws_iam as iam,
  CfnOutput,
  Stack,
  StackProps,
} from "aws-cdk-lib";
import { DeploymentConfigProperties } from "../deployment-config";
import { createDataComponents } from "./data";
import { createUiAuthComponents } from "./ui-auth";
import { createUiComponents } from "./ui";
import { createApiComponents } from "./api";
import { deployFrontend } from "./deployFrontend";
import { createCustomResourceRole } from "./customResourceRole";
import { isLocalStack } from "../local/util";
import { createTopicsComponents } from "./topics";
import { createUploadsComponents } from "./uploads";
import { getSubnets } from "../utils/vpc";

export class ParentStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props: StackProps & DeploymentConfigProperties
  ) {
    const {
      isDev,
      secureCloudfrontDomainName,
      vpcName,
      kafkaAuthorizedSubnetIds,
    } = props;

    super(scope, id, {
      ...props,
      terminationProtection: !isDev,
    });

    const commonProps = {
      scope: this,
      ...props,
      isDev,
    };

    const vpc = ec2.Vpc.fromLookup(this, "Vpc", { vpcName });
    const kafkaAuthorizedSubnets = getSubnets(this, kafkaAuthorizedSubnetIds);

    const customResourceRole = createCustomResourceRole(commonProps);

    const tables = createDataComponents(commonProps);

    const { apiGatewayRestApiUrl, restApiId } = createApiComponents({
      ...commonProps,
      tables,
      vpc,
      kafkaAuthorizedSubnets,
    });

    if (isLocalStack) return;

    const attachmentsBucket = createUploadsComponents({
      ...commonProps,
      tables,
    });

    const { applicationEndpointUrl, distribution, uiBucket } =
      createUiComponents(commonProps);

    const { userPoolDomainName, identityPoolId, userPoolId, userPoolClientId } =
      createUiAuthComponents({
        ...commonProps,
        applicationEndpointUrl,
        restApiId,
        customResourceRole,
        attachmentsBucketArn: attachmentsBucket.bucketArn,
      });

    deployFrontend({
      ...commonProps,
      uiBucket,
      distribution,
      apiGatewayRestApiUrl,
      applicationEndpointUrl:
        secureCloudfrontDomainName || applicationEndpointUrl,
      identityPoolId,
      userPoolId,
      userPoolClientId,
      userPoolClientDomain: `${userPoolDomainName}.auth.${this.region}.amazoncognito.com`,
      attachmentsBucketName: attachmentsBucket.bucketName,
    });

    createTopicsComponents({
      ...commonProps,
      vpc,
      kafkaAuthorizedSubnets,
      customResourceRole,
    });

    new CfnOutput(this, "CloudFrontUrl", {
      value: applicationEndpointUrl,
    });
    if (isDev) {
      applyDenyCreateLogGroupPolicy(this);
    }
  }
}

function applyDenyCreateLogGroupPolicy(stack: Stack) {
  const denyCreateLogGroupPolicy = {
    PolicyName: "DenyCreateLogGroup",
    PolicyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Deny",
          Action: "logs:CreateLogGroup",
          Resource: "*",
        },
      ],
    },
  };

  const provider = stack.node.tryFindChild(
    "Custom::S3AutoDeleteObjectsCustomResourceProvider"
  );
  const role = provider?.node.tryFindChild("Role") as iam.CfnRole;
  if (role) {
    role.addPropertyOverride("Policies", [denyCreateLogGroupPolicy]);
  }

  stack.node.findAll().forEach((c) => {
    if (!c.node.id.startsWith("BucketNotificationsHandler")) return;

    const role = c.node.tryFindChild("Role");
    const cfnRole = role?.node.tryFindChild("Resource") as iam.CfnRole;
    if (cfnRole) {
      cfnRole.addPropertyOverride("Policies", [denyCreateLogGroupPolicy]);
    }
  });
}
