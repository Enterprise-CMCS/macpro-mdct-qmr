import * as DC from "dataConstants";
import * as GV from "measures/2024/shared/globalValidations";
//form type
import { DefaultFormData as FormData } from "shared/types/FormData";

export interface FormRateField {
  denominator?: string;
  numerator?: string;
  label?: string;
  rate?: string;
}

const validateAtLeastOneRateComplete = (data: any) => {
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
const validateNoNonZeroNumOrDenomPM = (OPM: any, data: any) => {
  const errorArray: FormError[] = [];
  const hybridData = data?.[DC.DATA_SOURCE]?.includes(
    DC.HYBRID_ADMINSTRATIVE_AND_MEDICAL_RECORDS_DATA
  );
  const location = `Performance Measure`;
  const rateDataOPM = GV.getOtherPerformanceMeasureRateArray(OPM);

  const nonZeroErrors = [
    ...GV.validationRateNotZero({ location, rateData: rateDataOPM }),
  ];
  const zeroErrors = [
    ...GV.validationRateZero({ location, rateData: rateDataOPM, hybridData }),
  ];

  if (!!nonZeroErrors.length) errorArray.push(nonZeroErrors[0]);
  if (!!zeroErrors.length) errorArray.push(zeroErrors[0]);
  return errorArray;
};

/**
 * Checks user-created performance measures for numerator greater than denominator errors
 */
const validateNumeratorsLessThanDenominatorsPM = (OPM: any) => {
  const location = `Performance Measure`;
  const errorMessage = `Numerators must be less than Denominators for all applicable performance measures`;
  const rateDataOPM = GV.getOtherPerformanceMeasureRateArray(OPM);

  const errorArray: FormError[] = [];

  for (const fieldSet of rateDataOPM) {
    for (const [, rate] of fieldSet.entries()) {
      if (
        rate.numerator &&
        rate.denominator &&
        parseFloat(rate.denominator) < parseFloat(rate.numerator)
      ) {
        errorArray.push({
          errorLocation: location,
          errorMessage: errorMessage,
        });
      }
    }
  }

  return !!errorArray.length ? [errorArray[0]] : [];
};

/**
 * Checks for NDR field sets that have been partially filled out and reports them.
 *
 * @param OPM opm data
 */
export const validatePartialRateCompletion = (OPM: any) => {
  const errors: FormError[] = [];
  const rateDataOPM = GV.getOtherPerformanceMeasureRateArray(OPM);

  const location = `Performance Measure`;

  for (const [, rateSet] of rateDataOPM.entries()) {
    for (const [, rate] of rateSet.entries()) {
      if (
        rate &&
        ((rate.numerator && !rate.denominator) ||
          (rate.denominator && !rate.numerator))
      ) {
        errors.push({
          errorLocation: location,
          errorMessage: `Should not have partially filled NDR sets`,
        });
      }
    }
  }

  return errors;
};

const SSHHValidation = (data: FormData) => {
  let errorArray: any[] = [];
  const OPM = data[DC.OPM_RATES];
  const dateRange = data[DC.DATE_RANGE];

  errorArray = [
    ...validateAtLeastOneRateComplete(data),
    ...validateNoNonZeroNumOrDenomPM(OPM, data),
    ...validateNumeratorsLessThanDenominatorsPM(OPM),
    ...validatePartialRateCompletion(OPM),
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.validateAtLeastOneDataSourceType(data),
    ...GV.validateDateRangeRadioButtonCompletion(data),
    ...GV.validateBothDatesCompleted(dateRange),
    ...GV.validateYearFormat(dateRange),
    ...GV.validateOPMRates(OPM),
    ...GV.validateAtLeastOneDefinitionOfPopulation(data),
  ];

  return errorArray;
};

export const validationFunctions = [SSHHValidation];
