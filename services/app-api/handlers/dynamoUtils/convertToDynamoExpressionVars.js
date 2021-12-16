// const listOfVars = {
//   state: "state",
//   year: "year",
// };

export const convertToDynamoExpressionVars = (listOfVars) => {
  let expressionAttributeNames = {};
  let expressionAttributeValues = {};
  let filterExpression = "";
  Object.keys(listOfVars).each((key, index) => {
    expressionAttributeNames[`:${key}`] = key;
    expressionAttributeValues[`#${key}`] = listOfVars[key];
    filterExpression =
      index === 0
        ? `:${key} = #${key} `
        : `${filterExpression} AND :${key} = #${key}`;
  });
  return {
    expressionAttributeNames,
    expressionAttributeValues,
    filterExpression,
  };
};
