import { RateFields } from "shared/types";
import { FormRateField } from "shared/types/TypeValidations";

export function validateNDRTotalsMatchSum(
  performanceMeasureArray: FormRateField[][]
) {
  const errorArray: FormError[] = [];

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
    const [categoryType] = rate.category.split(":");
    return `${categoryType} - ${rate.label}`;
  };

  const groups: Record<string, CompletedRate[]> = {};
  for (let rate of allRates) {
    if (!isCompleted(rate)) continue;
    const groupKey = groupKeyOf(rate);
    groups[groupKey] = (groups[groupKey] ?? []).concat([rate]);
  }

  for (let group of Object.values(groups)) {
    let totalRate = group.find((rate) => rate.isTotal);
    let otherRates = group.filter((rate) => !rate.isTotal);
    if (!totalRate) continue;

    const numeratorSum = otherRates
      .map((rate) => parseInt(rate.numerator))
      .reduce((sum, num) => sum + num, 0);
    if (parseInt(totalRate.numerator) !== numeratorSum) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage:
          "The numerators for each diagnosis cohort should sum to the total SUD numerator.",
      });
    }

    const denominatorSum = otherRates
      .map((rate) => parseInt(rate.denominator))
      .reduce((sum, num) => sum + num, 0);
    if (parseInt(totalRate.denominator) !== denominatorSum) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage:
          "The denominators for each diagnosis cohort should sum to the total SUD denominator.",
      });
    }
  }

  return errorArray;
}
