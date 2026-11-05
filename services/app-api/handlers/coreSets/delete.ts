import handler from "../../libs/handler-lib";
import { deleteCoreSetFromTable } from "../../storage/coreSets";
import {
  deleteMeasureFromTable,
  getMeasuresFromTable,
} from "../../storage/measures";
import { hasStatePermissions } from "../../libs/authorization";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseCoreSetParameters } from "../../utils/parseParameters";

export const deleteCoreSet = handler(async (event, _context) => {
  const { allParamsValid, state, year, coreSet } =
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

  const params = await deleteCoreSetFromTable({ state, year, coreSet });
  await deleteDependentMeasures(state, year, coreSet);

  return {
    status: StatusCodes.SUCCESS,
    body: params,
  };
});

const deleteDependentMeasures = async (
  state: string,
  year: number,
  coreSet: string
) => {
  const measures = await getMeasuresFromTable({ state, year, coreSet });
  const Items = measures;

  for await (const { measure } of Items) {
    await deleteMeasureFromTable({ state, year, coreSet, measure });
  }
};
