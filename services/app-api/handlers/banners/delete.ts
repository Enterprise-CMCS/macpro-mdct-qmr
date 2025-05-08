import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { hasRolePermissions } from "../../libs/authorization";
import { UserRoles } from "../../types";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseBannerParameters } from "../../utils/parseParameters";

export const deleteBanner = handler(async (event, _context) => {
  const bannerId = parseBannerParameters(event);
  if (!bannerId) {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: Errors.NO_KEY,
    };
  }
  // action limited to admin users
  if (!hasRolePermissions(event, [UserRoles.ADMIN])) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      body: Errors.UNAUTHORIZED,
    };
  }

  const params: any = {
    TableName: process.env.BannersTable!,
    Key: {
      key: bannerId,
    },
  };
  await dynamoDb.delete(params);
  return { status: StatusCodes.SUCCESS, body: params };
});
