import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { Errors, StatusCodes } from "../../utils/constants/constants";

export const deleteBanner = handler(async (event, _context) => {
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
