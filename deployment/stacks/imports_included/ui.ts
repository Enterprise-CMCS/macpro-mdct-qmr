import { Construct } from "constructs";
import {
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as cloudfrontOrigins,
  aws_s3 as s3,
  RemovalPolicy,
  Aws,
} from "aws-cdk-lib";

interface CreateUiComponentsProps {
  scope: Construct;
}

export function createUiComponents(props: CreateUiComponentsProps) {
  const { scope } = props;

  const distribution = new cloudfront.Distribution(
    scope,
    "CloudFrontDistribution",
    {
      defaultBehavior: {
        origin: new cloudfrontOrigins.HttpOrigin("www.example.com", {
          originId: "Default",
        }),
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
      },
    }
  );
  distribution.applyRemovalPolicy(RemovalPolicy.RETAIN);
}
