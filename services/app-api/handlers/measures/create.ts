import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { createMeasureKey } from "../dynamoUtils/createCompoundKey";
import {
  hasRolePermissions,
  hasStatePermissions,
} from "../../libs/authorization";
import { MeasureStatus, UserRoles } from "../../types";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseMeasureParameters } from "../../utils/parseParameters";

export const createMeasure = handler(async (event, context) => {
  const { allParamsValid, state, year, coreSet, measure } =
    parseMeasureParameters(event);
  if (!allParamsValid) {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: Errors.NO_KEY,
    };
  }
  // action limited to any admin type user and state users from corresponding state
  const isStateUser = hasRolePermissions(event, [UserRoles.STATE_USER]);
  if (isStateUser) {
    const isFromCorrespondingState = hasStatePermissions(event);
    if (!isFromCorrespondingState) {
      return {
        status: StatusCodes.UNAUTHORIZED,
        body: Errors.UNAUTHORIZED,
      };
    }
  } // if not state user, can safely assume admin type user due to baseline handler protections

  const body = JSON.parse(event!.body!);
  const dynamoKey = createMeasureKey({ state, year, coreSet, measure });
  const params = {
    TableName: process.env.measureTableName!,
    Item: {
      compoundKey: dynamoKey,
      state: state,
      year: parseInt(year),
      coreSet: coreSet,
      measure: measure,
      createdAt: Date.now(),
      lastAltered: Date.now(),
      lastAlteredBy: event.headers["cognito-identity-id"],
      status: MeasureStatus.INCOMPLETE,
      description: body.description ?? "",
      detailedDescription: body.detailedDescription ?? "",
      data: body.data,
      userCreated: body.userCreated,
      placeholder: body.placeholder,
    },
  };

  await dynamoDb.put(params);

  return { status: StatusCodes.SUCCESS, body: params };
});
