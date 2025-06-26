import { Construct } from "constructs";
import {
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as cloudfrontOrigins,
  aws_s3 as s3,
  RemovalPolicy,
  Aws,
  Duration,
} from "aws-cdk-lib";

interface createMinimalComponentsProps {
  scope: Construct;
  stage: string;
}

export function createMinimalComponents(props: createMinimalComponentsProps) {
  const { scope, stage } = props;
  const service = "minimal";

  for (let i = 1; i <= 20; i++) {
    const bucket = new s3.Bucket(scope, `SomeBucket${i}`, {
      bucketName: `${service}-${stage}-bucket-${i}-${Aws.ACCOUNT_ID}`,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_PREFERRED,
      enforceSSL: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const cachePolicy = new cloudfront.CachePolicy(
      scope,
      `CustomCachePolicy${i}`,
      {
        queryStringBehavior: cloudfront.CacheQueryStringBehavior.all(),
        cookieBehavior: cloudfront.CacheCookieBehavior.none(),
      }
    );

    new cloudfront.Distribution(scope, `CloudFrontDistribution${i}`, {
      defaultBehavior: {
        origin:
          cloudfrontOrigins.S3BucketOrigin.withOriginAccessControl(bucket),
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy,
        compress: true,
        // responseHeadersPolicy: securityHeadersPolicy,
      },
      defaultRootObject: "index.html",
      httpVersion: cloudfront.HttpVersion.HTTP2,
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
      ],
    });
  }
}
