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
  validateAllDenomsTheSameCrossQualifier,
} from "measures/globalValidations";
import * as OMSVal from "measures/globalValidations/omsValidationsLib";
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
    ...validateAllDenomsTheSameCrossQualifier(
      data,
      PMD.categories,
      PMD.qualifiers
    ),
    ...OMSVal.omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: omsLocationDictionary(
        OMSData(true),
        PMD.qualifiers,
        PMD.categories
      ),
      validationCallbacks: [
        OMSVal.validateDenominatorGreaterThanNumerator,
        OMSVal.validateDenominatorsAreTheSame,
        OMSVal.validateRateZero,
        OMSVal.validateRateNotZero,
        OMSVal.validateAllDenomsAreTheSameCrossQualifier,
      ],
    }),
    ...validateNoNonZeroNumOrDenom(
      performanceMeasureArray,
      OPM,
      ageGroups,
      data
    ),
  ];

  return errorArray;
};

export const validationFunctions = [OUDValidation];
