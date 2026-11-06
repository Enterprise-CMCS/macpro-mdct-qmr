import handler from "../../libs/handler-lib";
import {
  getCoreSetFromTable,
  updateCoreSetInTable,
} from "../../storage/coreSets";
import { updateMeasureInTable } from "../../storage/measures";
import {
  getUserNameFromJwt,
  hasStatePermissions,
} from "../../libs/authorization";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseMeasureParameters } from "../../utils/parseParameters";
import { calculateAndPutRate } from "../rate/rateCalculations";

export const editMeasure = handler(async (event, _context) => {
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

  const {
    data,
    status,
    reporting = null,
    description,
    detailedDescription,
  } = JSON.parse(event!.body!);

  const lastAltered = Date.now();
  const lastAlteredBy = getUserNameFromJwt(event);

  const descriptionParams =
    description && detailedDescription
      ? {
          description,
          detailedDescription,
        }
      : {};
  const params = await updateMeasureInTable(
    { state, year, coreSet, measure },
    {
      ...descriptionParams,
      status,
      reporting,
      lastAltered,
      lastAlteredBy,
      data,
    }
  );

  //in 2024 and onward, we added a new feature called combined rates which requires rate calculations to the rates table
  if (year >= 2024) {
    //after updating the database with the latest values for the measure, we run the combine rates calculations for said measure
    await calculateAndPutRate({
      state,
      year,
      coreSet,
      measure,
    });
  }

  // If the measure is incomplete, ensure its containing core set is incomplete.
  if (status === "incomplete") {
    const coreSetObject = await getCoreSetFromTable({ state, year, coreSet });

    if (!coreSetObject) {
      throw new Error(
        `Cannot check status of coreset ${state}${year}${coreSet}; it does not exist`
      );
    }

    if (coreSetObject.status !== "in progress") {
      await updateCoreSetInTable(
        { state, year, coreSet },
        {
          submitted: false,
          status: "in progress",
          lastAltered,
          lastAlteredBy,
        }
      );
    }
  }

  return { status: StatusCodes.SUCCESS, body: params };
});
