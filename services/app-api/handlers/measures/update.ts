import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";
import { createMeasureKey } from "../dynamoUtils/createCompoundKey";
import {
  getUserNameFromJwt,
  hasStatePermissions,
} from "../../libs/authorization";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseSpecificMeasureParameters } from "../../utils/parseParameters";
import { calculateAndPutRate } from "../rate/rateCalculations";

export const editMeasure = handler(async (event, context) => {
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

  const {
    data,
    status,
    reporting = null,
    description,
    detailedDescription,
  } = JSON.parse(event!.body!);

  const dynamoKey = createMeasureKey({ state, year, coreSet, measure });
  const lastAlteredBy = getUserNameFromJwt(event);

  const descriptionParams =
    description && detailedDescription
      ? {
          description,
          detailedDescription,
        }
      : {};
  const params = {
    TableName: process.env.measureTableName!,
    Key: {
      compoundKey: dynamoKey,
      coreSet: coreSet,
    },
    ...convertToDynamoExpression(
      {
        ...descriptionParams,
        status,
        reporting,
        lastAltered: Date.now(),
        lastAlteredBy,
        data,
      },
      "post"
    ),
  };
  await dynamoDb.update(params);

  //in 2024 and onward, we added a new feature called combined rates which requires rate calculations to the rates table
  if (parseInt(year) >= 2024) {
    //after updating the database with the latest values for the measure, we run the combine rates calculations for said measure
    await calculateAndPutRate({
      state,
      year,
      coreSet,
      measure,
    });
  }

  return { status: StatusCodes.SUCCESS, body: params };
});
