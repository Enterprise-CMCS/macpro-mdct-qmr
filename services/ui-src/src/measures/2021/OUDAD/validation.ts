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
  validateReasonForNotReporting,
} from "measures/globalValidations";
import {
  omsValidations,
  validateDenominatorGreaterThanNumerator,
  validateDenominatorsAreTheSame,
} from "measures/globalValidations/omsValidationsLib";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";
import * as PMD from "./data";
import * as DC from "dataConstants";
import { FormData } from "./types";

const OUDValidation = (data: FormData) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const ageGroups = PMD.qualifiers;
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data) ?? [];
  const dateRange = data["DateRange"];
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const didCalculationsDeviate = data["DidCalculationsDeviate"] === DC.YES;
  let errorArray: any[] = [];
  if (data["DidReport"] === "no") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

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
      deviationArray,
      didCalculationsDeviate
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
    ...validateEqualDenominators(performanceMeasureArray, ageGroups),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
  ];

  return errorArray;
};

export const validationFunctions = [OUDValidation];
