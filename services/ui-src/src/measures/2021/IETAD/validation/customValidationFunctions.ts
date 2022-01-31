import { Measure } from "./types";

const ageGroups = ["Ages 18 to 64", "Ages 65 and Older"];

// For each age group the denominators need to be the same for both
// Initiation AND Engagement
const validateEqualDenominators = (data: Measure.Form) => {
  let performanceMeasureArray = [
    data["PerformanceMeasure-AgeRates-Initiation-Alcohol"],
    data["PerformanceMeasure-AgeRates-Engagement-Alcohol"],
    data["PerformanceMeasure-AgeRates-Initiation-Opioid"],
    data["PerformanceMeasure-AgeRates-Engagement-Opioid"],
    data["PerformanceMeasure-AgeRates-Initiation-Other"],
    data["PerformanceMeasure-AgeRates-Engagement-Other"],
    data["PerformanceMeasure-AgeRates-Initiation-Total"],
    data["PerformanceMeasure-AgeRates-Engagement-Total"],
  ];
  let error;
  let errorArray: any[] = [];
  ageGroups.forEach((ageGroup, i) => {
    let filledInData: any[] = [];
    performanceMeasureArray.forEach((_performanceObj, index) => {
      if (
        performanceMeasureArray[index] &&
        performanceMeasureArray[index][i] &&
        performanceMeasureArray[index][i].denominator
      ) {
        filledInData.push(performanceMeasureArray[index][i]);
      }
    });
    if (filledInData.length > 1) {
      const firstDenominator = filledInData[0].denominator;
      let denominatorsNotEqual = false;
      filledInData.forEach((_filledInDataObj, index) => {
        if (filledInData[index].denominator !== firstDenominator) {
          denominatorsNotEqual = true;
        }
      });
      if (denominatorsNotEqual) {
        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Denominators must be the same for all performance measures for ${ageGroup}`,
        };

        errorArray.push(error);
      }
    }
  });
  return error ? errorArray : error;
};

// For every performance measure the Numerators must always be less than the denominators
const validateNumeratorsLessThanDenominators = (data: Measure.Form) => {
  let performanceMeasureArray = [
    data["PerformanceMeasure-AgeRates-Initiation-Alcohol"],
    data["PerformanceMeasure-AgeRates-Engagement-Alcohol"],
    data["PerformanceMeasure-AgeRates-Initiation-Opioid"],
    data["PerformanceMeasure-AgeRates-Engagement-Opioid"],
    data["PerformanceMeasure-AgeRates-Initiation-Other"],
    data["PerformanceMeasure-AgeRates-Engagement-Other"],
    data["PerformanceMeasure-AgeRates-Initiation-Total"],
    data["PerformanceMeasure-AgeRates-Engagement-Total"],
  ];
  let error = false;
  let errorArray: any[] = [];
  ageGroups.forEach((_ageGroup, i) => {
    performanceMeasureArray.forEach((_performanceObj, index) => {
      if (
        performanceMeasureArray[index] &&
        performanceMeasureArray[index][i] &&
        performanceMeasureArray[index][i].denominator &&
        performanceMeasureArray[index][i].numerator
      ) {
        if (
          performanceMeasureArray[index][i].denominator <
          performanceMeasureArray[index][i].numerator
        ) {
          error = true;
        }
      }
    });
  });
  if (error) {
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage: `Numerators must be less than Denominators for all applicable performance measures`,
    });
  }
  return error ? errorArray : error;
};

// // The AOM totals Numerator needs to be equal or greater than the largest initiation/engagement
const validateTotalsEqualOrGreaterThan = (data: Measure.Form) => {
  let initiationArray = [
    data["PerformanceMeasure-AgeRates-Initiation-Alcohol"],
    data["PerformanceMeasure-AgeRates-Initiation-Opioid"],
    data["PerformanceMeasure-AgeRates-Initiation-Other"],
  ];
  let engagementArray = [
    data["PerformanceMeasure-AgeRates-Engagement-Alcohol"],
    data["PerformanceMeasure-AgeRates-Engagement-Opioid"],
    data["PerformanceMeasure-AgeRates-Engagement-Other"],
  ];
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
          !(
            data["PerformanceMeasure-AgeRates-Initiation-Total"][i] &&
            data["PerformanceMeasure-AgeRates-Initiation-Total"][i].numerator
          ) ||
          initiationArray[index][i].numerator >
            data["PerformanceMeasure-AgeRates-Initiation-Total"][i].numerator
        ) {
          engagementError = true;
          error = true;
        }
      }
    });
    engagementArray.forEach((_engageObj, index) => {
      if (
        initiationArray[index] &&
        initiationArray[index][i] &&
        initiationArray[index][i].numerator
      ) {
        if (
          !(
            data["PerformanceMeasure-AgeRates-Engagement-Total"][i] &&
            data["PerformanceMeasure-AgeRates-Engagement-Total"][i].numerator
          ) ||
          initiationArray[index][i].numerator >
            data["PerformanceMeasure-AgeRates-Engagement-Total"][i].numerator
        ) {
          error = true;
          engagementError = true;
        }
      }
    });
    if (initiationError) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage: `Numerator for Initiation of AOD Treatment: AOD Abuse or Dependence must be greater than or equal to the highest number in its sub-categories for ${ageGroup}`,
      });
    }
    if (engagementError) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage: `Numerator for Initiation of AOD Treatment: AOD Abuse or Dependence must be greater than or equal to the highest number in its sub-categories for ${ageGroup}`,
      });
    }
  });
  return error ? errorArray : error;
};

const atLeastOneRateComplete = (data: Measure.Form) => {
  let performanceMeasureArray = [
    data["PerformanceMeasure-AgeRates-Initiation-Alcohol"],
    data["PerformanceMeasure-AgeRates-Engagement-Alcohol"],
    data["PerformanceMeasure-AgeRates-Initiation-Opioid"],
    data["PerformanceMeasure-AgeRates-Engagement-Opioid"],
    data["PerformanceMeasure-AgeRates-Initiation-Other"],
    data["PerformanceMeasure-AgeRates-Engagement-Other"],
    data["PerformanceMeasure-AgeRates-Initiation-Total"],
    data["PerformanceMeasure-AgeRates-Engagement-Total"],
  ];
  let error = true;
  let errorArray: any[] = [];

  // Check OPM first
  ageGroups.forEach((_ageGroup, i) => {
    if (
      data["OtherPerformanceMeasure-Rates"] &&
      data["OtherPerformanceMeasure-Rates"][i] &&
      data["OtherPerformanceMeasure-Rates"][i].rate
    ) {
      error = false;
    }
  });

  // Then Check regular Performance Measures
  ageGroups.forEach((_ageGroup, i) => {
    performanceMeasureArray.forEach((_performanceObj, index) => {
      if (
        performanceMeasureArray[index] &&
        performanceMeasureArray[index][i] &&
        performanceMeasureArray[index][i].denominator &&
        performanceMeasureArray[index][i].numerator
      ) {
        error = false;
      }
    });
  });
  if (error) {
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage: `At least one performance measure must be completed`,
    });
  }
  return error ? errorArray : error;
};

const validateDualPopInformation = (data: Measure.Form) => {
  let performanceMeasureArray = [
    data["PerformanceMeasure-AgeRates-Initiation-Alcohol"],
    data["PerformanceMeasure-AgeRates-Engagement-Alcohol"],
    data["PerformanceMeasure-AgeRates-Initiation-Opioid"],
    data["PerformanceMeasure-AgeRates-Engagement-Opioid"],
    data["PerformanceMeasure-AgeRates-Initiation-Other"],
    data["PerformanceMeasure-AgeRates-Engagement-Other"],
    data["PerformanceMeasure-AgeRates-Initiation-Total"],
    data["PerformanceMeasure-AgeRates-Engagement-Total"],
  ];
  let dualEligible;
  if (data["DefinitionOfDenominator"]) {
    dualEligible =
      data["DefinitionOfDenominator"].indexOf(
        "DenominatorIncMedicareMedicaidDualEligible"
      ) !== -1;
  } else {
    dualEligible = false;
  }
  let error;
  let errorArray: any[] = [];
  let filledInData: any[] = [];
  const i = 1;
  performanceMeasureArray.forEach((_performanceObj, index) => {
    if (
      performanceMeasureArray[index] &&
      performanceMeasureArray[index][i] &&
      (performanceMeasureArray[index][i].denominator ||
        performanceMeasureArray[index][i].numerator)
    ) {
      filledInData.push(performanceMeasureArray[index][i]);
    }
  });
  if (dualEligible && filledInData.length > 0) {
    error = true;
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage:
        "Information has been included in the Age 65 and older Performance Measure but the checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is missing",
    });
  }
  if (!dualEligible && filledInData.length < performanceMeasureArray.length) {
    error = true;
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage:
        "The checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is checked but you are missing performance measure data for Age 65 and Older",
    });
  }
  return error ? errorArray : error;
};

export const validationFunctions = [
  validateEqualDenominators,
  validateTotalsEqualOrGreaterThan,
  validateNumeratorsLessThanDenominators,
  atLeastOneRateComplete,
  validateDualPopInformation,
];
