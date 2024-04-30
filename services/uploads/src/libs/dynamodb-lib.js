import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: "us-east-1" })
);

module.exports = {
  scan: async (params) => {
    await client.send(new ScanCommand(params));
  },
};
