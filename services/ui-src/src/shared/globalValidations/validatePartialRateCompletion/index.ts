import { SINGLE_CATEGORY } from "dataConstants";
import {
  convertOmsDataToRateArray,
  getOtherPerformanceMeasureRateArray,
} from "../dataDrivenTools";
import {
  UnifiedValFuncProps as UVFP,
  FormRateField,
  OmsValidationCallback,
} from "../../types/TypeValidations";
import { LabelData } from "utils";
import { OmsNodes as OMS } from "shared/types";

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
    multipleQuals ? ` for ${qualifier}` : ""
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
        const multipleCats: boolean = !!categories?.some((item) => item.label);
        errors.push({
          errorLocation: location,
          errorMessage: errorMessageFunc(
            multipleQuals,
            qualifiers?.[j].label!,
            multipleCats,
            categories?.[i].label!
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
  categories?: LabelData[];
  qualifiers?: LabelData[];
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
        // check some fields are empty
        rateData.rates[qualKey][catKey][0].fields.some(
          (field: any) => !field.value
        ) &&
        // check not all fields are empty
        !rateData.rates[qualKey][catKey][0].fields.every(
          (field: any) => !field.value
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
    singleValueFieldFlag?: OMS.CustomKeys.Aifhh | OMS.CustomKeys.Iuhh,
    errorMessageFunc?: ErrorMessageFunc
  ): OmsValidationCallback =>
  ({ categories, isOPM, label, locationDictionary, qualifiers, rateData }) => {
    return [
      ...(!!singleValueFieldFlag
        ? _singleValueValidation({
            location: `Optional Measure Stratification: ${locationDictionary([
              ...label,
            ])}`,
            rateData: rateData?.[singleValueFieldFlag],
            categories: !!(
              isOPM ||
              categories[0]?.label === SINGLE_CATEGORY ||
              !categories[0]?.label
            )
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
            categories: !!(
              isOPM ||
              categories[0]?.label === SINGLE_CATEGORY ||
              !categories[0]?.label
            )
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
  qualifiers: LabelData[],
  categories?: LabelData[],
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
