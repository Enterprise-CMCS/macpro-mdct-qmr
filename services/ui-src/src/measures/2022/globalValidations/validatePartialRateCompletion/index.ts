import { SINGLE_CATEGORY } from "dataConstants";
import {
  convertOmsDataToRateArray,
  getOtherPerformanceMeasureRateArray,
} from "../dataDrivenTools";
import {
  UnifiedValFuncProps as UVFP,
  FormRateField,
  OmsValidationCallback,
} from "../types";

type ErrorMessageFunc = (
  multipleQuals: boolean,
  qualifier: string,
  multipleCats: boolean,
  category: string
) => string;

interface ValProps extends UVFP {
  errorMessageFunc?: ErrorMessageFunc;
}

const validatePartialRateCompletionErrorMessage: ErrorMessageFunc = (
  multipleQuals,
  qualifier,
  multipleCats,
  category
) => {
  return `Should not have partially filled NDR sets${
    multipleQuals ? ` at ${qualifier}` : ""
  }${multipleCats ? `, ${category}` : ""}.`;
};

const _validation = ({
  location,
  rateData,
  categories,
  qualifiers,
  errorMessageFunc = validatePartialRateCompletionErrorMessage,
}: ValProps) => {
  const errors: FormError[] = [];

  for (const [i, rateSet] of rateData.entries()) {
    for (const [j, rate] of rateSet.entries()) {
      if (
        rate &&
        (rate.numerator || rate.denominator || rate.rate) &&
        (!rate.denominator || !rate.numerator || !rate.rate)
      ) {
        const multipleQuals: boolean = !!qualifiers?.length;
        const multipleCats: boolean = !!categories?.length;
        errors.push({
          errorLocation: location,
          errorMessage: errorMessageFunc(
            multipleQuals,
            qualifiers?.[j]!,
            multipleCats,
            categories?.[i]!
          ),
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
  errorMessageFunc?: ErrorMessageFunc;
}

const _singleValueValidation = ({
  location,
  rateData,
  categories,
  qualifiers,
  locationDictionary,
  errorMessageFunc = validatePartialRateCompletionErrorMessage,
}: SVVProps): FormError[] => {
  const errors: FormError[] = [];

  for (const qualKey of Object.keys(rateData?.rates ?? {})) {
    for (const catKey of Object.keys(rateData?.rates?.[qualKey] ?? {})) {
      if (
        !!rateData?.rates?.[qualKey]?.[catKey]?.[0]?.fields &&
        rateData.rates[qualKey][catKey][0].fields.every(
          (field: any) => !!field.value
        )
      ) {
        const multipleQuals: boolean = !!qualifiers?.length;
        const multipleCats: boolean = !!categories?.length;
        errors.push({
          errorLocation: location,
          errorMessage: errorMessageFunc(
            multipleQuals,
            locationDictionary([qualKey]),
            multipleCats,
            locationDictionary([catKey])
          ),
        });
      }
    }
  }

  return errors;
};

export const validatePartialRateCompletionOMS =
  (
    singleValueFieldFlag = false,
    errorMessageFunc?: ErrorMessageFunc
  ): OmsValidationCallback =>
  ({ categories, isOPM, label, locationDictionary, qualifiers, rateData }) => {
    return [
      ...(singleValueFieldFlag
        ? _singleValueValidation({
            location: `Optional Measure Stratification: ${locationDictionary([
              ...label,
            ])}`,
            rateData: rateData["iuhh-rate"],
            categories: !!(isOPM || categories[0] === SINGLE_CATEGORY)
              ? undefined
              : categories,
            qualifiers: !!isOPM ? undefined : qualifiers,
            locationDictionary,
            errorMessageFunc,
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
            errorMessageFunc,
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
  categories?: string[],
  errorMessageFunc?: ErrorMessageFunc
) => {
  return [
    ..._validation({
      location: "Performance Measure",
      rateData: performanceMeasureArray,
      categories,
      qualifiers,
      errorMessageFunc,
    }),
    ..._validation({
      location: "Other Performance Measure",
      rateData: getOtherPerformanceMeasureRateArray(OPM),
      errorMessageFunc,
    }),
  ];
};
