import handler from "../../libs/handler-lib";
import { putBannerToTable } from "../../storage/banners";
import { hasRolePermissions } from "../../libs/authorization";
import { UserRoles } from "../../types";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseBannerParameters } from "../../utils/parseParameters";
import { sanitizeObject } from "../../utils/sanitize/sanitize";

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

  const payload: Record<string, unknown> | undefined = sanitizeObject(
    JSON.parse(event!.body!)
  );
  const { title, description, startDate, endDate } = payload ?? {};
  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof startDate !== "number" ||
    typeof endDate !== "number" ||
    !(title && description && startDate && endDate)
  ) {
    throw new Error(Errors.INVALID_DATA);
  }

  await putBannerToTable(bannerId, {
    createdAt: Date.now(),
    lastAltered: Date.now(),
    lastAlteredBy: event?.headers["cognito-identity-id"],
    ...payload,
    title,
    description,
    startDate,
    endDate,
  });
  return { status: StatusCodes.CREATED };
});
