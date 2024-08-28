import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { hasRolePermissions } from "../../libs/authorization";
import { UserRoles } from "../../types";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseBannerParameters } from "../../utils/parseParameters";

export const createBanner = handler(async (event, _context) => {
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

  const validPayload = (payload: any) => {
    return (
      payload.title &&
      payload.description &&
      payload.startDate &&
      payload.endDate
    );
  };

  const payload = JSON.parse(event!.body!);
  if (!validPayload(payload)) throw new Error(Errors.INVALID_DATA);
  const params: any = {
    TableName: process.env.bannerTableName!,
    Item: {
      key: bannerId,
      createdAt: Date.now(),
      lastAltered: Date.now(),
      lastAlteredBy: event?.headers["cognito-identity-id"],
      ...payload,
    },
  };

  await dynamoDb.put(params);
  return { status: StatusCodes.CREATED };
});
