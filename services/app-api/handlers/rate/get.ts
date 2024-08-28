import {
  hasRolePermissions,
  hasStatePermissions,
} from "../../libs/authorization";
import handler from "../../libs/handler-lib";
import { getCombinedRatesFromTable } from "../../storage/table";
import { MeasureParameters, UserRoles } from "../../types";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseMeasureParameters } from "../../utils/parseParameters";

export const getRate = handler(async (event, context) => {
  const { allParamsValid, year, state, coreSet, measure } =
    parseMeasureParameters(event);
  if (!allParamsValid) {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: Errors.NO_KEY,
    };
  }
  // action limited to any admin type user and state users from corresponding state
  const isStateUser = hasRolePermissions(event, [UserRoles.STATE_USER]);
  if (isStateUser) {
    const isFromCorrespondingState = hasStatePermissions(event);
    if (!isFromCorrespondingState) {
      return {
        status: StatusCodes.UNAUTHORIZED,
        body: Errors.UNAUTHORIZED,
      };
    }
  } // if not state user, can safely assume admin type user due to baseline handler protections

  const rates = await getCombinedRatesFromTable({
    year,
    state,
    coreSet,
    measure,
  });

  return {
    status: StatusCodes.SUCCESS,
    body: rates,
  };
});
