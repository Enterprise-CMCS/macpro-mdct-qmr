export const createCompoundKey = (event) => {
  const state = event.pathParameters.state;
  const year = event.pathParameters.year;
  const coreSet = event.pathParameters.coreSet;
  const measure = event.pathParameters.measure ?? "";

  return `${state}${year}${coreSet}${measure}`;
};
