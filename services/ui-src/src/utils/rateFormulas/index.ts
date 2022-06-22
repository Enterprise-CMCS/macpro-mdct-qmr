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
  const floatRate = floatNumerator / floatDenominator;
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
  const floatRate = 1 - floatNumerator / floatDenominator;
  const roundedRate = fixRounding(
    floatRate * rateMultiplicationValue,
    numbersAfterDecimal
  );
  return roundedRate.toFixed(numbersAfterDecimal);
};
