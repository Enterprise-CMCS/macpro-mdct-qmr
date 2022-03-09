import {
  atLeastOneRateComplete,
  validateDualPopInformation,
  validateNumeratorsLessThanDenominators,
  validateEqualDenominators,
  validateNoNonZeroNumOrDenom,
  validateReasonForNotReporting,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
  ensureBothDatesCompletedInRange,
  validateOneRateHigherThanOther,
} from "../../globalValidations/validationsLib";
import * as PMD from "./data";
import * as DC from "dataConstants";
import { FormData } from "./types";
import {
  getPerfMeasureRateArray,
  getDeviationNDRArray,
  validateRequiredRadioButtonForCombinedRates,
  omsLocationDictionary,
} from "../../globalValidations";
import {
  omsValidations,
  validateDenominatorGreaterThanNumerator,
  validateDenominatorsAreTheSame,
  validateOneRateLessThanOther,
} from "measures/globalValidations/omsValidationsLib";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

const FUMADValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const sixtyDaysIndex = 1;
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const DefinitionOfDenominator = data["DefinitionOfDenominator"];

  let errorArray: any[] = [];
  if (data["DidReport"] === "no") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  let sameDenominatorError = [
    ...validateEqualDenominators(performanceMeasureArray, ageGroups),
  ];
  sameDenominatorError =
    sameDenominatorError.length > 0 ? [...sameDenominatorError] : [];

  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...validateDualPopInformation(
      performanceMeasureArray,
      OPM,
      sixtyDaysIndex,
      DefinitionOfDenominator
    ),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...sameDenominatorError,
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
    ...validateOneRateHigherThanOther(data, PMD.data),
  ];

  return errorArray;
};

const validateDualPopulationInformation = (data: FormData) => {
  const sevenDays65orOlder =
    data.PerformanceMeasure?.rates?.[
      `${PMD.categories[1].replace(/[^\w]/g, "")}`
    ] ?? [];
  const thirtyDays65orOlder =
    data.PerformanceMeasure?.rates?.[
      `${PMD.categories[0].replace(/[^\w]/g, "")}`
    ] ?? [];
  const DualEligibleCheck = data["DefinitionOfDenominator"] ?? [];

  let error;

  if (sevenDays65orOlder || thirtyDays65orOlder) {
    if (sevenDays65orOlder[1] || thirtyDays65orOlder[1]) {
      if (
        sevenDays65orOlder[1]?.numerator ||
        thirtyDays65orOlder[1]?.numerator ||
        sevenDays65orOlder[1]?.denominator ||
        thirtyDays65orOlder[1]?.denominator
      ) {
        if (
          DualEligibleCheck.indexOf(
            "DenominatorIncMedicareMedicaidDualEligible"
          ) === -1
        ) {
          error = {
            errorLocation: "Performance Measure",
            errorMessage:
              "Information has been included in the Age 65 and older Performance Measure but the checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is missing",
          };
        }
      }
    }
  }
  if (
    DualEligibleCheck.indexOf("DenominatorIncMedicareMedicaidDualEligible") !==
    -1
  ) {
    if (!sevenDays65orOlder && !thirtyDays65orOlder) {
      error = {
        errorLocation: "Performance Measure",
        errorMessage:
          "Missing data on Performance Measure for Age 65 and older",
      };
    } else if (!sevenDays65orOlder[1] && !thirtyDays65orOlder[1]) {
      error = {
        errorLocation: "Performance Measure",
        errorMessage:
          "Missing data on Performance Measure for Age 65 and older",
      };
    } else if (
      (!sevenDays65orOlder[1]?.numerator || // either not filled in
        !sevenDays65orOlder[1]?.denominator) && // either not filled in
      !thirtyDays65orOlder[1]?.numerator && //both filled in
      !thirtyDays65orOlder[1]?.denominator //both filled in
    ) {
      return {
        errorLocation: "Performance Measure",
        errorMessage:
          "Missing data on Performance Measure for Age 65 and older",
      };
    } else if (
      (!thirtyDays65orOlder[1]?.numerator ||
        !thirtyDays65orOlder[1]?.denominator) &&
      !sevenDays65orOlder[1]?.numerator &&
      !sevenDays65orOlder[1]?.denominator
    ) {
      return {
        errorLocation: "Performance Measure",
        errorMessage:
          "Missing data on Performance Measure for Age 65 and older",
      };
    }
  }
  return error;
};

const validateAtLeastOneNDRSet = (data: FormData) => {
  let error;
  const measureSpecification = data["MeasurementSpecification"];
  const sevenDays =
    data.PerformanceMeasure?.rates?.[
      `${PMD.categories[1].replace(/[^\w]/g, "")}`
    ] ?? [];
  const thirtyDays =
    data.PerformanceMeasure?.rates?.[
      `${PMD.categories[0].replace(/[^\w]/g, "")}`
    ] ?? [];
  const otherPerformanceRates = data["OtherPerformanceMeasure-Rates"] ?? [];
  const isHEDIS = measureSpecification === "NCQA/HEDIS";

  let doesOtherNDRExist = false;
  otherPerformanceRates.forEach((ndr) => {
    const ndrRate = ndr?.rate?.[0]?.rate;
    if (ndrRate) {
      doesOtherNDRExist = true;
    }
  });

  if (
    isHEDIS &&
    !sevenDays?.[0]?.rate &&
    !sevenDays?.[1]?.rate &&
    !thirtyDays?.[0]?.rate &&
    !thirtyDays?.[1]?.rate
  ) {
    error = {
      errorLocation: "Performance Measure",
      errorMessage:
        "At least one Performance Measure Numerator, Denominator, and Rate must be completed",
    };
  } else if (measureSpecification && !isHEDIS && !doesOtherNDRExist) {
    error = {
      errorLocation: "Other Performance Measure",
      errorMessage:
        "At least one Other Performance Measure Numerator, Denominator, and Rate must be completed",
    };
  }

  return error;
};

const validateAtLeastOneDeviationNDR = (data: FormData) => {
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const deviationArray = getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    true
  );
  const didCalculationsDeviate = data["DidCalculationsDeviate"] === DC.YES;

  return validateAtLeastOneNDRInDeviationOfMeasureSpec(
    performanceMeasureArray,
    PMD.qualifiers,
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
      locationDictionary: omsLocationDictionary(OMSData(true)),
      validationCallbacks: [
        validateDenominatorGreaterThanNumerator,
        validateDenominatorsAreTheSame,
        validateOneRateLessThanOther,
      ],
    })
  );

  return errorArray;
};

export const validationFunctions = [
  FUMADValidation,
  validateAtLeastOneNDRSet,
  validateDualPopulationInformation,
  validateAtLeastOneDeviationNDR,
  validateRequiredRadioButtonForCombinedRates,
  validateBothDatesCompletedInRange,
  validateOMS,
];
