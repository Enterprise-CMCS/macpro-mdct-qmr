import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateEqualDenominators,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
  validateRequiredRadioButtonForCombinedRates,
  getDeviationNDRArray,
  getPerfMeasureRateArray,
  omsLocationDictionary,
} from "measures/globalValidations";
import {
  omsValidations,
  validateDenominatorGreaterThanNumerator,
  validateDenominatorsAreTheSame,
} from "measures/globalValidations/omsValidationsLib";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";
import * as PMD from "./data";
import { FormData } from "./types";

const OUDValidation = (data: FormData) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data) ?? [];
  const dateRange = data["DateRange"];
  let errorArray: any[] = [];

  const deviationArray = getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations
  );

  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, PMD.qualifiers),
    ...ensureBothDatesCompletedInRange(dateRange),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      PMD.qualifiers
    ),
    ...validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      PMD.qualifiers,
      deviationArray
    ),
    ...validateRequiredRadioButtonForCombinedRates(data),
    ...omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: omsLocationDictionary(OMSData(true)),
      validationCallbacks: [
        validateDenominatorGreaterThanNumerator,
        validateDenominatorsAreTheSame,
      ],
    }),
    ...validateEqualDenominators(performanceMeasureArray, PMD.qualifiers),
    ...validateNoNonZeroNumOrDenom(
      performanceMeasureArray,
      OPM,
      PMD.qualifiers
    ),
    ...validateRequiredRadioButtonForCombinedRates(data),
  ];

  return errorArray;
};

export const validationFunctions = [OUDValidation];
