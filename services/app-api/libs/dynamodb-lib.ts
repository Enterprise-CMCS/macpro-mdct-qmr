import AWS from "aws-sdk";
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";
import {
  CoreSet,
  Measure,
  DynamoCreate,
  DynamoDelete,
  DynamoUpdate,
  DynamoFetch,
  DynamoScan,
} from "../types";

export function createDbClient() {
  const dynamoConfig: AWS.DynamoDB.DocumentClient.DocumentClientOptions &
    ServiceConfigurationOptions &
    AWS.DynamoDB.ClientApiVersions = {};

  const endpoint = process.env.DYNAMODB_URL;
  if (endpoint) {
    dynamoConfig.endpoint = endpoint;
    dynamoConfig.accessKeyId = "LOCAL_FAKE_KEY"; // pragma: allowlist secret
    dynamoConfig.secretAccessKey = "LOCAL_FAKE_SECRET"; // pragma: allowlist secret
  } else {
    dynamoConfig["region"] = "us-east-1";
  }

  return new AWS.DynamoDB.DocumentClient(dynamoConfig);
}

const client = createDbClient();

export default {
  get: async <Result = CoreSet | Measure>(params: DynamoFetch) => {
    const result = await client.get(params).promise();
    return { ...result, Item: result?.Item as Result | undefined };
  },
  put: (params: DynamoCreate) => client.put(params).promise(),
  post: (params: DynamoCreate) => client.put(params).promise(),
  scan: async <Result = CoreSet | Measure>(params: DynamoScan) => {
    const items = [];
    let complete = false;
    while (!complete) {
      const result = await client.scan(params).promise();
      console.log(result);
      items.push(...(result?.Items as Result[] | []));
      params.ExclusiveStartKey = result.LastEvaluatedKey;
      complete = result.LastEvaluatedKey === undefined;
    }
    return { Items: items, Count: items.length };
  },
  update: (params: DynamoUpdate) => client.update(params).promise(),
  delete: (params: DynamoDelete) => client.delete(params).promise(),

  // unused
  query: (params: any) => client.query(params).promise(),
};
