import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  paginateQuery,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const { MeasuresTable, QualityCoreSetsTable } = process.env;
const OLD_CORE_SET = "HHCS_22-0004";
const OLD_COMP_KEY = `IA2025${OLD_CORE_SET}`;
const NEW_CORE_SET = "HHCS_20-0011";
const NEW_COMP_KEY = `IA2025${NEW_CORE_SET}`;

const awsConfig = {
  region: "us-east-1",
  logger: {
    debug: () => {},
    info: () => {},
    warn: console.warn,
    error: console.error,
  },
};

const client = DynamoDBDocumentClient.from(new DynamoDBClient(awsConfig));
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  fractionalSecondDigits: 3,
});
const logPrefix = () => dateFormatter.format(new Date()) + " | ";

const renameMeasures = async () => {
  const measurePages = paginateQuery(
    { client },
    {
      TableName: MeasuresTable,
      KeyConditionExpression: "compoundKey = :compoundKey",
      ExpressionAttributeValues: {
        ":compoundKey": OLD_COMP_KEY,
      },
    }
  );
  let pageCount = 0;
  let itemCount = 0;
  for await (const page of measurePages) {
    pageCount += 1;
    console.debug(`${logPrefix()}Processing query result page ${pageCount}...`);
    for (let measure of page.Items ?? []) {
      itemCount += 1;
      console.debug(`${logPrefix()}Processing measure ${itemCount}...`);
      // Create a modified object with the correct IDs
      const renamedMeasure = {
        ...measure,
        compoundKey: NEW_COMP_KEY,
        coreSet: NEW_CORE_SET,
      };

      // Save the modified object to the DB
      await client.send(
        new PutCommand({
          TableName: MeasuresTable,
          Item: renamedMeasure,
        })
      );

      // Delete the original object from the DB
      await client.send(
        new DeleteCommand({
          TableName: MeasuresTable,
          Key: {
            compoundKey: OLD_COMP_KEY,
            measure: measure.measure,
          },
        })
      );
    }
  }
  console.debug(`${logPrefix()}Renamed ${itemCount} measures.`);
};

const renameCoreSet = async () => {
  const response = await client.send(
    new GetCommand({
      TableName: QualityCoreSetsTable,
      Key: {
        compoundKey: "IA2025",
        coreSet: OLD_CORE_SET,
      },
    })
  );
  if (!response.Item) {
    console.warn(`${logPrefix()}Could not find old core set. Skipping.`);
    return;
  }

  // Create modified object with correct ID
  const renamedCoreSet = {
    ...response.Item,
    compoundKey: "IA2025",
    coreSet: NEW_CORE_SET,
  };

  // Save the modified object to the DB
  await client.send(
    new PutCommand({
      TableName: QualityCoreSetsTable,
      Item: renamedCoreSet,
    })
  );

  // Delete the original object from the DB
  await client.send(
    new DeleteCommand({
      TableName: QualityCoreSetsTable,
      Key: {
        compoundKey: "IA2025",
        coreSet: OLD_CORE_SET,
      },
    })
  );

  console.debug(`${logPrefix()}Renamed core set.`);
};

const main = async () => {
  console.info(`${logPrefix()}Renaming measures...`);
  await renameMeasures();
  console.info(`${logPrefix()}Renaming core set...`);
  await renameCoreSet();
  console.info(`${logPrefix()}Complete!`);
};

main();
