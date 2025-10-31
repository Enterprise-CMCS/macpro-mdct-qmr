/*
 * Given an object with properties matching those of a table in Dynamo,
 * generate the UpdateCommandInput properties needed to update that table.
 * @example
 * const fieldsToModify = { state: "MO", year: 2021 };
 * const updateParams = createDynamoUpdateParams(fieldsToModify);
 * console.log(updateParams);
 * // {
 * //   UpdateExpression: "SET #state = :state, #year = :year",
 * //   ExpressionAttributeNames: { "#state": "state", "#year": "year" },
 * //   ExpressionAttributeValue: { ":state": "MO", ":year": 2021 },
 * // }
 */
export const createDynamoUpdateParams = (properties: Record<string, any>) => {
  const entries = Object.entries(properties);
  const ExpressionAttributeNames = Object.fromEntries(
    entries.map(([key, _value]) => [`#${key}`, key])
  );
  const ExpressionAttributeValues = Object.fromEntries(
    entries.map(([key, value]) => [`:${key}`, value])
  );
  const expressionParts = entries.map(([key, _value]) => `#${key} = :${key}`);

  return {
    UpdateExpression: "SET " + expressionParts.join(", "),
    ExpressionAttributeNames,
    ExpressionAttributeValues,
  };
};
