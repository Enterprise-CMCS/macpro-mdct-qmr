import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseSpecificMeasureParameters } from "../../utils/parseParameters";

export const getRate = handler(async (event, context) => {
  const { allParamsValid, year, state, coreSet, measure } =
    parseSpecificMeasureParameters(event);
  if (!allParamsValid) {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: Errors.NO_KEY,
    };
  }
  const dynamoKey = `${state}${year}${coreSet}${measure}`;
  const params = {
    TableName: process.env.rateTableName!,
    Key: {
      compoundKey: dynamoKey,
      measure: measure,
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
