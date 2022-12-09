import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

import error from "../../utils/constants/constants";
import { StatusCodes } from "../../utils/types/types";

export const deleteBanner = handler(async (event, _context) => {
  if (!event?.pathParameters?.bannerId!) {
    throw new Error(error.NO_KEY);
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
}, true);
