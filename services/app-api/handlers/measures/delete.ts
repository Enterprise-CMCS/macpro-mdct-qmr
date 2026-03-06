import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { hasStatePermissions } from "../../libs/authorization";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseMeasureParameters } from "../../utils/parseParameters";

export const deleteMeasure = handler(async (event, _context) => {
  const { allParamsValid, state, year, coreSet, measure } =
    parseMeasureParameters(event);
  if (!allParamsValid) {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: Errors.NO_KEY,
    };
  }
  // action limited to state users from corresponding state
  if (!hasStatePermissions(event)) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      body: Errors.UNAUTHORIZED,
    };
  }

  const params = {
    TableName: process.env.MeasuresTable!,
    Key: {
      compoundKey: `${state}${year}${coreSet}`,
      measure: measure,
    },
  };

  await dynamoDb.delete(params);

  return { status: StatusCodes.SUCCESS, body: params };
});
