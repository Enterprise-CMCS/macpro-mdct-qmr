import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";
import {
  getUserNameFromJwt,
  hasStatePermissions,
} from "../../libs/authorization";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { calculateAndPutRate } from "../rate/shared/calculateAndPutRate";
import { MeasureParameters } from "../../types";

export const editMeasure = handler(async (event, context) => {
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

  const dynamoKey = createCompoundKey(event);
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
      coreSet: event!.pathParameters!.coreSet!,
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
  if (parseInt(event!.pathParameters!.year!) >= 2024) {
    //after updating the database with the latest values for the measure, we run the combine rates calculations for said measure
    await calculateAndPutRate(
      event!.pathParameters! as unknown as MeasureParameters
    ); // TODO, fix this ugly double cast
  }

  return { status: StatusCodes.SUCCESS, body: params };
});
