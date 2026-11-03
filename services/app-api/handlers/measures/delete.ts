import handler from "../../libs/handler-lib";
import { deleteMeasureFromTable } from "../../storage/table";
import { hasStatePermissions } from "../../libs/authorization";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseMeasureParameters } from "../../utils/parseParameters";

export const deleteMeasure = handler(async (event, _context) => {
  const { allParamsValid, state, year, coreSet, measure } =
    parseMeasureParameters(event);
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

  const params = await deleteMeasureFromTable({
    state,
    year,
    coreSet,
    measure,
  });

  return { status: StatusCodes.SUCCESS, body: params };
});
