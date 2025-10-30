import { FormError } from "error";
import {
  OmsValidationCallback,
  FormRateField,
  UnifiedValFuncProps as UVFP,
} from "../../types/TypeValidations";
import {
  convertOmsDataToRateArray,
  getOtherPerformanceMeasureRateArray,
} from "../dataDrivenTools";
import { LabelData } from "utils";

export const validationRateNotZero = ({
  location,
  rateData,
  errorMessage,
}: UVFP) => {
  const errorArray: FormError[] = [];

  for (const ratefields of rateData) {
    for (const rate of ratefields) {
      if (rate && rate.denominator && rate.numerator && rate.rate) {
        if (
          parseFloat(rate.numerator) > 0 &&
          parseFloat(rate.denominator) > 0 &&
          parseFloat(rate.rate) === 0
        ) {
          errorArray.push({
            errorLocation: location,
            errorMessage:
              errorMessage ??
              "Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation.",
          });
        }
      }
    }
  }

  return errorArray;
};

export const validateRateNotZeroOMS =
  (errorMessage?: string): OmsValidationCallback =>
  ({ categories, qualifiers, rateData, label, locationDictionary }) => {
    return validationRateNotZero({
      categories,
      qualifiers,
      location: `Optional Measure Stratification: ${locationDictionary(label)}`,
      rateData: convertOmsDataToRateArray(categories, qualifiers, rateData),
      errorMessage,
    }).filter((v, i, a) => i === 0 || a[0].errorLocation !== v.errorLocation);
  };

/*
 * If a user manually over-rides a rate it must not violate two rules:
 * It must be zero if the numerator is zero
 */
export const validateRateNotZeroPM = (
  performanceMeasureArray: FormRateField[][],
  OPM: any,
  _qualifiers: LabelData[],
  errorMessage?: string
) => {
  const errorArray: FormError[] = [];
  const location = `Performance Measure/Other Performance Measure`;
  const rateDataOPM = getOtherPerformanceMeasureRateArray(OPM);

  const errors = [
    ...validationRateNotZero({
      location,
      rateData: performanceMeasureArray,
      errorMessage,
    }),
    ...validationRateNotZero({
      location,
      rateData: rateDataOPM,
      errorMessage,
    }),
  ];
  if (!!errors.length) errorArray.push(errors[0]);
  return errorArray;
};
