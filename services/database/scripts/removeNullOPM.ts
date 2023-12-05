import prompt from "prompt-sync";
import AWS from "aws-sdk";
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";

/***
 * Run with `npx tsx removeNullOPM.ts`
 */
const removeNullOPM = async () => {
  const dynamoConfig: AWS.DynamoDB.DocumentClient.DocumentClientOptions &
    ServiceConfigurationOptions &
    AWS.DynamoDB.ClientApiVersions = {};

  const endpoint = process.env.DYNAMODB_URL;
  if (endpoint) {
    dynamoConfig.endpoint = endpoint;
    dynamoConfig.accessKeyId = "LOCALFAKEKEY"; // pragma: allowlist secret
    dynamoConfig.secretAccessKey = "LOCALFAKESECRET"; // pragma: allowlist secret
  } else {
    dynamoConfig["region"] = "us-east-1";
  }

  const client = new AWS.DynamoDB.DocumentClient(dynamoConfig);
  const ratesField = "OtherPerformanceMeasure-Rates";
  const p = prompt();

  const measureID = p("Measure ID to clean: ");
  const tableName = p("What table would you like to modify: ");

  const foundMeasure = await client
    .query({
      TableName: tableName,
      KeyConditionExpression: "compoundKey = :compoundKey",
      ExpressionAttributeValues: {
        ":compoundKey": measureID,
      },
    })
    .promise();

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
    await client.update(params).promise();
    console.log(`Removed null values from OPM Rates in measure ${measureID}'`);
  }
};

removeNullOPM();
