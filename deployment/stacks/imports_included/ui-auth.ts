import { Construct } from "constructs";
import { aws_cognito as cognito, RemovalPolicy } from "aws-cdk-lib";

interface CreateUiAuthComponentsProps {
  scope: Construct;
  stage: string;
  userPoolName?: string;
}

export function createUiAuthComponents(props: CreateUiAuthComponentsProps) {
  const { scope, stage, userPoolName } = props;

  new cognito.UserPool(scope, "UserPool", {
    userPoolName: userPoolName ?? `${stage}-user-pool`,
    signInAliases: {
      email: true,
    },
    autoVerify: {
      email: true,
    },
    selfSignUpEnabled: false,
    standardAttributes: {
      givenName: {
        required: true,
        mutable: true,
      },
      familyName: {
        required: true,
        mutable: true,
      },
    },
    customAttributes: {
      cms_roles: new cognito.StringAttribute({ mutable: true }),
      cms_state: new cognito.StringAttribute({
        mutable: true,
        minLen: 0,
        maxLen: 256,
      }),
    },
    removalPolicy: RemovalPolicy.RETAIN,
  });
}
