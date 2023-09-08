import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";
import { createCompoundKey } from "../dynamoUtils/createCompoundKey";
import { measures } from "../dynamoUtils/measureList";
import {
  hasRolePermissions,
  hasStatePermissions,
} from "../../libs/authorization";
import { Measure, UserRoles } from "../../types";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { Key } from "aws-sdk/clients/dynamodb";

export const listMeasures = handler(async (event, context) => {
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

  const state = event.pathParameters?.state;
  const year = event.pathParameters?.year as string;
  const coreSet = event.pathParameters?.coreSet;

  const params = {
    TableName: process.env.measureTableName!,
    ...convertToDynamoExpression(
      { state: state, year: parseInt(year), coreSet: coreSet },
      "list"
    ),
    ExclusiveStartKey: undefined as Key | undefined,
  };

  const scannedResults: any[] = [];
  let queryValue = await dynamoDb.scan(params);
  queryValue?.Items?.forEach((v) => {
    const measure = measures[parseInt(year)]?.filter(
      (m) => m.measure === (v as Measure)?.measure
    )[0];

    scannedResults.push({
      ...v,
      autoCompleted: !!measure?.autocompleteOnCreation,
    });
  });
  queryValue.Items = scannedResults;
  return queryValue;
});

export const getMeasure = handler(async (event, context) => {
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

  const dynamoKey = createCompoundKey(event);
  const params = {
    TableName: process.env.measureTableName!,
    Key: {
      compoundKey: dynamoKey,
      coreSet: event.pathParameters!.coreSet!,
    },
  };
  const queryValue = await dynamoDb.get(params);
  return queryValue;
});
