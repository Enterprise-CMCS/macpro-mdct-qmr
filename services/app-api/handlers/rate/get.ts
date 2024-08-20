import { hasRolePermissions, hasStatePermissions } from "../../libs/authorization";
import handler from "../../libs/handler-lib";
import { getCombinedRatesFromTable } from "../../storage/table";
import { MeasureParameters, UserRoles } from "../../types";
import { Errors, StatusCodes } from "../../utils/constants/constants";

export const getRate = handler(async (event, context) => {
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

  const rates = await getCombinedRatesFromTable(
    event.pathParameters as unknown as MeasureParameters
  );

  return {
    status: StatusCodes.SUCCESS,
    body: rates,
  };
});
