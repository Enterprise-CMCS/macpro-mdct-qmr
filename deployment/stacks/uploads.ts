import { Construct } from "constructs";
import {
  aws_kms as kms,
  aws_s3 as s3,
  aws_lambda as lambda,
  aws_s3_notifications as s3notifications,
  aws_iam as iam,
  aws_events as events,
  aws_events_targets as targets,
  CfnOutput,
  Duration,
  RemovalPolicy,
  Aws,
} from "aws-cdk-lib";
import { Lambda } from "../constructs/lambda";
import { DynamoDBTableIdentifiers } from "../constructs/dynamodb-table";

interface createUploadsComponentsProps {
  scope: Construct;
  stage: string;
  isDev: boolean;
  mpriamrole: string;
  mprdeviam: string;
  tables: DynamoDBTableIdentifiers[];
}

export function createUploadsComponents(props: createUploadsComponentsProps) {
  const { scope, stage, isDev, mpriamrole, mprdeviam, tables } = props;
  const service = "uploads";

  const bucketEncryptionKey = new kms.Key(scope, "BucketEncryptionKMSKey", {
    description: "Key for encrypting dynamo snapshots and upload buckets",
    enableKeyRotation: true,
    pendingWindow: Duration.days(10),
    multiRegion: true,
    removalPolicy: isDev ? RemovalPolicy.DESTROY : RemovalPolicy.RETAIN,
    policy: new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          principals: [new iam.AccountRootPrincipal()],
          actions: [
            "kms:Create*",
            "kms:Describe*",
            "kms:Enable*",
            "kms:List*",
            "kms:Put*",
            "kms:Update*",
            "kms:Revoke*",
            "kms:Disable*",
            "kms:Get*",
            "kms:Delete*",
            "kms:TagResource",
            "kms:UntagResource",
            "kms:ScheduleKeyDeletion",
            "kms:CancelKeyDeletion",
            "kms:Encrypt",
            "kms:Decrypt",
            "kms:ReEncrypt*",
            "kms:GenerateDataKey*",
            "kms:DescribeKey",
          ],
          resources: ["*"],
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          principals: [
            new iam.ArnPrincipal(mpriamrole),
            new iam.ArnPrincipal(mprdeviam),
          ],
          actions: [
            "kms:Encrypt",
            "kms:Decrypt",
            "kms:ReEncrypt*",
            "kms:GenerateDataKey*",
            "kms:DescribeKey",
          ],
          resources: ["*"],
        }),
      ],
    }),
  });

  const attachmentsBucket = new s3.Bucket(scope, "AttachmentsBucket", {
    bucketName: `${service}-${stage}-attachments-${Aws.ACCOUNT_ID}`,
    encryptionKey: bucketEncryptionKey,
    publicReadAccess: false,
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_PREFERRED,
    removalPolicy: isDev ? RemovalPolicy.DESTROY : RemovalPolicy.RETAIN,
    versioned: true,
    enforceSSL: true,
    cors: [
      {
        allowedOrigins: ["*"],
        allowedMethods: [
          s3.HttpMethods.GET,
          s3.HttpMethods.PUT,
          s3.HttpMethods.POST,
          s3.HttpMethods.DELETE,
          s3.HttpMethods.HEAD,
        ],
        allowedHeaders: ["*"],
        exposedHeaders: ["ETag"],
        maxAge: 3000, // 50 minutes
      },
    ],
  });

  attachmentsBucket.addToResourcePolicy(
    new iam.PolicyStatement({
      principals: [
        new iam.ArnPrincipal(mpriamrole),
        new iam.ArnPrincipal(mprdeviam),
      ],
      effect: iam.Effect.ALLOW,
      actions: ["s3:GetBucketLocation", "s3:ListBucket", "s3:GetObject"],
      resources: [
        attachmentsBucket.bucketArn,
        `${attachmentsBucket.bucketArn}/*`,
      ],
    })
  );

  attachmentsBucket.addToResourcePolicy(
    new iam.PolicyStatement({
      actions: ["s3:PutObject"],
      effect: iam.Effect.DENY,
      principals: [new iam.ArnPrincipal("*")],
      notResources: [
        `${attachmentsBucket.bucketArn}/*.jpg`,
        `${attachmentsBucket.bucketArn}/*.png`,
        `${attachmentsBucket.bucketArn}/*.gif`,
        `${attachmentsBucket.bucketArn}/*.jpeg`,
        `${attachmentsBucket.bucketArn}/*.bmp`,
        `${attachmentsBucket.bucketArn}/*.csv`,
        `${attachmentsBucket.bucketArn}/*.doc`,
        `${attachmentsBucket.bucketArn}/*.docx`,
        `${attachmentsBucket.bucketArn}/*.odp`,
        `${attachmentsBucket.bucketArn}/*.ods`,
        `${attachmentsBucket.bucketArn}/*.odt`,
        `${attachmentsBucket.bucketArn}/*.pdf`,
        `${attachmentsBucket.bucketArn}/*.ppt`,
        `${attachmentsBucket.bucketArn}/*.pptx`,
        `${attachmentsBucket.bucketArn}/*.rtf`,
        `${attachmentsBucket.bucketArn}/*.tif`,
        `${attachmentsBucket.bucketArn}/*.tiff`,
        `${attachmentsBucket.bucketArn}/*.txt`,
        `${attachmentsBucket.bucketArn}/*.xls`,
        `${attachmentsBucket.bucketArn}/*.xlsx`,
        `${attachmentsBucket.bucketArn}/*.json`,
      ],
    })
  );

  const dynamoBucket = new s3.Bucket(scope, "DynamoSnapshotBucket", {
    bucketName: `${service}-${stage}-dynamosnapshots-${Aws.ACCOUNT_ID}`,
    encryptionKey: bucketEncryptionKey,
    publicReadAccess: false,
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_PREFERRED,
    removalPolicy: isDev ? RemovalPolicy.DESTROY : RemovalPolicy.RETAIN,
    versioned: true,
    enforceSSL: true,
  });

  const clamDefsBucket = new s3.Bucket(scope, "ClamDefsBucket", {
    bucketName: `${service}-${stage}-avscan-${Aws.ACCOUNT_ID}`,
    encryption: s3.BucketEncryption.S3_MANAGED,
    removalPolicy: isDev ? RemovalPolicy.DESTROY : RemovalPolicy.RETAIN,
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    accessControl: s3.BucketAccessControl.PRIVATE,
    versioned: true,
    enforceSSL: true,
  });

  const useKmsStatement = new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: [
      "kms:Encrypt",
      "kms:Decrypt",
      "kms:ReEncrypt*",
      "kms:GenerateDataKey*",
      "kms:DescribeKey",
    ],
    resources: [bucketEncryptionKey.keyArn],
  });

  const getS3AttachmentClamStatement = new iam.PolicyStatement({
    actions: [
      "s3:GetObject",
      "s3:PutObjectTagging",
      "s3:PutObjectVersionTagging",
      "S3:ListBucket",
    ],
    resources: [
      `${attachmentsBucket.bucketArn}/*`,
      `${clamDefsBucket.bucketArn}/*`,
    ],
  });

  const s3ClamStatement = new iam.PolicyStatement({
    actions: ["s3:PutObject", "s3:ListBucket"],
    resources: [clamDefsBucket.bucketArn, `${clamDefsBucket.bucketArn}/*`],
  });

  const dynamoSyncLambda = new Lambda(scope, "DynamoSync", {
    entry: "services/uploads/src/dynamoSync/handler.js",
    handler: "syncDynamoToS3",
    timeout: Duration.minutes(2),
    memorySize: 4096,
    stackName: `${service}-${stage}`,
    environment: {
      DYNAMO_BUCKET_NAME: dynamoBucket.bucketName,
      ...Object.fromEntries(
        tables.map((table) => [`${table.id}Table`, table.name])
      ),
    },
    additionalPolicies: [
      useKmsStatement,
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["s3:PutObject", "s3:ListBucket"],
        resources: [dynamoBucket.bucketArn, `${dynamoBucket.bucketArn}/*`],
      }),
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
    ],
  }).lambda;

  new events.Rule(scope, "DynamoSyncScheduleRule", {
    schedule: events.Schedule.cron({ minute: "30", hour: "1" }),
    targets: [new targets.LambdaFunction(dynamoSyncLambda)],
  });

  const clamAvLayer = new lambda.LayerVersion(scope, "ClamAvLayer", {
    layerVersionName: `${service}-${stage}-clamDefs`,
    code: lambda.Code.fromAsset("services/uploads/lambda_layer.zip"),
    compatibleRuntimes: [lambda.Runtime.NODEJS_20_X],
  });

  const avScanLambda = new Lambda(scope, "AvScanLambda", {
    entry: "services/uploads/src/antivirus.js",
    handler: "lambdaHandleEvent",
    memorySize: 3072,
    timeout: Duration.minutes(5),
    layers: [clamAvLayer],
    stackName: `${service}-${stage}`,
    environment: {
      CLAMAV_BUCKET_NAME: clamDefsBucket.bucketName,
    },
    additionalPolicies: [
      useKmsStatement,
      getS3AttachmentClamStatement,
      s3ClamStatement,
    ],
  }).lambda;

  attachmentsBucket.addEventNotification(
    s3.EventType.OBJECT_CREATED_PUT,
    new s3notifications.LambdaDestination(avScanLambda)
  );

  const avDownloadDefinitionsLambda = new Lambda(
    scope,
    "AvDownloadDefinitionsLambda",
    {
      entry: "services/uploads/src/download-definitions.js",
      handler: "lambdaHandleEvent",
      memorySize: 3072,
      timeout: Duration.minutes(5),
      layers: [clamAvLayer],
      stackName: `${service}-${stage}`,
      environment: {
        CLAMAV_BUCKET_NAME: clamDefsBucket.bucketName,
      },
      additionalPolicies: [
        useKmsStatement,
        getS3AttachmentClamStatement,
        s3ClamStatement,
      ],
    }
  ).lambda;

  new events.Rule(scope, "avDownloadDefinitionsRule", {
    schedule: events.Schedule.cron({ minute: "15", hour: "1" }),
    targets: [new targets.LambdaFunction(avDownloadDefinitionsLambda)],
  });

  return attachmentsBucket;
}
