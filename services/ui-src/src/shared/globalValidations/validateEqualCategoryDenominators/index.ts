import * as Types from "shared/types";
import {
  OmsValidationCallback,
  UnifiedValidationFunction as UVF,
} from "shared/types/TypeValidations";
import {
  convertOmsDataToRateArray,
  getPerfMeasureRateArray,
} from "../dataDrivenTools";
import { SINGLE_CATEGORY } from "dataConstants";
import { LabelData } from "utils";

const _validation: UVF = ({
  rateData,
  qualifiers,
  categories,
  location,
  errorMessage,
}) => {
  const errorArray: FormError[] = [];
  const locationArray: string[] = [];
  const denominatorArray: string[] = [];

  const qualifierIds = qualifiers?.map((qual) => qual.id);

  for (const [i, rateSet] of rateData.entries()) {
    for (const [j, rate] of rateSet.entries()) {
      const rateQualId = rate.uid?.split(".")[1];
      if (rate && rate.denominator && qualifierIds?.includes(rateQualId!)) {
        denominatorArray.push(rate.denominator);
        locationArray.push(
          !!categories?.length &&
            categories[0].label !== SINGLE_CATEGORY &&
            categories.some((item) => item.label)
            ? categories![i].label
            : qualifiers![j].label
        );
      }
    }
  }

  if (!denominatorArray.every((v) => denominatorArray[0] === v)) {
    errorArray.push({
      errorLocation: location,
      errorMessage:
        errorMessage ??
        `The following categories must have the same denominator:`,
      errorList: locationArray.filter((v, i, a) => a.indexOf(v) === i),
    });
  }

  return errorArray;
};

/** Checks all rates have the same denominator for both categories and qualifiers. NOTE: only use qualifiers if category is empty */
export const validateEqualCategoryDenominatorsOMS =
  (errorMessage?: string): OmsValidationCallback =>
  ({ rateData, categories, qualifiers, label, locationDictionary, isOPM }) => {
    if (isOPM) return [];
    return _validation({
      categories,
      qualifiers,
      rateData: convertOmsDataToRateArray(categories, qualifiers, rateData),
      location: `Optional Measure Stratification: ${locationDictionary(label)}`,
      errorMessage,
    });
  };

/** Checks all rates have the same denominator for both categories and qualifiers. NOTE: only pass qualifiers if category is empty */
export const validateEqualCategoryDenominatorsPM = (
  data: Types.PerformanceMeasure,
  categories: LabelData[],
  qualifiers?: LabelData[],
  errorMessage?: string
) => {
  return _validation({
    categories,
    qualifiers,
    location: "Performance Measure",
    rateData: getPerfMeasureRateArray(data, { categories, qualifiers }),
    errorMessage,
  });
};
