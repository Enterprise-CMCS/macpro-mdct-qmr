import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

import { Errors, StatusCodes } from "../../utils/constants/constants";

export const createBanner = handler(async (event, _context) => {
  const validPayload = (payload: any) => {
    return (
      payload.title &&
      payload.description &&
      payload.startDate &&
      payload.endDate
    );
  };

  if (!event?.pathParameters?.bannerId!) {
    throw new Error(Errors.NO_KEY);
  } else {
    const payload = JSON.parse(event!.body!);
    if (!validPayload(payload)) throw new Error(Errors.INVALID_DATA);
    const params: any = {
      TableName: process.env.bannerTableName!,
      Item: {
        key: event.pathParameters.bannerId,
        createdAt: Date.now(),
        lastAltered: Date.now(),
        lastAlteredBy: event?.headers["cognito-identity-id"],
        ...payload,
      },
    };

    await dynamoDb.put(params);
    return { status: StatusCodes.CREATED };
  }
});
