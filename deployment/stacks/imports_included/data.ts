import { Construct } from "constructs";
import { aws_dynamodb as dynamodb } from "aws-cdk-lib";
import { DynamoDBTable } from "../../constructs/dynamodb-table";

interface CreateDataComponentsProps {
  scope: Construct;
  stage: string;
}

export function createDataComponents(props: CreateDataComponentsProps) {
  const { scope, stage } = props;

  new DynamoDBTable(scope, "Banners", {
    stage,
    isDev: false,
    name: "banners",
    streamable: false,
    partitionKey: { name: "key", type: dynamodb.AttributeType.STRING },
  });
  new DynamoDBTable(scope, "Measures", {
    stage,
    isDev: false,
    name: "measure",
    partitionKey: {
      name: "compoundKey",
      type: dynamodb.AttributeType.STRING,
    },
    sortKey: { name: "measure", type: dynamodb.AttributeType.STRING },
  });
  new DynamoDBTable(scope, "QualityCoreSets", {
    stage,
    isDev: false,
    name: "coreSet",
    partitionKey: {
      name: "compoundKey",
      type: dynamodb.AttributeType.STRING,
    },
    sortKey: { name: "coreSet", type: dynamodb.AttributeType.STRING },
  });
  new DynamoDBTable(scope, "CombinedRates", {
    stage,
    isDev: false,
    name: "rate",
    partitionKey: {
      name: "compoundKey",
      type: dynamodb.AttributeType.STRING,
    },
    sortKey: { name: "measure", type: dynamodb.AttributeType.STRING },
  });
}
