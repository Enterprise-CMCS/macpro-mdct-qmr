import { Construct } from "constructs";
import {
  aws_apigateway as apigateway,
  aws_ec2 as ec2,
  aws_iam as iam,
  aws_logs as logs,
  aws_wafv2 as wafv2,
  CfnOutput,
  Duration,
  RemovalPolicy,
} from "aws-cdk-lib";
import { Lambda } from "../constructs/lambda";
import { WafConstruct } from "../constructs/waf";
import { LambdaDynamoEventSource } from "../constructs/lambda-dynamo-event";
import { DynamoDBTableIdentifiers } from "../constructs/dynamodb-table";
import { isDefined } from "../utils/misc";
import { isLocalStack } from "../local/util";

interface CreateApiComponentsProps {
  scope: Construct;
  stage: string;
  project: string;
  isDev: boolean;
  vpc: ec2.IVpc;
  kafkaAuthorizedSubnets: ec2.ISubnet[];
  tables: DynamoDBTableIdentifiers[];
  brokerString: string;
  docraptorApiKey: string;
  kafkaClientId?: string;
}

export function createApiComponents(props: CreateApiComponentsProps) {
  const {
    scope,
    stage,
    project,
    isDev,
    vpc,
    kafkaAuthorizedSubnets,
    tables,
    brokerString,
    docraptorApiKey,
    kafkaClientId,
  } = props;

  const service = "app-api";

  const kafkaSecurityGroup = new ec2.SecurityGroup(
    scope,
    "KafkaSecurityGroup",
    {
      vpc,
      description:
        "Security Group for streaming functions. Egress all is set by default.",
      allowAllOutbound: true,
    }
  );

  const logGroup = new logs.LogGroup(scope, "ApiAccessLogs", {
    removalPolicy: isDev ? RemovalPolicy.DESTROY : RemovalPolicy.RETAIN,
  });

  const api = new apigateway.RestApi(scope, "ApiGatewayRestApi", {
    restApiName: `${stage}-app-api`,
    deploy: true,
    cloudWatchRole: false,
    deployOptions: {
      stageName: stage,
      tracingEnabled: true,
      loggingLevel: apigateway.MethodLoggingLevel.INFO,
      dataTraceEnabled: true,
      accessLogDestination: new apigateway.LogGroupLogDestination(logGroup),
    },
    defaultCorsPreflightOptions: {
      allowOrigins: apigateway.Cors.ALL_ORIGINS,
      allowMethods: apigateway.Cors.ALL_METHODS,
    },
  });

  api.addGatewayResponse("Default4XXResponse", {
    type: apigateway.ResponseType.DEFAULT_4XX,
    responseHeaders: {
      "Access-Control-Allow-Origin": "'*'",
      "Access-Control-Allow-Headers": "'*'",
    },
  });

  api.addGatewayResponse("Default5XXResponse", {
    type: apigateway.ResponseType.DEFAULT_5XX,
    responseHeaders: {
      "Access-Control-Allow-Origin": "'*'",
      "Access-Control-Allow-Headers": "'*'",
    },
  });

  const environment = {
    stage,
    docraptorApiKey,
    BOOTSTRAP_BROKER_STRING_TLS: brokerString,
    KAFKA_CLIENT_ID: kafkaClientId ?? `qmr-${stage}`,
    topicNamespace: isDev ? `--qmr--${stage}--` : "",
    ...Object.fromEntries(
      tables.map((table) => [`${table.id}Table`, table.name])
    ),
  };

  const additionalPolicies = [
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        "dynamodb:DescribeTable",
        "dynamodb:Query",
        "dynamodb:Scan",
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
      ],
      resources: tables.map((table) => table.arn),
    }),
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        "dynamodb:DescribeStream",
        "dynamodb:GetRecords",
        "dynamodb:GetShardIterator",
        "dynamodb:ListShards",
        "dynamodb:ListStreams",
      ],
      resources: tables.map((table) => table.streamArn).filter(isDefined),
    }),
  ];

  const commonProps = {
    stackName: `${service}-${stage}`,
    api,
    environment,
    additionalPolicies,
  };

  // Api endpoints
  new Lambda(scope, "createBanner", {
    entry: "services/app-api/handlers/banners/create.ts",
    handler: "createBanner",
    path: "banners/{bannerId}",
    method: "POST",
    ...commonProps,
  });

  new Lambda(scope, "deleteBanner", {
    entry: "services/app-api/handlers/banners/delete.ts",
    handler: "deleteBanner",
    path: "banners/{bannerId}",
    method: "DELETE",
    ...commonProps,
  });

  new Lambda(scope, "fetchBanner", {
    entry: "services/app-api/handlers/banners/fetch.ts",
    handler: "fetchBanner",
    path: "banners/{bannerId}",
    method: "GET",
    ...commonProps,
  });

  new Lambda(scope, "listMeasures", {
    entry: "services/app-api/handlers/measures/get.ts",
    handler: "listMeasures",
    path: "coreset/{state}/{year}/{coreSet}/measures/list",
    method: "GET",
    ...commonProps,
  });

  new Lambda(scope, "getReportingYears", {
    entry: "services/app-api/handlers/measures/get.ts",
    handler: "getReportingYears",
    path: "coreset/reportingyears",
    method: "GET",
    ...commonProps,
  });

  new Lambda(scope, "getMeasureListInfo", {
    entry: "services/app-api/handlers/measures/get.ts",
    handler: "getMeasureListInfo",
    path: "coreset/measureListInfo",
    method: "GET",
    ...commonProps,
  });

  new Lambda(scope, "getMeasure", {
    entry: "services/app-api/handlers/measures/get.ts",
    handler: "getMeasure",
    path: "coreset/{state}/{year}/{coreSet}/measures/{measure}/get",
    method: "GET",
    ...commonProps,
  });

  new Lambda(scope, "createMeasure", {
    entry: "services/app-api/handlers/measures/create.ts",
    handler: "createMeasure",
    path: "coreset/{state}/{year}/{coreSet}/measures/{measure}/create",
    method: "POST",
    ...commonProps,
  });

  new Lambda(scope, "editMeasure", {
    entry: "services/app-api/handlers/measures/update.ts",
    handler: "editMeasure",
    path: "coreset/{state}/{year}/{coreSet}/measures/{measure}/edit",
    method: "PUT",
    ...commonProps,
  });

  new Lambda(scope, "deleteMeasure", {
    entry: "services/app-api/handlers/measures/delete.ts",
    handler: "deleteMeasure",
    path: "coreset/{state}/{year}/{coreSet}/measures/{measure}/delete",
    method: "DELETE",
    ...commonProps,
  });

  new Lambda(scope, "getAllCoreSets", {
    entry: "services/app-api/handlers/coreSets/get.ts",
    handler: "getAllCoreSets",
    path: "coreset/{state}/{year}/list",
    method: "GET",
    ...commonProps,
  });

  new Lambda(scope, "getCoreSet", {
    entry: "services/app-api/handlers/coreSets/get.ts",
    handler: "getCoreSet",
    path: "coreset/{state}/{year}/{coreSet}/get",
    method: "GET",
    ...commonProps,
  });

  new Lambda(scope, "createCoreSet", {
    entry: "services/app-api/handlers/coreSets/create.ts",
    handler: "createCoreSet",
    path: "coreset/{state}/{year}/{coreSet}/create",
    method: "POST",
    ...commonProps,
  });

  new Lambda(scope, "editCoreSet", {
    entry: "services/app-api/handlers/coreSets/update.ts",
    handler: "editCoreSet",
    path: "coreset/{state}/{year}/{coreSet}/edit",
    method: "PUT",
    ...commonProps,
  });

  new Lambda(scope, "deleteCoreSet", {
    entry: "services/app-api/handlers/coreSets/delete.ts",
    handler: "deleteCoreSet",
    path: "coreset/{state}/{year}/{coreSet}/delete",
    method: "DELETE",
    ...commonProps,
  });

  new Lambda(scope, "getRate", {
    entry: "services/app-api/handlers/rate/get.ts",
    handler: "getRate",
    path: "rate/{state}/{year}/{coreSet}/{measure}/get",
    method: "GET",
    ...commonProps,
  });

  new Lambda(scope, "getPDF", {
    entry: "services/app-api/handlers/prince/pdf.ts",
    handler: "getPDF",
    path: "coreset/{state}/{year}/{coreSet}/getPDF",
    method: "POST",
    ...commonProps,
    timeout: Duration.seconds(30), // apigateway's max
  });

  // Data Processor Lambda
  new LambdaDynamoEventSource(scope, "postKafkaData", {
    entry: "services/app-api/handlers/kafka/post/postKafkaData.ts",
    handler: "handler",
    timeout: Duration.seconds(120),
    memorySize: 2048,
    retryAttempts: 2,
    vpc,
    vpcSubnets: { subnets: kafkaAuthorizedSubnets },
    securityGroups: [kafkaSecurityGroup],
    ...commonProps,
    tables: tables.filter(
      (table) =>
        table.id === "Measures" ||
        table.id === "QualityCoreSets" ||
        table.id === "CombinedRates"
    ),
  });

  if (!isLocalStack) {
    const waf = new WafConstruct(
      scope,
      "ApiWafConstruct",
      {
        name: `${project}-${stage}-${service}`,
        blockRequestBodyOver8KB: false,
      },
      "REGIONAL"
    );

    new wafv2.CfnWebACLAssociation(scope, "WebACLAssociation", {
      resourceArn: api.deploymentStage.stageArn,
      webAclArn: waf.webAcl.attrArn,
    });
  }

  const apiGatewayRestApiUrl = api.url.slice(0, -1);

  new CfnOutput(scope, "ApiUrl", {
    value: apiGatewayRestApiUrl,
  });

  return {
    restApiId: api.restApiId,
    apiGatewayRestApiUrl,
  };
}
