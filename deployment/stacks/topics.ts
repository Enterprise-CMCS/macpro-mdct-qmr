// fix this!
import { Construct } from "constructs";
import {
  aws_ec2 as ec2,
  aws_iam as iam,
  custom_resources as cr,
  Aws,
  CfnOutput,
  Duration,
} from "aws-cdk-lib";
import { Lambda } from "../constructs/lambda";

interface CreateTopicsComponentsProps {
  scope: Construct;
  project: string;
  stage: string;
  isDev: boolean;
  iamPath: string;
  iamPermissionsBoundary: iam.IManagedPolicy;
  brokerString: string;
  vpc: ec2.IVpc;
  kafkaAuthorizedSubnets: ec2.ISubnet[];
  customResourceRole: iam.Role;
}

export function createTopicsComponents(props: CreateTopicsComponentsProps) {
  const {
    scope,
    project,
    stage,
    isDev,
    iamPath,
    iamPermissionsBoundary,
    brokerString,
    vpc,
    kafkaAuthorizedSubnets,
    customResourceRole,
  } = props;

  const service = "topics";

  const lambdaSecurityGroup = new ec2.SecurityGroup(
    scope,
    "LambdaSecurityGroup",
    {
      vpc,
      description: "Security Group for the topics service lambdas",
      allowAllOutbound: true,
    }
  );

  const commonProps = {
    stackName: `${service}-${stage}`,
    environment: {
      brokerString,
      project,
      topicNamespace: isDev ? `--${project}--${stage}--` : "",
    },
    additionalPolicies: [
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["ssm:GetParameter"],
        resources: [
          `arn:aws:ssm:${Aws.REGION}:${Aws.ACCOUNT_ID}:parameter/configuration/${stage}/*`,
        ],
      }),
    ],
    iamPermissionsBoundary,
    iamPath,
    vpc,
    vpcSubnets: { subnets: kafkaAuthorizedSubnets },
    securityGroups: [lambdaSecurityGroup],
  };

  const createTopicsLambda = new Lambda(scope, "CreateTopics", {
    entry: "services/topics/handlers/createTopics.js",
    handler: "handler",
    timeout: Duration.seconds(60),
    ...commonProps,
  });

  const invokeCreateTopicsConfig = {
    service: "Lambda",
    action: "invoke",
    parameters: {
      FunctionName: createTopicsLambda.lambda.functionName,
      InvocationType: "Event",
      Payload: JSON.stringify({}),
    },
    physicalResourceId: cr.PhysicalResourceId.of(
      `InvokeCreateTopicsLambda-${stage}`
    ),
  };
  const createTopicsInvoke = new cr.AwsCustomResource(
    scope,
    "InvokeCreateTopicsLambda",
    {
      onCreate: invokeCreateTopicsConfig,
      onUpdate: invokeCreateTopicsConfig,
      onDelete: undefined,
      policy: cr.AwsCustomResourcePolicy.fromStatements([
        new iam.PolicyStatement({
          actions: ["lambda:InvokeFunction"],
          resources: [createTopicsLambda.lambda.functionArn],
        }),
      ]),
      role: customResourceRole,
      resourceType: "Custom::InvokeCreateTopicsLambda",
    }
  );

  createTopicsInvoke.node.addDependency(createTopicsLambda);

  if (isDev) {
    const deleteTopicsLambda = new Lambda(scope, "DeleteTopics", {
      entry: "services/topics/handlers/deleteTopics.js",
      handler: "handler",
      timeout: Duration.minutes(5),
      ...commonProps,
    });

    deleteTopicsLambda.node.addDependency(createTopicsLambda);

    new CfnOutput(scope, "DeleteTopicsFunctionName", {
      value: deleteTopicsLambda.lambda.functionName,
    });
  }

  const listTopicsLambda = new Lambda(scope, "ListTopics", {
    entry: "services/topics/handlers/listTopics.js",
    handler: "handler",
    timeout: Duration.minutes(5),
    ...commonProps,
  });

  new CfnOutput(scope, "ListTopicsFunctionName", {
    value: listTopicsLambda.lambda.functionName,
  });
}
