import { Construct } from "constructs";
import { aws_dynamodb as dynamodb, aws_s3 as s3, Aws } from "aws-cdk-lib";
import { DynamoDBTable } from "../constructs/dynamodb-table";

interface CreateDataComponentsProps {
  scope: Construct;
  stage: string;
  isDev: boolean;
}

export function createDataComponents(props: CreateDataComponentsProps) {
  const { scope, stage, isDev } = props;

  return [
    new DynamoDBTable(scope, "Banners", {
      stage,
      isDev,
      name: "banners",
      partitionKey: { name: "key", type: dynamodb.AttributeType.STRING },
    }).identifiers,
    new DynamoDBTable(scope, "Measures", {
      stage,
      isDev,
      name: "measure",
      partitionKey: {
        name: "compoundKey",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: { name: "measure", type: dynamodb.AttributeType.STRING },
    }).identifiers,
    new DynamoDBTable(scope, "QualityCoreSets", {
      stage,
      isDev,
      name: "coreSet",
      partitionKey: {
        name: "compoundKey",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: { name: "coreSet", type: dynamodb.AttributeType.STRING },
    }).identifiers,
    new DynamoDBTable(scope, "CombinedRates", {
      stage,
      isDev,
      name: "rate",
      partitionKey: {
        name: "compoundKey",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: { name: "measure", type: dynamodb.AttributeType.STRING },
    }).identifiers,
  ];
}
