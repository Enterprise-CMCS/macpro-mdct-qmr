import { Construct } from "constructs";
import {
  aws_kms as kms,
  aws_s3 as s3,
  aws_iam as iam,
  aws_events as events,
  aws_events_targets as targets,
  aws_guardduty as guardduty,
  Duration,
  RemovalPolicy,
  Aws,
} from "aws-cdk-lib";
import { Lambda } from "../constructs/lambda.js";
import { DynamoDBTable } from "../constructs/dynamodb-table.js";

interface createUploadsComponentsProps {
  scope: Construct;
  stage: string;
  loggingBucket: s3.IBucket;
  isDev: boolean;
  mpriamrole: string;
  mprdeviam: string;
  tables: DynamoDBTable[];
  bucketPrefix?: string;
  attachmentsBucketName: string;
}

export function createUploadsComponents(props: createUploadsComponentsProps) {
  const {
    scope,
    stage,
    loggingBucket,
    isDev,
    mpriamrole,
    mprdeviam,
    tables,
    bucketPrefix,
    attachmentsBucketName,
  } = props;
  const serviceStage = `uploads-${stage}`;

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
    bucketName: attachmentsBucketName,
    encryptionKey: bucketEncryptionKey,
    autoDeleteObjects: isDev,
    versioned: true,
    removalPolicy: isDev ? RemovalPolicy.DESTROY : RemovalPolicy.RETAIN,
    publicReadAccess: false,
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_PREFERRED,
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
    enforceSSL: true,
    serverAccessLogsBucket: loggingBucket,
    serverAccessLogsPrefix: `AWSLogs/${Aws.ACCOUNT_ID}/s3/`,
  });

  const s3MalwareProtectionRole = new iam.Role(
    scope,
    "S3MalwareProtectionRole",
    {
      assumedBy: new iam.ServicePrincipal(
        "malware-protection-plan.guardduty.amazonaws.com"
      ),
      inlinePolicies: {
        S3MalwareProtectionPolicy: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              sid: "AllowEventBridgeManagement",
              effect: iam.Effect.ALLOW,
              actions: ["events:*"],
              resources: [
                `arn:aws:events:us-east-1:${Aws.ACCOUNT_ID}:rule/DO-NOT-DELETE-AmazonGuardDutyMalwareProtectionS3*`,
              ],
              conditions: {
                StringLike: {
                  "events:ManagedBy":
                    "malware-protection-plan.guardduty.amazonaws.com",
                },
              },
            }),
            new iam.PolicyStatement({
              sid: "AllowS3Operations",
              effect: iam.Effect.ALLOW,
              actions: [
                "s3:GetObject*",
                "s3:PutObject*",
                "s3:ListBucket",
                "s3:*Notification",
                "s3:*Tagging",
              ],
              resources: [
                attachmentsBucket.bucketArn,
                `${attachmentsBucket.bucketArn}/*`,
              ],
            }),
            new iam.PolicyStatement({
              sid: "AllowDecryptForMalwareScan",
              effect: iam.Effect.ALLOW,
              actions: ["kms:Decrypt", "kms:GenerateDataKey"],
              resources: [bucketEncryptionKey.keyArn],
              conditions: {
                StringLike: {
                  "kms:ViaService": `s3.${Aws.REGION}.amazonaws.com`,
                },
              },
            }),
          ],
        }),
      },
    }
  );

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
      effect: iam.Effect.DENY,
      actions: ["s3:GetObject"],
      resources: [`${attachmentsBucket.bucketArn}/*`],
      principals: [new iam.ArnPrincipal("*")],
      conditions: {
        StringNotEquals: {
          "s3:ExistingObjectTag/GuardDutyMalwareScanStatus": "NO_THREATS_FOUND",
          "s3:ExistingObjectTag/virusScanStatus": "CLEAN",
        },
      },
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

  new guardduty.CfnMalwareProtectionPlan(scope, "MalwareProtectionPlan", {
    actions: {
      tagging: {
        status: "ENABLED",
      },
    },
    protectedResource: {
      s3Bucket: {
        bucketName: attachmentsBucketName,
      },
    },
    role: s3MalwareProtectionRole.roleArn,
  });

  const dynamoBucket = new s3.Bucket(scope, "DynamoSnapshotBucket", {
    bucketName: `${bucketPrefix ?? serviceStage}-dynamosnapshots-${
      Aws.ACCOUNT_ID
    }`,
    encryptionKey: bucketEncryptionKey,
    publicReadAccess: false,
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_PREFERRED,
    removalPolicy: isDev ? RemovalPolicy.DESTROY : RemovalPolicy.RETAIN,
    autoDeleteObjects: isDev,
    versioned: true,
    enforceSSL: true,
  });

  dynamoBucket.addToResourcePolicy(
    new iam.PolicyStatement({
      principals: [
        new iam.ArnPrincipal(mpriamrole),
        new iam.ArnPrincipal(mprdeviam),
      ],
      effect: iam.Effect.ALLOW,
      actions: ["s3:GetBucketLocation", "s3:ListBucket", "s3:GetObject"],
      resources: [dynamoBucket.bucketArn, `${dynamoBucket.bucketArn}/*`],
    })
  );

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

  const dynamoSyncLambda = new Lambda(scope, "DynamoSync", {
    entry: "services/uploads/src/dynamoSync/handler.js",
    handler: "syncDynamoToS3",
    timeout: Duration.minutes(2),
    memorySize: 4096,
    stackName: serviceStage,
    environment: {
      DYNAMO_BUCKET_NAME: dynamoBucket.bucketName,
      ...Object.fromEntries(
        tables.map((table) => [`${table.node.id}Table`, table.table.tableName])
      ),
    },
    isDev,
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
        resources: tables.map((table) => table.table.tableArn),
      }),
    ],
  }).lambda;

  new events.Rule(scope, "DynamoSyncScheduleRule", {
    schedule: events.Schedule.cron({ minute: "30", hour: "1" }),
    targets: [new targets.LambdaFunction(dynamoSyncLambda)],
  });

  return attachmentsBucket;
}
