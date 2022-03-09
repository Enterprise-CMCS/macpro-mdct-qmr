import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";
import {
  omsValidations,
  validateDenominatorGreaterThanNumerator,
} from "measures/globalValidations/omsValidationsLib";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
  validateRequiredRadioButtonForCombinedRates,
  getDeviationNDRArray,
  getPerfMeasureRateArray,
  omsLocationDictionary,
  validateReasonForNotReporting,
} from "measures/globalValidations";
import * as PMD from "./data";
import * as DC from "dataConstants";
import { FormData } from "./types";

const PQI08Validation = (data: FormData) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const dateRange = data["DateRange"];
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const didCalculationsDeviate = data["DidCalculationsDeviate"] === DC.YES;

  const deviationArray = getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations
  );

  let errorArray: any[] = [];
  if (data["DidReport"] === "no") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }
  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, PMD.qualifiers),
    ...ensureBothDatesCompletedInRange(dateRange),
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
    ...validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      PMD.qualifiers,
      deviationArray,
      didCalculationsDeviate
    ),
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

export const validationFunctions = [PQI08Validation];
