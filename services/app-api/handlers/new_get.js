import handler from "./../libs/handler-lib";
// import dynamoDb from "./../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  console.log(event, context);
  return event.pathParameters;
});

export const coreSetList = handler(async (event, context) => {
  // If this invokation is a prewarm, do nothing and return.
  console.log(event, context);
  return event.pathParameters;
});

export const specificCoreSet = handler(async (event, context) => {
  // If this invokation is a prewarm, do nothing and return.
  console.log(event, context);
  return event.pathParameters;
});
