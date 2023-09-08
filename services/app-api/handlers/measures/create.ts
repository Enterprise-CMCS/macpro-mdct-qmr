import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";
import {
  hasRolePermissions,
  hasStatePermissions,
} from "../../libs/authorization";
import { MeasureStatus, CoreSetAbbr, UserRoles } from "../../types";
import { Errors, StatusCodes } from "../../utils/constants/constants";

export const createMeasure = handler(async (event, context) => {
  // action limited to state users from corresponding state
  const isStateUser = hasRolePermissions(event, [UserRoles.STATE_USER]);
  const isFromCorrespondingState = hasStatePermissions(event);
  if (!isStateUser || !isFromCorrespondingState) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      body: Errors.UNAUTHORIZED,
    };
  }

  const body = JSON.parse(event!.body!);
  const dynamoKey = createCompoundKey(event);
  const params = {
    TableName: process.env.measureTableName!,
    Item: {
      compoundKey: dynamoKey,
      state: event!.pathParameters!.state!,
      year: parseInt(event!.pathParameters!.year!),
      coreSet: event!.pathParameters!.coreSet! as CoreSetAbbr,
      measure: event!.pathParameters!.measure!,
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
