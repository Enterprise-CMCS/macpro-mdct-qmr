const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  paginateScan,
} = require("@aws-sdk/lib-dynamodb");

const client = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: "us-east-1",
    logger: console,
  })
);

module.exports = {
  scanAll: async (TableName) => {
    let items = [];
    for await (let page of paginateScan({ client }, { TableName })) {
      items.push(...(page.Items ?? []));
    }
    return items;
  },
};
