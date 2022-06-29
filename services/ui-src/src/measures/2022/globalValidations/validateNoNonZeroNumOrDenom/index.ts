import * as DC from "dataConstants";
import * as Types from "measures/2022/CommonQuestions/types";
import {
  OmsValidationCallback,
  FormRateField,
  UnifiedValFuncProps as UVFP,
} from "../types";
import {
  convertOmsDataToRateArray,
  getOtherPerformanceMeasureRateArray,
} from "../dataDrivenTools";

interface ValProps extends UVFP {
  hybridData?: boolean;
}

const _validationRateNotZero = ({ location, rateData, errorMessage }: UVFP) => {
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

const _validationRateZero = ({
  location,
  rateData,
  hybridData,
  errorMessage,
}: ValProps) => {
  const errorArray: FormError[] = [];

  for (const ratefields of rateData) {
    for (const rate of ratefields) {
      if (rate && rate.denominator && rate.numerator && rate.rate) {
        if (
          parseFloat(rate.numerator) === 0 &&
          parseFloat(rate.denominator) > 0 &&
          parseFloat(rate.rate) !== 0 &&
          !hybridData
        ) {
          errorArray.push({
            errorLocation: location,
            errorMessage:
              errorMessage ??
              "Manually entered rate should be 0 if numerator is 0",
          });
        }
      }
    }
  }

  return errorArray;
};

export const validateRateZeroOMS: OmsValidationCallback = ({
  categories,
  qualifiers,
  rateData,
  label,
  locationDictionary,
  dataSource,
}) => {
  const hybridData = dataSource?.includes(
    DC.HYBRID_ADMINSTRATIVE_AND_MEDICAL_RECORDS_DATA
  );
  return _validationRateZero({
    categories,
    qualifiers,
    hybridData,
    location: `Optional Measure Stratification: ${locationDictionary(label)}`,
    rateData: convertOmsDataToRateArray(categories, qualifiers, rateData),
  }).filter((v, i, a) => i === 0 || a[0].errorLocation !== v.errorLocation);
};

export const validateRateNotZeroOMS =
  (errorMessage?: string): OmsValidationCallback =>
  ({ categories, qualifiers, rateData, label, locationDictionary }) => {
    return _validationRateNotZero({
      categories,
      qualifiers,
      location: `Optional Measure Stratification: ${locationDictionary(label)}`,
      rateData: convertOmsDataToRateArray(categories, qualifiers, rateData),
      errorMessage,
    }).filter((v, i, a) => i === 0 || a[0].errorLocation !== v.errorLocation);
  };

// If a user manually over-rides a rate it must not violate two rules:
// It must be zero if the numerator is zero or
// It Must be greater than zero if the Num and Denom are greater than zero
export const validateNoNonZeroNumOrDenomPM = (
  performanceMeasureArray: FormRateField[][],
  OPM: any,
  _qualifiers: string[],
  data: Types.DefaultFormData,

  // TODO: If this were 2 seperate function calls we could have 1 errorMessage
  errorMessageRateNotZero?: string,
  errorMessageRateZero?: string
) => {
  const errorArray: FormError[] = [];
  const hybridData = data?.[DC.DATA_SOURCE]?.includes(
    DC.HYBRID_ADMINSTRATIVE_AND_MEDICAL_RECORDS_DATA
  );
  const location = `Performance Measure/Other Performance Measure`;
  const rateDataOPM = getOtherPerformanceMeasureRateArray(OPM);

  const nonZeroErrors = [
    ..._validationRateNotZero({
      location,
      rateData: performanceMeasureArray,
      errorMessage: errorMessageRateNotZero,
    }),
    ..._validationRateNotZero({
      location,
      rateData: rateDataOPM,
      errorMessage: errorMessageRateNotZero,
    }),
  ];
  const zeroErrors = [
    ..._validationRateZero({
      location,
      rateData: performanceMeasureArray,
      hybridData,
      errorMessage: errorMessageRateZero,
    }),
    ..._validationRateZero({
      location,
      rateData: rateDataOPM,
      hybridData,
      errorMessage: errorMessageRateZero,
    }),
  ];

  if (!!nonZeroErrors.length) errorArray.push(nonZeroErrors[0]);
  if (!!zeroErrors.length) errorArray.push(zeroErrors[0]);
  return errorArray;
};
