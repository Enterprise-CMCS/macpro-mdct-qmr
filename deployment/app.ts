#!/usr/bin/env node
import "source-map-support/register";
import { App, DefaultStackSynthesizer, Stack, Tags } from "aws-cdk-lib";
import { EmptyParentStack } from "./stacks/empty/parent";
import { ImportsIncludedParentStack } from "./stacks/imports_included/parent";
import { ParentStack } from "./stacks/parent";
import { determineDeploymentConfig } from "./deployment-config";

async function main() {
  const app = new App({
    defaultStackSynthesizer: new DefaultStackSynthesizer({
      deployRoleArn:
        "arn:${AWS::Partition}:iam::${AWS::AccountId}:role/delegatedadmin/developer/cdk-${Qualifier}-deploy-role-${AWS::AccountId}-${AWS::Region}",
      fileAssetPublishingRoleArn:
        "arn:${AWS::Partition}:iam::${AWS::AccountId}:role/delegatedadmin/developer/cdk-${Qualifier}-file-publishing-role-${AWS::AccountId}-${AWS::Region}",
      imageAssetPublishingRoleArn:
        "arn:${AWS::Partition}:iam::${AWS::AccountId}:role/delegatedadmin/developer/cdk-${Qualifier}-image-publishing-role-${AWS::AccountId}-${AWS::Region}",
      cloudFormationExecutionRole:
        "arn:${AWS::Partition}:iam::${AWS::AccountId}:role/delegatedadmin/developer/cdk-${Qualifier}-cfn-exec-role-${AWS::AccountId}-${AWS::Region}",
      lookupRoleArn:
        "arn:${AWS::Partition}:iam::${AWS::AccountId}:role/delegatedadmin/developer/cdk-${Qualifier}-lookup-role-${AWS::AccountId}-${AWS::Region}",
      qualifier: "hnb659fds",
    }),
  });

  const stage = app.node.getContext("stage");
  const config = await determineDeploymentConfig(stage);

  Tags.of(app).add("STAGE", stage);
  Tags.of(app).add("PROJECT", config.project);

  if (stage == "bootstrap") {
    new Stack(app, `${config.project}-${stage}`, {});
  } else {
    let correctParentStack;
    if (process.env.IMPORT_VARIANT == "empty") {
      correctParentStack = EmptyParentStack;
    } else if (process.env.IMPORT_VARIANT == "imports_included") {
      correctParentStack = ImportsIncludedParentStack;
    } else {
      correctParentStack = ParentStack;
    }
    new correctParentStack(app, `${config.project}-${stage}`, {
      ...config,
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
      },
    });
  }
}

main();
