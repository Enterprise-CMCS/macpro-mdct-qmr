import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
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

export const listMeasures = handler(async (event, context) => {
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
  const params = {
    TableName: process.env.MeasuresTable!,
    KeyConditionExpression: "compoundKey = :compoundKey",
    ExpressionAttributeValues: {
      ":compoundKey": `${state}${year}${coreSet}`,
    },
  };

  const queriedMeasures = await dynamoDb.queryAll<Measure>(params);
  for (let v of queriedMeasures) {
    const measure = measures[year as number]?.filter(
      (m) => m.measure === (v as Measure)?.measure
    )[0];

    v.autoCompleted = !!measure?.autocompleteOnCreation;
    v.measureType = measure?.measureType;
    v.stratificationRequired = !!measure?.stratificationRequired;
  }

  return {
    status: StatusCodes.SUCCESS,
    body: {
      Items: queriedMeasures,
    },
  };
});

export const getMeasure = handler(async (event, context) => {
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

  const params = {
    TableName: process.env.MeasuresTable!,
    Key: {
      compoundKey: `${state}${year}${coreSet}`,
      measure: measure,
    },
  };
  const queryValue = await dynamoDb.get<Measure>(params);

  // Add metadata from measureList
  if (queryValue) {
    const measureMetadata = measures[year as number]?.filter(
      (m) => m.measure === queryValue.measure
    )[0];

    if (measureMetadata) {
      queryValue.autoCompleted = !!measureMetadata.autocompleteOnCreation;
      queryValue.measureType = measureMetadata.measureType;
      queryValue.stratificationRequired =
        !!measureMetadata.stratificationRequired;
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
