import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const editCoreSet = handler(async (event, context) => {
  // The State Year and ID are all part of the path
  const stateYearId = event.path.split("/");
  const state = stateYearId[2];
  const year = stateYearId[3];
  const id = stateYearId[4];
  // Dynamo only accepts one row as a key, so we are using a combination for the dynamoKey
  const dynamoKey = `${state}${year}${id}`;

  const params = {
    TableName: process.env.CORESET_TABLE_NAME,
    Key: {
      compoundKey: dynamoKey,
      id: id,
    },
    UpdateExpression: "set #s = :r",
    ExpressionAttributeNames: {
      "#s": "status",
    },
    ExpressionAttributeValues: {
      ":r": "complete",
    },
  };
  await dynamoDb.update(params);

  return params;
});
