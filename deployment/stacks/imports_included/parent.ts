import { Construct } from "constructs";
import { Stack, StackProps } from "aws-cdk-lib";
import { DeploymentConfigProperties } from "../../deployment-config";
import { createDataComponents } from "./data";
import { createUiComponents } from "./ui";
import { createUiAuthComponents } from "./ui-auth";
import { createUploadsComponents } from "./uploads";

export class ImportsIncludedParentStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props: StackProps & DeploymentConfigProperties
  ) {
    super(scope, id, props);

    const { stage, bucketPrefix, userPoolName } = props;

    createDataComponents({
      scope: this,
      stage,
    });
    createUiComponents({ scope: this });
    createUiAuthComponents({
      scope: this,
      stage,
      userPoolName,
    });
    createUploadsComponents({
      scope: this,
      stage,
      bucketPrefix,
    });
  }
}
