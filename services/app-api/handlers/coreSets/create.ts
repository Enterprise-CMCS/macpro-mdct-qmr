import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { getCoreSet } from "./get";
import { MeasureMetaData, measures } from "../dynamoUtils/measureList";
import {
  hasRolePermissions,
  hasStatePermissions,
} from "../../libs/authorization";
import * as Types from "../../types";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseCoreSetParameters } from "../../utils/parseParameters";

export const createCoreSet = handler(async (event, context) => {
  const { allParamsValid, state, year, coreSet } =
    parseCoreSetParameters(event);
  if (!allParamsValid) {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: Errors.NO_KEY,
    };
  }
  // action limited to any admin type user and state users from corresponding state
  const isStateUser = hasRolePermissions(event, [Types.UserRoles.STATE_USER]);
  if (isStateUser) {
    const isFromCorrespondingState = hasStatePermissions(event);
    if (!isFromCorrespondingState) {
      return {
        status: StatusCodes.UNAUTHORIZED,
        body: Errors.UNAUTHORIZED,
      };
    }
  } // if not state user, can safely assume admin type user due to baseline handler protections
  const coreType = coreSet!.substring(0, 1);

  const coreSetQuery = await getCoreSet(event, context);
  const coreSetExists = !!Object.keys(JSON.parse(coreSetQuery.body)).length;

  if (coreSetExists) {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: Errors.CORESET_ALREADY_EXISTS,
    };
  }

  await createDependentMeasures(
    state,
    year,
    coreSet as Types.CoreSetAbbr,
    coreType
  );

  // filter out qualifier and account for autocomplete measures on creation
  let autoCompletedMeasures = 0;
  const measuresLengthWithoutQualifiers = measures[year].filter(
    (measure: MeasureMetaData) => {
      if (measure.autocompleteOnCreation && measure.coreType === coreType) {
        autoCompletedMeasures++;
      }
      return (
        measure.coreType === coreType &&
        measure.measure !== "CSQ" &&
        // Filter out placeholder state specific measures
        !measure.placeholder
      );
    }
  ).length;

  const params = {
    TableName: process.env.QualityCoreSetsTable!,
    Item: {
      compoundKey: `${state}${year}`,
      state: state,
      year: year,
      coreSet: coreSet,
      createdAt: Date.now(),
      lastAltered: Date.now(),
      lastAlteredBy: event.headers["cognito-identity-id"],
      progress: {
        numAvailable: measuresLengthWithoutQualifiers,
        numComplete: autoCompletedMeasures,
      },
      submitted: false,
    },
  };

  await dynamoDb.put(params);
  return { status: StatusCodes.SUCCESS, body: params };
});

const createDependentMeasures = async (
  state: string,
  year: number,
  coreSet: Types.CoreSetAbbr,
  coreType: string
) => {
  const filteredMeasures = measures[year].filter(
    (measure: MeasureMetaData) => measure.coreType === coreType
  );

  let dependentMeasures = [];

  for await (const measure of filteredMeasures) {
    // The State Year and ID are all part of the path
    const measureId = measure["measure"];
    const params = {
      TableName: process.env.MeasuresTable!,
      Item: {
        compoundKey: `${state}${year}${coreSet}`,
        state: state,
        year: year,
        coreSet: coreSet,
        measure: measureId,
        createdAt: Date.now(),
        lastAltered: Date.now(),
        status: measure.autocompleteOnCreation
          ? Types.MeasureStatus.COMPLETE
          : Types.MeasureStatus.INCOMPLETE,
        placeholder: measure.placeholder,
      },
    };

    const result = await dynamoDb.put(params);
    dependentMeasures.push(result);
  }
};
