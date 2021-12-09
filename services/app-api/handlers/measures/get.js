import handler from "../../libs/handler-lib";
// import dynamoDb from "./../libs/dynamodb-lib";

export const listMeasures = handler(async (event, context) => {
  // If this invokation is a prewarm, do nothing and return.
  console.log(event, context);
  return event.pathParameters;
});

export const listMeasuresMetadata = handler(async (event, context) => {
  // If this invokation is a prewarm, do nothing and return.
  console.log(event, context);
  return event.pathParameters;
});

export const getMeasure = handler(async (event, context) => {
  // If this invokation is a prewarm, do nothing and return.
  console.log(event, context);
  return event.pathParameters;
});
