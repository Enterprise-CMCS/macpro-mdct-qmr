// const listOfVars = {
//   state: "MO",
//   year: "2021",
// };

export const convertToDynamoExpressionVars = (listOfVars, expressionType) => {
  let expressionAttributeNames = {};
  let expressionAttributeValues = {};
  let expression = "";
  Object.keys(listOfVars).each((key, index) => {
    expressionAttributeNames[`:${key}`] = key;
    expressionAttributeValues[`#${key}`] = listOfVars[key];

    if (expressionType === "list") {
      expression =
        index === 0
          ? `:${key} = #${key} `
          : `${filterExpression} AND :${key} = #${key}`;
    }
    if (expressionType === "post") {
      expression =
        index === 0
          ? `set :${key} = #${key} `
          : `${filterExpression}, :${key} = #${key}`;
    }
  });
  return {
    expressionAttributeNames,
    expressionAttributeValues,
    expression,
  };
};
