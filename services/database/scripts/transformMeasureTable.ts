import { DynamoDBClient, paginateScan } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const transformMeasureTable = async () => {
  const dbClient = buildClient(!!process.env.DYNAMODB_URL);
  const tableName = "local-measures";
  const newTableName = "local-cs-measures";
  console.log(`Processing table ${tableName}`);
  for await (let entry of scan(dbClient, tableName)) {
    add(dbClient, newTableName, entry);
  }
};

async function* scan(client: DynamoDBDocumentClient, table: string) {
  const query = {
    TableName: table,
  };
  for await (const result of paginateScan({ client }, query)) {
    yield* result.Items ?? [];
  }
}

async function add(client: DynamoDBDocumentClient, table: string, entry: any) {
  const newCompoundKey = `${entry.state}${entry.year}${entry.coreSet}`;
  const params = {
    TableName: table,
    Item: {
      compoundKey: newCompoundKey,
      coreSet: entry.coreSet,
    },
  };
  await client.send(new PutCommand(params));
}

function buildClient(isLocal: boolean) {
  if (isLocal) {
    return DynamoDBDocumentClient.from(
      new DynamoDBClient({
        region: "localhost",
        endpoint: "http://localhost:8000",
        credentials: {
          accessKeyId: "LOCALFAKEKEY", // pragma: allowlist secret
          secretAccessKey: "LOCALFAKESECRET", // pragma: allowlist secret
        },
      })
    );
  } else {
    return DynamoDBDocumentClient.from(
      new DynamoDBClient({
        region: "us-east-1",
        logger: {
          debug: () => {
            /* Dynamo's debug logs are extremely noisy */
          },
          info: console.info,
          warn: console.warn,
          error: console.error,
        },
      })
    );
  }
}
