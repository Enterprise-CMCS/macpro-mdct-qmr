import {
  aws_ec2 as ec2,
  aws_s3 as s3,
  CfnOutput,
  RemovalPolicy,
  Stack,
} from "aws-cdk-lib";
import {
  loadPrinceAssetMeta,
  princeAssetBucketName,
} from "./utils/prince-asset.ts";

/**
 * App-specific cloud prerequisites (imported by deployment/prerequisites.ts).
 * Creates the private bucket that holds the pinned Prince AWS Lambda zip.
 */
export function addAdditionalPrerequisites(stack: Stack, _vpc: ec2.IVpc) {
  const project = process.env.PROJECT!;
  const account = stack.account;
  const meta = loadPrinceAssetMeta();
  const bucketName = princeAssetBucketName(project, account);

  const princeAssetsBucket = new s3.Bucket(stack, "PrinceAssetsBucket", {
    bucketName,
    encryption: s3.BucketEncryption.S3_MANAGED,
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    enforceSSL: true,
    versioned: true,
    // Account-level asset store — keep across stack updates; destroy only if empty.
    removalPolicy: RemovalPolicy.RETAIN,
    autoDeleteObjects: false,
  });

  new CfnOutput(stack, "PrinceAssetsBucketName", {
    value: princeAssetsBucket.bucketName,
    description: `Upload prince-${meta.version}-aws-lambda.zip via ./scripts/publish-prince-asset.sh`,
  });
}
