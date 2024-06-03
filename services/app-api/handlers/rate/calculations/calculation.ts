import dynamoDb from "../../../libs/dynamodb-lib";
import { getUserNameFromJwt } from "../../../libs/authorization";
import { APIGatewayProxyEvent } from "../../../types";
import { StatusCodes } from "../../../utils/constants/constants";
import { convertToDynamoExpression } from "../../dynamoUtils/convertToDynamoExpressionVars";
import { createCompoundKey } from "../../dynamoUtils/createCompoundKey";

export const calculateRate = async (event: APIGatewayProxyEvent) => {
  const dynamoKey = createCompoundKey(event);
  const lastAlteredBy = getUserNameFromJwt(event);

  const data = {
    Item: [
      {
        coreSet: "ACSC",
        rate: { numberator: "2", denominator: "2", rate: "1.0" },
      },
      {
        coreSet: "ACSM",
        rate: { numberator: "2", denominator: "2", rate: "1.0" },
      },
      {
        coreSet: "Total",
        rate: { numberator: "4", denominator: "4", rate: "1.0" },
      },
    ],
  };

  const params = {
    TableName: process.env.rateTableName!,
    Key: {
      compoundKey: dynamoKey,
      measure: event!.pathParameters!.measure!,
    },
    ...convertToDynamoExpression(
      {
        lastAltered: Date.now(),
        lastAlteredBy,
        data,
        state: event!.pathParameters!.state!,
        year: event!.pathParameters!.year!,
      },
      "post"
    ),
  };

  await dynamoDb.update(params);
  return { status: StatusCodes.SUCCESS, body: params };
};
