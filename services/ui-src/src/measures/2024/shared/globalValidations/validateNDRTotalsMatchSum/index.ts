import { RateFields } from "measures/2024/shared/CommonQuestions/types";
import { FormRateField } from "measures/2024/shared/globalValidations/types";

export function validateNDRTotalsMatchSum(
  performanceMeasureArray: FormRateField[][]
) {
  const allRates = Object.values(performanceMeasureArray)
    .filter((arr): arr is RateFields[] => arr !== undefined)
    .flat();

  const requiredFields = [
    "numerator",
    "denominator",
    "label",
    "category",
  ] as const;
  type CompletedRate = RateFields &
    Required<Pick<RateFields, typeof requiredFields[number]>>;
  const isCompleted = (rate: RateFields): rate is CompletedRate =>
    requiredFields.every((field) => rate[field]) &&
    rate.category!.includes(":");

  const groupKeyOf = (rate: CompletedRate) => {
    const [categoryType, _subCategory] = rate.category.split(":");
    return `${categoryType} - ${rate.label}`;
  };

  const groups: Record<string, CompletedRate[]> = {};
  for (let rate of allRates) {
    if (!isCompleted(rate)) continue;
    const groupKey = groupKeyOf(rate);
    groups[groupKey] = (groups[groupKey] ?? []).concat([rate]);
  }

  const errorArray: FormError[] = [];
  for (let group of Object.values(groups)) {
    let totalRate = group.find((rate) => rate.isTotal);
    let otherRates = group.filter((rate) => !rate.isTotal);
    if (!totalRate) continue;

    const numeratorSum = otherRates
      .map((rate) => parseFloat(rate.numerator))
      .reduce((sum, num) => sum + num, 0);
    if (parseFloat(totalRate.numerator) !== numeratorSum) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage: `Numerator sum error for "${groupKeyOf(
          totalRate
        )}" - expected ${numeratorSum}, got ${totalRate.numerator}`,
      });
    }

    const denominatorSum = otherRates
      .map((rate) => parseFloat(rate.denominator))
      .reduce((sum, num) => sum + num, 0);
    if (parseFloat(totalRate.denominator) !== denominatorSum) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage: `Denominator sum error for "${groupKeyOf(
          totalRate
        )}" - expected ${denominatorSum}, got ${totalRate.denominator}`,
      });
    }
  }

  return errorArray;
}
