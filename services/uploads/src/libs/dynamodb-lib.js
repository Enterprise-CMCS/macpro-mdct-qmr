const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: "us-east-1" })
);

module.exports = {
  scan: async (params) => {
    await client.send(new ScanCommand(params));
  },
};
