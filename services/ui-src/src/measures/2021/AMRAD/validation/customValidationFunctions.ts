import { Measure } from "./types";
import {
  atLeastOneRateComplete,
  validateDualPopInformation,
  validateNumeratorsLessThanDenominators,
  validateEqualDenominators,
  validateNoNonZeroNumOrDenom,
} from "../../globalValidations/validationsLib";

// // The AOM totals Numerator needs to be equal or greater than the largest initiation/engagement
const validateTotalsEqualOrGreaterThan = (
  initiationArray: any[],
  engagementArray: any[],
  totalInitiation: any,
  totalEngagement: any,
  ageGroups: string[]
) => {
  let error = false;
  let errorArray: any[] = [];
  ageGroups.forEach((ageGroup, i) => {
    let initiationError = false;
    let engagementError = false;
    initiationArray.forEach((_initObj, index) => {
      if (
        initiationArray[index] &&
        initiationArray[index][i] &&
        initiationArray[index][i].numerator
      ) {
        if (
          !(totalInitiation[i] && totalInitiation[i].numerator) ||
          initiationArray[index][i].numerator > totalInitiation[i].numerator
        ) {
          initiationError = true;
          error = true;
        }
      }
    });
    engagementArray.forEach((_engageObj, index) => {
      if (
        engagementArray[index] &&
        engagementArray[index][i] &&
        engagementArray[index][i].numerator
      ) {
        if (
          !(totalEngagement[i] && totalEngagement[i].numerator) ||
          engagementArray[index][i].numerator > totalEngagement[i].numerator
        ) {
          error = true;
          engagementError = true;
        }
      }
    });
    if (initiationError) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage: `In the Category Totals for Initiation for ${ageGroup} the numerator must be equal to or greater than the numerators in the other categories`,
      });
    }
    if (engagementError) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage: `In the Category Totals for Engagement for ${ageGroup} the numerator must be equal to or greater than the numerators in the other categories`,
      });
    }
  });
  return error ? errorArray : [];
};

const IEDValidation = (data: Measure.Form) => {
  const ageGroups = ["Ages 18 to 64", "Age 65 and Older"];
  const age65PlusIndex = 1;
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = [
    data["PerformanceMeasure-AgeRates-Persistent-Asthma"],
  ];
  const DefinitionOfDenominator = data["DefinitionOfDenominator"];

  const initiationArray = [
    data["PerformanceMeasure-AgeRates-Persistent-Asthma"],
  ];
  const engagementArray = [
    data["PerformanceMeasure-AgeRates-Persistent-Asthma"],
  ];
  const totalInitiation = data["PerformanceMeasure-AgeRates-Persistent-Asthma"];
  const totalEngagement = data["PerformanceMeasure-AgeRates-Persistent-Asthma"];
  let errorArray: any[] = [];
  //@ts-ignore
  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...validateDualPopInformation(
      performanceMeasureArray,
      OPM,
      age65PlusIndex,
      DefinitionOfDenominator
    ),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...validateEqualDenominators(performanceMeasureArray, ageGroups),
    ...validateTotalsEqualOrGreaterThan(
      initiationArray,
      engagementArray,
      totalInitiation,
      totalEngagement,
      ageGroups
    ),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
  ];

  return errorArray;
};

export const validationFunctions = [IEDValidation];
