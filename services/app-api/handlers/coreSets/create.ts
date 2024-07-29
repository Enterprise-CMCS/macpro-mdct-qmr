import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { MeasureMetaData, measures } from "../dynamoUtils/measureList";
import {
  hasRolePermissions,
  hasStatePermissions,
} from "../../libs/authorization";
import * as Types from "../../types";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { postCoreSet } from "../../storage/table";

export const createCoreSet = handler(async (event, context) => {
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

  // The State Year and ID are all part of the path
  const state = event!.pathParameters!.state!;
  const year = event!.pathParameters!.year!;
  const coreSet = event!.pathParameters!.coreSet! as Types.CoreSetAbbr;

  const results = await postCoreSet({
    state,
    year,
    coreSet,
    lastAlteredBy: event.headers["cognito-identity-id"],
  });

  return { status: StatusCodes.SUCCESS, body: results };
});

export const createDependentMeasures = async (
  state: string,
  year: number,
  coreSet: Types.CoreSetAbbr,
  type: string
) => {
  const filteredMeasures = measures[year].filter(
    (measure: MeasureMetaData) => measure.type === type
  );

  let dependentMeasures = [];

  for await (const measure of filteredMeasures) {
    // The State Year and ID are all part of the path
    const measureId = measure["measure"];
    // Dynamo only accepts one row as a key, so we are using a combination for the dynamoKey
    const dynamoKey = `${state}${year}${coreSet}${measureId}`;
    const params = {
      TableName: process.env.measureTableName!,
      Item: {
        compoundKey: dynamoKey,
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
