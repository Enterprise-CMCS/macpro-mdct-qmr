import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";
import {
  omsValidations,
  validateDenominatorGreaterThanNumerator,
} from "measures/globalValidations/omsValidationsLib";
import * as PMD from "./data";
import { FormData } from "./types";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateDualPopInformation,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
  validateRequiredRadioButtonForCombinedRates,
  getDeviationNDRArray,
  getPerfMeasureRateArray,
  omsLocationDictionary,
  validateReasonForNotReporting,
} from "measures/globalValidations";

const PQI05Validation = (data: FormData) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const ageGroups = PMD.qualifiers;
  const dateRange = data["DateRange"];
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);

  const deviationArray = getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations
  );

  const validateDualPopInformationArray = [
    performanceMeasureArray?.[0].filter((pm) => {
      return pm?.label === "Age 65 and older";
    }),
  ];

  let errorArray: any[] = [];
  if (data["DidReport"] === "no") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }
  errorArray = [
    ...errorArray,
    ...ensureBothDatesCompletedInRange(dateRange),
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, PMD.qualifiers),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      PMD.qualifiers
    ),
    ...validateNoNonZeroNumOrDenom(
      performanceMeasureArray,
      OPM,
      PMD.qualifiers
    ),
    ...validateDualPopInformation(
      validateDualPopInformationArray,
      OPM,
      1,
      ageGroups
    ),
    ...validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      PMD.qualifiers,
      deviationArray
    ),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
    ...validateRequiredRadioButtonForCombinedRates(data),
    ...omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: omsLocationDictionary(OMSData(true)),
      validationCallbacks: [validateDenominatorGreaterThanNumerator],
    }),
  ];

  return errorArray;
};

export const validationFunctions = [PQI05Validation];
