import * as readline from "readline";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  paginateScan,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import prompt from "prompt-sync";

/***
 * Run with `npx tsx syncKafka2024.ts`
 *
 * THE LOCAL OPTION IS NOW MORE COMPLICATED IT YOU NEED TO RUN THIS SCRIPT IN A LOCAL CONTEXT HERE'S A SPOT TO LOOK FOR SUGGESTIONS:
 * https://stackoverflow.com/questions/73294767/how-do-i-execute-a-shell-script-against-my-localstack-docker-container-after-it *
 */

const lastModifiedField = "lastAltered";
const tables = ["-coreSet", "-measure", "-rate"];
const syncTime = new Date().toISOString();

// I/O
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let stage = "local";
const promptString = (query: string) =>
  new Promise<string>((resolve) => rl.question(query, resolve));
const promptYesNo = async (query: string) => {
  do {
    const userInput = await promptString(query);
    switch (userInput.toUpperCase()[0]) {
      case "Y":
        return true;
      case "N":
        return false;
      default:
        rl.write("Y or N only, please.\n");
    }
  } while (true);
};

async function handler() {
  const isLocal = await promptYesNo(
    "Do you want to run this script locally? Y/N: "
  );
  if (!isLocal) {
    stage = await promptString(
      "What environment are we running on (e.g. master, val, production)? "
    );
  }
  const client = buildClient(isLocal);
  try {
    console.log("Searching for 2024 modifications");

    for (const table of tables) {
      const tableName = stage + table;
      console.log(`Processing table ${tableName}`);
      for await (let entry of scan(client, tableName)) {
        if (new Date(entry[lastModifiedField]).getFullYear() === 2024) {
          await update(client, tableName, entry);
        }
      }
    }
    console.debug("Data fix complete");

    return {
      statusCode: 200,
      body: "All done!",
    };
  } catch (err: any) {
    console.error(err);
    return {
      statusCode: 500,
      body: err.message,
    };
  }
}

async function* scan(client: DynamoDBDocumentClient, table: string) {
  const query = {
    TableName: table,
  };
  for await (const result of paginateScan({ client }, query)) {
    yield* result.Items ?? [];
  }
}

async function update(
  client: DynamoDBDocumentClient,
  table: string,
  entry: any
) {
  const params = {
    TableName: table,
    Key: {
      compoundKey: entry.compoundKey,
      coreSet: entry.coreSet,
    },
    UpdateExpression: "set #lastSynced = :lastSynced",
    ExpressionAttributeValues: {
      ":lastSynced": syncTime,
    },
    ExpressionAttributeNames: {
      "#lastSynced": "lastSynced",
    },
  };
  await client.send(new UpdateCommand(params));
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

handler();
