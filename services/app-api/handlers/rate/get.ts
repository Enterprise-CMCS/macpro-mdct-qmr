import handler from "../../libs/handler-lib";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";
import dynamoDb from "../../libs/dynamodb-lib";
import { StatusCodes } from "../../utils/constants/constants";

export const getRate = handler(async (event, context) => {
  const dynamoKey = createCompoundKey(event);
  const params = {
    TableName: process.env.rateTableName!,
    Key: {
      compoundKey: dynamoKey,
      coreSet: event!.pathParameters!.coreSet!,
    },
  };
  const queryValue = await dynamoDb.get(params);
  return {
    status: StatusCodes.SUCCESS,
    body: {
      Item: queryValue,
    },
  };
});
