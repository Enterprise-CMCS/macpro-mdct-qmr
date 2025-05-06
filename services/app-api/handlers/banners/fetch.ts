import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { Banner } from "../../types";
import { parseBannerParameters } from "../../utils/parseParameters";

export const fetchBanner = handler(async (event, _context) => {
  const bannerId = parseBannerParameters(event);
  if (!bannerId) {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: Errors.NO_KEY,
    };
  }
  const params: any = {
    TableName: process.env.BannersTable!,
    Key: {
      key: bannerId,
    },
  };
  const response = await dynamoDb.get<Banner>(params);

  const status = StatusCodes.SUCCESS;
  return { status: status, body: { Item: response } };
});
