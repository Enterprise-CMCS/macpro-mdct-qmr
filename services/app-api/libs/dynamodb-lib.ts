import AWS from "aws-sdk";
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";
import * as Types from "../types";

export function createDbClient() {
  const dynamoConfig: AWS.DynamoDB.DocumentClient.DocumentClientOptions &
    ServiceConfigurationOptions &
    AWS.DynamoDB.ClientApiVersions = {};

  // ugly but OK, here's where we will check the environment
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
  get: (params: any) => client.get(params).promise(),
  put: (params: any) => client.put(params).promise(),
  post: (params: Types.CreateCoreSet | Types.CreateMeasure) =>
    client.put(params).promise(),
  query: (params: any) => client.query(params).promise(),
  scan: (params: any) => client.scan(params).promise(),
  update: (params: any) => client.update(params).promise(),
  delete: (params: any) => client.delete(params).promise(),
};
