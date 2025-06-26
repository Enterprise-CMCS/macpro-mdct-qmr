import { Construct } from "constructs";
import { Stack, StackProps } from "aws-cdk-lib";
import { DeploymentConfigProperties } from "../deployment-config";
import { createMinimalComponents } from "./minimal";

export class ParentStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props: StackProps & DeploymentConfigProperties
  ) {
    super(scope, id, {
      ...props,
    });

    const commonProps = {
      scope: this,
      ...props,
    };

    createMinimalComponents({
      ...commonProps,
    });
  }
}
