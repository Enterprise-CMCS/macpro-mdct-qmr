import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

import error from "../../utils/constants/constants";
import { StatusCodes } from "../../utils/types/types";

export const createBanner = handler(async (event, _context) => {
  if (!event?.pathParameters?.bannerId!) {
    throw new Error(error.NO_KEY);
  } else {
    const payload = JSON.parse(event!.body!);
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

    const result = await dynamoDb.put(params);
    return { statusCode: StatusCodes.CREATED, body: params };
  }
}, true);
