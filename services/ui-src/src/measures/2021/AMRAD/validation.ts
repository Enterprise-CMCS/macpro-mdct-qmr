import { FormData } from "./types";
import { omsLocationDictionary } from "measures/globalValidations/dataDrivenTools";
import * as PMD from "./data";
import { getPerfMeasureRateArray } from "measures/globalValidations";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateReasonForNotReporting,
  validateTotalNDR,
} from "measures/globalValidations/validationsLib";
import {
  omsValidations,
  validateDenominatorGreaterThanNumerator,
  validateDenominatorsAreTheSame,
  validateOneRateLessThanOther,
  validateRateNotZero,
  validateRateZero,
  validateOMSTotalNDR,
} from "measures/globalValidations/omsValidationsLib";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

const AMRADValidation = (data: FormData) => {
  const ageGroups = ["Ages 19 to 50", "Ages 51 to 64", "Total (Ages 19 to 64)"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const dateRange = data["DateRange"];
  const whyNotReporting = data["WhyAreYouNotReporting"];

  let errorArray: any[] = [];
  if (data["DidReport"] === "no") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  errorArray = [
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
    ...validateTotalNDR(performanceMeasureArray),
    ...ensureBothDatesCompletedInRange(dateRange),
  ];

  return errorArray;
};

const validateOMS = (data: FormData) => {
  return [
    ...omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: omsLocationDictionary(
        OMSData(true),
        PMD.qualifiers,
        PMD.categories
      ),
      validationCallbacks: [
        validateDenominatorGreaterThanNumerator,
        validateDenominatorsAreTheSame,
        validateOneRateLessThanOther,
        validateRateZero,
        validateRateNotZero,
        validateOMSTotalNDR,
      ],
    }),
  ];
};

export const validationFunctions = [AMRADValidation, validateOMS];
