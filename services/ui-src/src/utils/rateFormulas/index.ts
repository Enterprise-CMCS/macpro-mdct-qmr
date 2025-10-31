import { RateFormula } from "utils/rateFormulas/rateFormulas";

const fixRounding = (value: number, numbersAfterDecimal: number) => {
  return (
    Math.round((value + Number.EPSILON) * Math.pow(10, numbersAfterDecimal)) /
    Math.pow(10, numbersAfterDecimal)
  );
};

export const defaultRateCalculation: RateFormula = (
  numerator,
  denominator,
  rateMultiplicationValue,
  numbersAfterDecimal
) => {
  const floatNumerator = parseFloat(numerator);
  const floatDenominator = parseFloat(denominator);

  //return 0 if the denominator is 0, provides a rate for when numerator = 0 & denominator = 0
  if (floatDenominator === 0) {
    return (0).toFixed(numbersAfterDecimal);
  }

  let floatRate = floatNumerator / floatDenominator;
  const roundedRate = fixRounding(
    floatRate * rateMultiplicationValue,
    numbersAfterDecimal
  );
  return roundedRate.toFixed(numbersAfterDecimal);
};

export const AABRateCalculation: RateFormula = (
  numerator,
  denominator,
  rateMultiplicationValue,
  numbersAfterDecimal
) => {
  const floatNumerator = parseFloat(numerator);
  const floatDenominator = parseFloat(denominator);
  let remainder = floatNumerator / floatDenominator;
  //zero dividing by zero becomes a NaN when dividing, converting it back to zero. only numbers are entered in so no issues otherwise
  remainder = isNaN(remainder) ? 0 : remainder;
  const floatRate = 1 - remainder;
  const roundedRate = fixRounding(
    floatRate * rateMultiplicationValue,
    numbersAfterDecimal
  );
  return roundedRate.toFixed(numbersAfterDecimal);
};
