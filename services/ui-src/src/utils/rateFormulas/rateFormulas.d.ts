export type RateFormula = (
  numerator: string,
  denominator: string,
  rateMultiplicationValue: number,
  numbersAfterDecimal: number
) => string;
