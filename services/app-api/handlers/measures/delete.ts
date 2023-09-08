import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";
import {
  hasRolePermissions,
  hasStatePermissions,
} from "../../libs/authorization";
import { UserRoles } from "../../types";
import { Errors, StatusCodes } from "../../utils/constants/constants";

export const deleteMeasure = handler(async (event, context) => {
  // action limited to state users from corresponding state
  const isStateUser = hasRolePermissions(event, [UserRoles.STATE_USER]);
  const isFromCorrespondingState = hasStatePermissions(event);
  if (!isStateUser || !isFromCorrespondingState) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      body: Errors.UNAUTHORIZED,
    };
  }

  const dynamoKey = createCompoundKey(event);
  const params = {
    TableName: process.env.measureTableName!,
    Key: {
      compoundKey: dynamoKey,
      coreSet: event!.pathParameters!.coreSet!,
    },
  };

  await dynamoDb.delete(params);

  return params;
});
