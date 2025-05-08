import { Construct } from "constructs";
import {
  aws_s3 as s3,
  aws_iam as iam,
  aws_kms as kms,
  Aws,
  Duration,
  RemovalPolicy,
} from "aws-cdk-lib";

interface CreateUploadsComponentsProps {
  scope: Construct;
  stage: string;
}

export function createUploadsComponents(props: CreateUploadsComponentsProps) {
  const { scope, stage } = props;

  const bucketEncryptionKey = new kms.Key(scope, "BucketEncryptionKMSKey", {
    description: "Key for encrypting dynamo snapshots and upload buckets",
    enableKeyRotation: true,
    pendingWindow: Duration.days(10),
    multiRegion: true,
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
      ],
    }),
  });

  new s3.Bucket(scope, "AttachmentsBucket", {
    bucketName: `uploads-${stage}-attachments-${Aws.ACCOUNT_ID}`,
    encryptionKey: bucketEncryptionKey,
    publicReadAccess: false,
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_PREFERRED,
    removalPolicy: RemovalPolicy.RETAIN,
    versioned: true,
  });

  new s3.Bucket(scope, "DynamoSnapshotBucket", {
    bucketName: `uploads-${stage}-dynamosnapshots-${Aws.ACCOUNT_ID}`,
    encryptionKey: bucketEncryptionKey,
    publicReadAccess: false,
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_PREFERRED,
    removalPolicy: RemovalPolicy.RETAIN,
    versioned: true,
  });
}
