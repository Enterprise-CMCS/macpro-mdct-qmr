import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  UpdateCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import prompt from "prompt-sync";

/*
 *
 * Run with `npx tsx removeNullOPM.ts`
 */
const removeNullOPM = async () => {
  const dbClient = buildClient(!!process.env.DYNAMODB_URL);
  const ratesField = "OtherPerformanceMeasure-Rates";
  const p = prompt();

  const measureID = p("Measure ID to clean: ");
  const tableName = p("What table would you like to modify: ");

  const foundMeasure = await dbClient.send(
    new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: "compoundKey = :compoundKey",
      ExpressionAttributeValues: {
        ":compoundKey": measureID,
      },
    })
  );

  if (foundMeasure.Items && foundMeasure.Items.length > 0) {
    const opmRates: any[] = foundMeasure.Items[0].data[ratesField];
    const newOpmRates = opmRates.filter((n) => n); // remove all falsey values

    const params = {
      TableName: tableName,
      Key: {
        compoundKey: foundMeasure.Items[0].compoundKey,
        coreSet: foundMeasure.Items[0].coreSet,
      },
      UpdateExpression: "set #data.#opmRates = :opmRates",
      ExpressionAttributeValues: {
        ":opmRates": newOpmRates,
      },
      ExpressionAttributeNames: {
        "#data": "data",
        "#opmRates": ratesField,
      },
    };
    await dbClient.send(new UpdateCommand(params));
    console.log(`Removed null values from OPM Rates in measure ${measureID}'`);
  }
};

removeNullOPM();

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
