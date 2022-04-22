import { FormData } from "./types";
import {
  atLeastOneRateComplete,
  validateNumeratorsLessThanDenominators,
  ensureBothDatesCompletedInRange,
  validateNoNonZeroNumOrDenom,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
  validateRequiredRadioButtonForCombinedRates,
  getDeviationNDRArray,
  validateReasonForNotReporting,
  validateAllDenomsTheSameCrossQualifier,
  validateOneDataSource,
} from "measures/globalValidations";
import { getPerfMeasureRateArray } from "measures/globalValidations";
import * as PMD from "./data";
import * as DC from "dataConstants";

import {
  omsValidations,
  validateAllDenomsAreTheSameCrossQualifier,
  validateDenominatorGreaterThanNumerator,
  validateOneRateLessThanOther,
  validateRateZero,
  validateRateNotZero,
} from "measures/globalValidations/omsValidationsLib";
import { omsLocationDictionary } from "measures/globalValidations";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

const validateLarcRateGreater = (data: FormData) => {
  let error;
  const memeRates =
    data.PerformanceMeasure?.rates?.[
      `${PMD.categories[0].replace(/[^\w]/g, "")}`
    ] ?? [];
  const larcRates =
    data.PerformanceMeasure?.rates?.[
      `${PMD.categories[1].replace(/[^\w]/g, "")}`
    ] ?? [];

  if (memeRates && larcRates && memeRates[0]?.rate && larcRates[0]?.rate) {
    if (parseFloat(larcRates[0].rate) > parseFloat(memeRates[0].rate)) {
      error = {
        errorLocation: "Performance Measure",
        errorMessage:
          "Long-acting reversible method of contraception (LARC) rate must be less than or equal to Most effective or moderately effective method of contraception rate",
      };
    }
  }

  return error;
};

const CCWADValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);

  let errorArray: any[] = [];
  if (data["DidReport"] === "no") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...validateNoNonZeroNumOrDenom(
      performanceMeasureArray,
      OPM,
      ageGroups,
      data
    ),
    ...validateAllDenomsTheSameCrossQualifier(data, PMD.categories),
    ...validateOneDataSource(data),
  ];

  return errorArray;
};

const validateAtLeastOneDeviationNDR = (data: FormData) => {
  const memeRates =
    data.PerformanceMeasure?.rates?.[
      `${PMD.categories[0].replace(/[^\w]/g, "")}`
    ] ?? [];
  const larcRates =
    data.PerformanceMeasure?.rates?.[
      `${PMD.categories[1].replace(/[^\w]/g, "")}`
    ] ?? [];

  const deviationArray = getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations
  );

  const didCalculationsDeviate = data["DidCalculationsDeviate"] === DC.YES;

  return validateAtLeastOneNDRInDeviationOfMeasureSpec(
    [memeRates, larcRates],
    [""],
    deviationArray,
    didCalculationsDeviate
  );
};

const validateBothDatesCompletedInRange = (data: FormData) => {
  const dateRange = data["DateRange"];
  return [...ensureBothDatesCompletedInRange(dateRange)];
};

const validateOMS = (data: FormData) => {
  const errorArray: FormError[] = [];

  errorArray.push(
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
        validateAllDenomsAreTheSameCrossQualifier,
        validateOneRateLessThanOther,
        validateRateZero,
        validateRateNotZero,
      ],
    })
  );

  return errorArray;
};

export const validationFunctions = [
  CCWADValidation,
  validateBothDatesCompletedInRange,
  validateLarcRateGreater,
  validateAtLeastOneDeviationNDR,
  validateRequiredRadioButtonForCombinedRates,
  validateOMS,
];
