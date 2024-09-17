import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";
import {
  getUserNameFromJwt,
  hasStatePermissions,
} from "../../libs/authorization";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseMeasureParameters } from "../../utils/parseParameters";
import { calculateAndPutRate } from "../rate/rateCalculations";

export const editMeasure = handler(async (event, context) => {
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

  const {
    data,
    status,
    reporting = null,
    description,
    detailedDescription,
  } = JSON.parse(event!.body!);

  const lastAlteredBy = getUserNameFromJwt(event);

  const descriptionParams =
    description && detailedDescription
      ? {
          description,
          detailedDescription,
        }
      : {};
  const params = {
    TableName: process.env.measureTable!,
    Key: {
      compoundKey: `${state}${year}${coreSet}`,
      measure: measure,
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
  if (year >= 2024) {
    //after updating the database with the latest values for the measure, we run the combine rates calculations for said measure
    await calculateAndPutRate({
      state,
      year: year.toString(),
      coreSet,
      measure,
    });
  }

  return { status: StatusCodes.SUCCESS, body: params };
});
