/* eslint-disable multiline-comment-style */
import { Construct } from "constructs";
import {
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as cloudfrontOrigins,
  aws_iam as iam,
  aws_s3 as s3,
  aws_wafv2 as wafv2,
  Duration,
  RemovalPolicy,
  aws_certificatemanager as acm,
  Aws,
} from "aws-cdk-lib";
import { WafConstruct } from "../constructs/waf";
import { addIamPropertiesToBucketRole } from "../utils/s3";
import { IManagedPolicy } from "aws-cdk-lib/aws-iam";
import { isLocalStack } from "../local/util";

interface CreateUiComponentsProps {
  scope: Construct;
  stage: string;
  project: string;
  isDev: boolean;
  iamPermissionsBoundary: IManagedPolicy;
  iamPath: string;
  cloudfrontCertificateArn?: string;
  cloudfrontDomainName?: string;
  vpnIpSetArn: string;
  vpnIpv6SetArn: string;
}

export function createUiComponents(props: CreateUiComponentsProps) {
  const {
    scope,
    stage,
    project,
    isDev,
    iamPermissionsBoundary,
    iamPath,
    cloudfrontCertificateArn,
    cloudfrontDomainName,
    vpnIpSetArn,
    vpnIpv6SetArn,
  } = props;

  const uiBucket = new s3.Bucket(scope, "uiBucket", {
    encryption: s3.BucketEncryption.S3_MANAGED,
    removalPolicy: RemovalPolicy.DESTROY,
    autoDeleteObjects: true,
    enforceSSL: true,
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    versioned: true,
  });

  const logBucket = new s3.Bucket(scope, "CloudfrontLogBucket", {
    bucketName: `ui-${stage}-cloudfront-logs-${Aws.ACCOUNT_ID}`,
    encryption: s3.BucketEncryption.S3_MANAGED,
    publicReadAccess: false,
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_PREFERRED,
    removalPolicy: isDev ? RemovalPolicy.DESTROY : RemovalPolicy.RETAIN,
    autoDeleteObjects: isDev,
    enforceSSL: true,
    versioned: true,
  });

  logBucket.addToResourcePolicy(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      principals: [new iam.ServicePrincipal("cloudfront.amazonaws.com")],
      actions: ["s3:PutObject"],
      resources: [`${logBucket.bucketArn}/*`],
    })
  );

  const securityHeadersPolicy = new cloudfront.ResponseHeadersPolicy(
    scope,
    "CloudFormationHeadersPolicy",
    {
      responseHeadersPolicyName: `Headers-Policy-${stage}`,
      comment: "Add Security Headers",
      securityHeadersBehavior: {
        contentTypeOptions: {
          override: true,
        },
        strictTransportSecurity: {
          accessControlMaxAge: Duration.days(730),
          includeSubdomains: true,
          preload: true,
          override: true,
        },
        frameOptions: {
          frameOption: cloudfront.HeadersFrameOption.DENY,
          override: true,
        },
        contentSecurityPolicy: {
          contentSecurityPolicy:
            "default-src 'self'; img-src 'self' data: https://www.google-analytics.com; script-src 'self' https://www.google-analytics.com https://ssl.google-analytics.com https://www.googletagmanager.com tags.tiqcdn.com tags.tiqcdn.cn tags-eu.tiqcdn.com https://*.adoberesources.net 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src https://*.amazonaws.com/ https://*.amazoncognito.com https://www.google-analytics.com https://*.launchdarkly.us https://adobe-ep.cms.gov https://adobedc.demdex.net; frame-ancestors 'none'; object-src 'none'",
          override: true,
        },
        xssProtection: {
          protection: false,
          override: true,
        },
      },
    }
  );

  const cachePolicy = new cloudfront.CachePolicy(scope, "CustomCachePolicy", {
    queryStringBehavior: cloudfront.CacheQueryStringBehavior.all(),
    cookieBehavior: cloudfront.CacheCookieBehavior.none(),
  });

  const distribution = new cloudfront.Distribution(
    scope,
    "CloudFrontDistribution",
    {
      certificate: cloudfrontCertificateArn
        ? acm.Certificate.fromCertificateArn(
            scope,
            "certArn",
            cloudfrontCertificateArn
          )
        : undefined,
      domainNames: cloudfrontDomainName ? [cloudfrontDomainName] : [],
      defaultBehavior: {
        origin:
          cloudfrontOrigins.S3BucketOrigin.withOriginAccessControl(uiBucket),
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy,
        compress: true,
        responseHeadersPolicy: securityHeadersPolicy,
      },
      defaultRootObject: "index.html",
      enableLogging: true,
      logBucket,
      logFilePrefix: `AWSLogs/CLOUDFRONT/${stage}/`,
      httpVersion: cloudfront.HttpVersion.HTTP2,
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
      ],
    }
  );

  distribution.applyRemovalPolicy(
    isDev ? RemovalPolicy.DESTROY : RemovalPolicy.RETAIN
  );

  if (!isLocalStack) {
    const waf = setupWaf(
      scope,
      stage,
      project,
      isDev,
      vpnIpSetArn,
      vpnIpv6SetArn
    );
    distribution.attachWebAclId(waf.webAcl.attrArn);
  }

  const applicationEndpointUrl = `https://${distribution.distributionDomainName}/`;

  addIamPropertiesToBucketRole(
    scope,
    "Custom::S3AutoDeleteObjectsCustomResourceProvider/Role",
    iamPermissionsBoundary.managedPolicyArn,
    iamPath
  );

  return {
    applicationEndpointUrl,
    distribution,
    uiBucket,
  };
}

function setupWaf(
  scope: Construct,
  stage: string,
  project: string,
  isDev: boolean,
  vpnIpSetArn: string,
  vpnIpv6SetArn: string
) {
  const githubIpSet = new wafv2.CfnIPSet(scope, "GitHubIPSet", {
    name: `${stage}-gh-ipset`,
    scope: "CLOUDFRONT",
    addresses: [],
    ipAddressVersion: "IPV4",
  });

  const wafRules: wafv2.CfnWebACL.RuleProperty[] = [];
  if (isDev) {
    // Additional Rules for this WAF only because CMS asked to have the application made vpn only
    wafRules.push(
      {
        name: "vpn-only",
        priority: 0,
        action: { allow: {} },
        visibilityConfig: {
          cloudWatchMetricsEnabled: true,
          metricName: `${project}-${stage}-webacl-vpn-only`,
          sampledRequestsEnabled: true,
        },
        statement: {
          orStatement: {
            statements: [
              {
                ipSetReferenceStatement: { arn: vpnIpSetArn },
              },
              {
                ipSetReferenceStatement: { arn: vpnIpv6SetArn },
              },
              {
                ipSetReferenceStatement: { arn: githubIpSet.attrArn },
              },
            ],
          },
        },
      },
      {
        name: "block-all-other-traffic",
        priority: 3,
        action: {
          block: {
            customResponse: { responseCode: 403 },
          },
        },
        visibilityConfig: {
          cloudWatchMetricsEnabled: true,
          metricName: `${project}-${stage}-block-traffic`,
          sampledRequestsEnabled: true,
        },
        statement: {
          notStatement: {
            statement: { ipSetReferenceStatement: { arn: vpnIpSetArn } },
          },
        },
      }
    );
  }

  return new WafConstruct(
    scope,
    "CloudfrontWafConstruct",
    {
      name: `${project}-${stage}-ui`,
      additionalRules: wafRules,
    },
    "CLOUDFRONT"
  );
}
