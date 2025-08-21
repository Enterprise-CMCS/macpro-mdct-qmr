import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { convertToDynamoExpression } from "../dynamoUtils/convertToDynamoExpressionVars";
import {
  getUserNameFromJwt,
  hasStatePermissions,
} from "../../libs/authorization";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseMeasureParameters } from "../../utils/parseParameters";
import { calculateAndPutRate } from "../rate/rateCalculations";
import { CoreSet } from "../../types";

export const editMeasure = handler(async (event, context) => {
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
  const params = {
    TableName: process.env.MeasuresTable!,
    Key: {
      compoundKey: `${state}${year}${coreSet}`,
      measure: measure,
    },
    ...convertToDynamoExpression(
      {
        ...descriptionParams,
        status,
        reporting,
        lastAltered,
        lastAlteredBy,
        data,
      },
      "post"
    ),
  };
  await dynamoDb.update(params);

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
    const TableName = process.env.QualityCoreSetsTable!;
    const Key = { coreSet, compoundKey: `${state}${year}` };

    const coreSetObject = await dynamoDb.get<CoreSet>({ TableName, Key });

    if (!coreSetObject) {
      throw new Error(
        `Cannot check status of coreset ${state}${year}${coreSet}; it does not exist`
      );
    }

    if (coreSetObject.status !== "in progress") {
      const updateCoreSetParams = {
        TableName,
        Key,
        ...convertToDynamoExpression(
          {
            submitted: false,
            status,
            lastAltered,
            lastAlteredBy,
          },
          "post"
        ),
      };
      await dynamoDb.update(updateCoreSetParams);
    }
  }

  return { status: StatusCodes.SUCCESS, body: params };
});
