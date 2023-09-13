import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { hasRolePermissions } from "../../libs/authorization";
import { UserRoles } from "../../types";
import { Errors, StatusCodes } from "../../utils/constants/constants";

export const deleteBanner = handler(async (event, _context) => {
  // action limited to admin users
  if (!hasRolePermissions(event, [UserRoles.ADMIN])) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      body: Errors.UNAUTHORIZED,
    };
  }

  if (!event?.pathParameters?.bannerId!) {
    throw new Error(Errors.NO_KEY);
  } else {
    const params: any = {
      TableName: process.env.bannerTableName!,
      Key: {
        key: event?.pathParameters?.bannerId!,
      },
    };
    await dynamoDb.delete(params);
    return { status: StatusCodes.SUCCESS, body: params };
  }
});
