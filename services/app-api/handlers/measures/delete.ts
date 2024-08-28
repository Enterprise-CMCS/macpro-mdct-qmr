import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { createMeasureKey } from "../dynamoUtils/createCompoundKey";
import { hasStatePermissions } from "../../libs/authorization";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseSpecificMeasureParameters } from "../../utils/parseParameters";

export const deleteMeasure = handler(async (event, context) => {
  const { allParamsValid, state, year, coreSet, measure } =
    parseSpecificMeasureParameters(event);
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

  const dynamoKey = createMeasureKey({ state, year, coreSet, measure });
  const params = {
    TableName: process.env.measureTableName!,
    Key: {
      compoundKey: dynamoKey,
      coreSet: coreSet,
    },
  };

  await dynamoDb.delete(params);

  return { status: StatusCodes.SUCCESS, body: params };
});
