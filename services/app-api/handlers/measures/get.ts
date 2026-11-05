import handler from "../../libs/handler-lib";
import {
  getMeasureFromTable,
  getMeasuresFromTable,
} from "../../storage/measures";
import { measures } from "../dynamoUtils/measureList";
import {
  hasRolePermissions,
  hasStatePermissions,
} from "../../libs/authorization";
import { Measure, UserRoles } from "../../types";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import {
  parseCoreSetParameters,
  parseMeasureParameters,
} from "../../utils/parseParameters";

export const listMeasures = handler(async (event, _context) => {
  const { allParamsValid, state, year, coreSet } =
    parseCoreSetParameters(event);
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
  const queriedMeasures = await getMeasuresFromTable({ state, year, coreSet });
  for (let v of queriedMeasures) {
    const measure = measures[year as number]?.find(
      (m) => m.measure === (v as Measure)?.measure
    );

    v.autoCompleted = !!measure?.autocompleteOnCreation;
    v.measureType = measure?.measureType;
    v.typeTagForCoreSets = measure?.typeTagForCoreSets;
    v.stratificationRequired = measure?.stratificationRequired;
  }

  return {
    status: StatusCodes.SUCCESS,
    body: {
      Items: queriedMeasures,
    },
  };
});

export const getMeasure = handler(async (event, _context) => {
  const { allParamsValid, state, year, coreSet, measure } =
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

  const queryValue = await getMeasureFromTable({
    state,
    year,
    coreSet,
    measure,
  });

  // Add metadata from measureList
  if (queryValue) {
    const measureMetadata = measures[year as number]?.find(
      (m) => m.measure === queryValue.measure
    );

    if (measureMetadata) {
      queryValue.autoCompleted = !!measureMetadata.autocompleteOnCreation;
      queryValue.measureType = measureMetadata.measureType;
      queryValue.typeTagForCoreSets = measureMetadata.typeTagForCoreSets;
      queryValue.stratificationRequired =
        measureMetadata.stratificationRequired;
    }
  }

  return {
    status: StatusCodes.SUCCESS,
    body: {
      Item: queryValue,
    },
  };
});

export const getReportingYears = handler(async () => {
  const reportingYears = Object.keys(measures);
  return {
    status: StatusCodes.SUCCESS,
    body: reportingYears,
  };
});

export const getMeasureListInfo = handler(async () => {
  return {
    status: StatusCodes.SUCCESS,
    body: measures,
  };
});
