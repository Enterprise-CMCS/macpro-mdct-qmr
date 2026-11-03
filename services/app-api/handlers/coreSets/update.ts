import handler from "../../libs/handler-lib";
import { updateCoreSetInTable } from "../../storage/table";
import {
  getUserNameFromJwt,
  hasStatePermissions,
} from "../../libs/authorization";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseCoreSetParameters } from "../../utils/parseParameters";

export const editCoreSet = handler(async (event, _context) => {
  const { allParamsValid, year, state, coreSet } =
    parseCoreSetParameters(event);
  if (!allParamsValid) {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: Errors.NO_KEY,
    };
  }
  // action limited to state users from corresponding state
  if (!hasStatePermissions(event)) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      body: Errors.UNAUTHORIZED,
    };
  }

  const { submitted, status } = JSON.parse(event!.body!);
  const lastAlteredBy = getUserNameFromJwt(event);
  const params = await updateCoreSetInTable(
    { state, year, coreSet },
    {
      submitted,
      status,
      lastAltered: Date.now(),
      lastAlteredBy,
    }
  );
  return { status: StatusCodes.SUCCESS, body: params };
});
