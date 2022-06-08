import * as DC from "dataConstants";
import * as GV from "measures/2021/globalValidations";
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

const SSHHValidation = (data: FormData) => {
  let errorArray: any[] = [];
  const dateRange = data[DC.DATE_RANGE];

  errorArray = [
    ...validateAtLeastOneRateComplete(data),
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.validateBothDatesCompleted(dateRange),
  ];

  return errorArray;
};

export const validationFunctions = [SSHHValidation];
