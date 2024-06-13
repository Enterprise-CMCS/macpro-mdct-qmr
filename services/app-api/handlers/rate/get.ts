import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { StatusCodes } from "../../utils/constants/constants";

export const getRate = handler(async (event, context) => {
  const { year, state, coreSet, measure } = event.pathParameters!;
  const dynamoKey = `${state}${year}${coreSet}${measure}`;
  const params = {
    TableName: process.env.rateTableName!,
    Key: {
      compoundKey: dynamoKey,
      measure: event!.pathParameters!.measure!,
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
