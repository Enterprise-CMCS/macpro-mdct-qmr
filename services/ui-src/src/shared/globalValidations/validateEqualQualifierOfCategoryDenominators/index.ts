import * as Types from "shared/types";
import {
  OmsValidationCallback,
  UnifiedValidationFunction as UVF,
} from "shared/types/TypeValidations";
import {
  convertOmsDataToRateArray,
  getPerfMeasureRateArray,
} from "../dataDrivenTools";
import { LabelData } from "utils";
import { FormError } from "error";

const _validation: UVF = ({
  rateData,
  qualifiers,
  categories,
  location,
  errorMessage,
}) => {
  const errorArray: FormError[] = [];
  const flatRate = rateData.flat();

  //check that the qualifiers in each category has the same denominator
  for (const qual of qualifiers!) {
    const qualRates = flatRate.filter((rate) =>
      rate.label?.includes(qual.label)
    );

    //check if the denoms in the qual rates are the same
    const qualDenoms = qualRates.map((qual) => qual.denominator);
    if (!qualDenoms.every((denom) => denom === qualDenoms[0])) {
      errorArray.push({
        errorLocation: location,
        errorMessage:
          errorMessage ?? `The following must have the same denominator:`,
        errorList: categories?.map((cat) => `${cat.label}: ${qual.label}`),
      });
    }
  }

  return errorArray;
};

export const validateEqualQualifierOfCategoryDenominatorsOMS =
  (
    categories: LabelData[],
    qualifiers: LabelData[],
    errorMessage?: string
  ): OmsValidationCallback =>
  ({ rateData, label, locationDictionary, isOPM }) => {
    if (isOPM) return [];

    return _validation({
      categories,
      qualifiers,
      rateData: convertOmsDataToRateArray(categories, qualifiers, rateData),
      location: `Optional Measure Stratification: ${locationDictionary(label)}`,
      errorMessage,
    });
  };

/** Checks that qualifiers of type in a category has the same denominator. NOTE: This validation was added in 2025 so it doesn't handle legacy rates  */
export const validateEqualQualifierOfCategoryDenominatorsPM = (
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
