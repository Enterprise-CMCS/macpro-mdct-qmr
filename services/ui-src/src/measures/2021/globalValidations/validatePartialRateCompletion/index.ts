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
        (rate.numerator || rate.denominator || rate.rate) &&
        (!rate.denominator || !rate.numerator || !rate.rate)
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

interface SVVProps {
  location: string;
  rateData: any;
  categories?: string[];
  qualifiers?: string[];
  locationDictionary: (s: string[]) => string;
}

const _singleValueValidation = ({
  location,
  rateData,
  categories,
  qualifiers,
  locationDictionary,
}: SVVProps): FormError[] => {
  const errors: FormError[] = [];

  for (const qualKey of Object.keys(rateData?.rates ?? {})) {
    for (const catKey of Object.keys(rateData?.rates?.[qualKey] ?? {})) {
      if (
        !!rateData?.rates?.[qualKey]?.[catKey]?.[0]?.fields &&
        // check some fields are empty
        rateData.rates[qualKey][catKey][0].fields.some(
          (field: any) => !field.value
        ) &&
        // check not all fields are empty
        !rateData.rates[qualKey][catKey][0].fields.every(
          (field: any) => !field.value
        )
      ) {
        errors.push({
          errorLocation: location,
          errorMessage: `Should not have partially filled NDR sets${
            !!qualifiers?.length ? ` at ${locationDictionary([qualKey])}` : ""
          }${!!categories?.length ? `, ${locationDictionary([catKey])}` : ""}.`,
        });
      }
    }
  }

  return errors;
};

export const validatePartialRateCompletionOMS =
  (singleValueFieldFlag?: "iuhh-rate" | "aifhh-rate"): OmsValidationCallback =>
  ({ categories, isOPM, label, locationDictionary, qualifiers, rateData }) => {
    return [
      ...(!!singleValueFieldFlag
        ? _singleValueValidation({
            location: `Optional Measure Stratification: ${locationDictionary([
              ...label,
            ])}`,
            rateData: rateData?.[singleValueFieldFlag],
            categories: !!(isOPM || categories[0] === SINGLE_CATEGORY)
              ? undefined
              : categories,
            qualifiers: !!isOPM ? undefined : qualifiers,
            locationDictionary,
          })
        : _validation({
            location: `Optional Measure Stratification: ${locationDictionary([
              ...label,
            ])}`,
            rateData: convertOmsDataToRateArray(
              categories,
              qualifiers,
              rateData
            ),
            categories: !!(isOPM || categories[0] === SINGLE_CATEGORY)
              ? undefined
              : categories,
            qualifiers: !!isOPM ? undefined : qualifiers,
          })),
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
