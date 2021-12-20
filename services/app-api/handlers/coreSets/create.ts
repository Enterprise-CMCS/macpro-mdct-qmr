import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { getCoreSet } from "./get";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";
import { Measures } from "../dynamoUtils/measureList";

export const createCoreSet = handler(async (event, context) => {
  if (!event.pathParameters) return; // throw error message
  if (
    !event.pathParameters.state ||
    !event.pathParameters.year ||
    !event.pathParameters.coreSet
  )
    return; // throw error message

  // The State Year and ID are all part of the path
  const state = event.pathParameters.state;
  const year = event.pathParameters.year;
  const coreSet = event.pathParameters.coreSet;
  const type = coreSet?.substring(0, 2);
  const coreSetQuery = await getCoreSet(event, context);
  const coreSetExists = !!Object.keys(JSON.parse(coreSetQuery.body)).length;

  if (coreSetExists) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Failure to create coreset. Coreset already exists.",
      }),
    };
  }
  const dynamoKey = createCompoundKey(event);

  const params = {
    TableName: process.env.coreSetTableName!,
    Item: {
      compoundKey: dynamoKey,
      state: state,
      year: year,
      coreSet: coreSet,
      createdAt: Date.now(),
      lastAltered: Date.now(),
      lastAlteredBy: event.headers["cognito-identity-id"],
      status: "incomplete",
    },
  };

  await dynamoDb.post(params);
  await createDependentMeasures(state, parseInt(year), coreSet, type);

  return params;
});

const createDependentMeasures = async (
  state: string,
  year: number,
  coreSet: string,
  type: string
) => {
  if (year !== 2021 && year !== 2022) return;

  const filteredMeasures = Measures[year].filter(
    (measure) => measure.type === type
  );

  console.log("James 2", filteredMeasures);

  for await (const measure of filteredMeasures) {
    // The State Year and ID are all part of the path
    const measureId = measure["measure"];
    // Dynamo only accepts one row as a key, so we are using a combination for the dynamoKey
    const dynamoKey = `${state}${year}${coreSet}${measureId}`;
    const params = {
      TableName: process.env.measureTableName,
      Item: {
        compoundKey: dynamoKey,
        state: state,
        year: year,
        coreSet: coreSet,
        measure: measureId,
        createdAt: Date.now(),
        lastAltered: Date.now(),
        status: "incomplete",
        description: measure.name,
      },
    };
    console.log("created measure: ", params);
    await dynamoDb.post(params);
  }
};
