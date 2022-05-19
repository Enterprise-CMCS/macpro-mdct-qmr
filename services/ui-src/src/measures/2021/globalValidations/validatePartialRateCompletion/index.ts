import { SINGLE_CATEGORY } from "dataConstants";
import {
  convertOmsDataToRateArray,
  getOtherPerformanceMeasureRateArray,
} from "../dataDrivenTools";
import {
  UnifiedValidationFunction as UVF,
  FormRateField,
  OmsValidationCallback,
} from "../types";

const _validation: UVF = ({ location, rateData, categories, qualifiers }) => {
  const errors: FormError[] = [];

  for (const [i, rateSet] of rateData.entries()) {
    for (const [j, rate] of rateSet.entries()) {
      if (
        rate &&
        ((rate.numerator && !rate.denominator) ||
          (rate.denominator && !rate.numerator))
      ) {
        errors.push({
          errorLocation: location,
          errorMessage: `Should not have partially filled NDR sets${
            !!qualifiers?.length ? ` at ${qualifiers[j]}` : ""
          }${!!categories?.length ? `, ${categories[i]}` : ""}.`,
        });
      }
    }
  }

  return errors;
};

export const validatePartialRateCompletionOMS: OmsValidationCallback = ({
  categories,
  isOPM,
  label,
  locationDictionary,
  qualifiers,
  rateData,
}) => {
  return [
    ..._validation({
      location: `Optional Measure Stratification: ${locationDictionary([
        ...label,
      ])}`,
      rateData: convertOmsDataToRateArray(categories, qualifiers, rateData),
      categories: !!(isOPM || categories[0] === SINGLE_CATEGORY)
        ? undefined
        : categories,
      qualifiers: !!isOPM ? undefined : qualifiers,
    }),
  ];
};

/**
 * Checks for fields that have been partially filled out and reports them.
 *
 * @param performanceMeasureArray pm data
 * @param OPM opm data
 * @param qualifiers required field for parsing PM data
 * @param categories optional for further locating an error
 */
export const validatePartialRateCompletionPM = (
  performanceMeasureArray: FormRateField[][],
  OPM: any,
  qualifiers: string[],
  categories?: string[]
) => {
  return [
    ..._validation({
      location: "Performance Measure",
      rateData: performanceMeasureArray,
      categories,
      qualifiers,
    }),
    ..._validation({
      location: "Other Performance Measure",
      rateData: getOtherPerformanceMeasureRateArray(OPM),
    }),
  ];
};
