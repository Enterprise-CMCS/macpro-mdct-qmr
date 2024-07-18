//this function is copied from in ui-src/utils/rateFormulas/index.ts, we should merge this into a shared file if we ever figure it out
export const fixRounding = (value: number, numbersAfterDecimal: number) => {
  return (
    Math.round((value + Number.EPSILON) * Math.pow(10, numbersAfterDecimal)) /
    Math.pow(10, numbersAfterDecimal)
  );
};
