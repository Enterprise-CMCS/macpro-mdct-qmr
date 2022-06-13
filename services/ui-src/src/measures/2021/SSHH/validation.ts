import * as DC from "dataConstants";
import * as GV from "measures/2021/globalValidations";
import {
  getOtherPerformanceMeasureRateArray,
  _validationRateNotZero,
  _validationRateZero,
} from "measures/2021/globalValidations";

import { FormData } from "./types";

export interface FormRateField {
  denominator?: string;
  numerator?: string;
  label?: string;
  rate?: string;
}

export const validateAtLeastOneRateComplete = (data: any) => {
  const errorArray: FormError[] = [];
  const PMData = data[DC.OPM_RATES];

  let rateCompletionError = true;

  PMData &&
    PMData.forEach((measure: any) => {
      if (measure.rate && measure.rate[0] && measure.rate[0].rate) {
        rateCompletionError = false;
      }
    });

  if (rateCompletionError) {
    errorArray.push({
      errorLocation: `Performance Measure`,
      errorMessage: `At least one Performance Measure Numerator, Denominator, and Rate must be completed`,
    });
  }
  return errorArray;
};

// If a user manually over-rides a rate it must not violate two rules:
// It must be zero if the numerator is zero or
// It Must be greater than zero if the Num and Denom are greater than zero
export const validateNoNonZeroNumOrDenomPM = (OPM: any, data: any) => {
  const errorArray: FormError[] = [];
  const hybridData = data?.[DC.DATA_SOURCE]?.includes(
    DC.HYBRID_ADMINSTRATIVE_AND_MEDICAL_RECORDS_DATA
  );
  const location = `Performance Measure`;
  const rateDataOPM = getOtherPerformanceMeasureRateArray(OPM);

  const nonZeroErrors = [
    ..._validationRateNotZero({ location, rateData: rateDataOPM }),
  ];
  const zeroErrors = [
    ..._validationRateZero({ location, rateData: rateDataOPM, hybridData }),
  ];

  if (!!nonZeroErrors.length) errorArray.push(nonZeroErrors[0]);
  if (!!zeroErrors.length) errorArray.push(zeroErrors[0]);
  return errorArray;
};

/**
 * Checks both performance measure and other performance measure for numerator greater than denominator errors
 */
export const validateNumeratorsLessThanDenominatorsPM = (
  performanceMeasureArray: FormRateField[][],
  OPM: any,
  qualifiers: string[]
) => {
  const location = `Performance Measure/Other Performance Measure`;
  const errorMessage = `Numerators must be less than Denominators for all applicable performance measures`;
  const rateDataOPM = getOtherPerformanceMeasureRateArray(OPM);
  const errorArray: FormError[] = [
    ..._validation({
      location,
      qualifiers,
      rateData: performanceMeasureArray,
      errorMessage,
    }),
    ..._validation({
      location,
      qualifiers,
      rateData: rateDataOPM,
      errorMessage,
    }),
  ];

  return !!errorArray.length ? [errorArray[0]] : [];
};

const SSHHValidation = (data: FormData) => {
  let errorArray: any[] = [];
  const OPM = data[DC.OPM_RATES];
  const dateRange = data[DC.DATE_RANGE];

  errorArray = [
    ...validateAtLeastOneRateComplete(data),
    ...validateNoNonZeroNumOrDenomPM(OPM, data),
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.validateBothDatesCompleted(dateRange),
    ...GV.validateNumeratorsLessThanDenominatorsPM(),
  ];

  return errorArray;
};

export const validationFunctions = [SSHHValidation];
