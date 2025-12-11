import { Construct } from "constructs";
import { aws_dynamodb as dynamodb } from "aws-cdk-lib";
import { DynamoDBTable } from "../constructs/dynamodb-table.js";

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
      streamable: false,
      partitionKey: { name: "key", type: dynamodb.AttributeType.STRING },
    }),
    new DynamoDBTable(scope, "Measures", {
      stage,
      isDev,
      name: "measure",
      partitionKey: {
        name: "compoundKey",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: { name: "measure", type: dynamodb.AttributeType.STRING },
    }),
    new DynamoDBTable(scope, "QualityCoreSets", {
      stage,
      isDev,
      name: "coreSet",
      partitionKey: {
        name: "compoundKey",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: { name: "coreSet", type: dynamodb.AttributeType.STRING },
    }),
    new DynamoDBTable(scope, "CombinedRates", {
      stage,
      isDev,
      name: "rate",
      partitionKey: {
        name: "compoundKey",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: { name: "measure", type: dynamodb.AttributeType.STRING },
    }),
  ];
}
