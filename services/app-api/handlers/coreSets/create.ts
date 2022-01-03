import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { getCoreSet } from "./get";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";
import { MeasureMetaData, measures } from "../dynamoUtils/measureList";
import { errorHandler } from "../authUtils/checkAuth";

export const createCoreSet = handler(async (event, context) => {
  const errorCode = errorHandler(event, 'POST')
  if(errorCode !== 200){
    return {
      statusCode: errorCode,
      body: JSON.stringify({
        error: "Failure: HTTP Status Code ", errorCode,
      }),
    };
  }

  // The State Year and ID are all part of the path
  // @ts-ignore
  const state = event.pathParameters.state;
  // @ts-ignore
  const year = event.pathParameters.year;
  // @ts-ignore
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
      // @ts-ignore
      year: parseInt(year),
      coreSet: coreSet,
      createdAt: Date.now(),
      lastAltered: Date.now(),
      lastAlteredBy: event.headers["cognito-identity-id"],
      status: "incomplete",
    },
  };

  await dynamoDb.post(params);
  // @ts-ignore
  await createDependentMeasures(state, parseInt(year), coreSet, type);

  return params;
});

const createDependentMeasures = async (
  state: string,
  year: number,
  coreSet: string,
  type: string
) => {
  const filteredMeasures = measures[year].filter(
    (measure: MeasureMetaData) => measure.type === type
  );

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
        status: measure.autocompleteOnCreation ? "complete" : "incomplete",
        description: measure.description,
      },
    };
    console.log("created measure: ", params);
    await dynamoDb.post(params);
  }
};
