import handler from "../../libs/handler-lib";
import { getBannerFromTable } from "../../storage/table";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseBannerParameters } from "../../utils/parseParameters";

export const fetchBanner = handler(async (event, _context) => {
  const bannerId = parseBannerParameters(event);
  if (!bannerId) {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: Errors.NO_KEY,
    };
  }
  const response = await getBannerFromTable(bannerId);

  const status = StatusCodes.SUCCESS;
  return { status: status, body: { Item: response } };
});
