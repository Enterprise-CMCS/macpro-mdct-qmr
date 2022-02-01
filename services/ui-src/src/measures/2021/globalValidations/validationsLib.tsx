import { PerformanceMeasure } from "./types";

export const atLeastOneRateComplete = (
  performanceMeasureArray: PerformanceMeasure[][],
  ageGroups: string[],
  OPM: any
) => {
  let error = true;
  let errorArray: any[] = [];

  // Check OPM first
  ageGroups.forEach((_ageGroup, i) => {
    if (OPM && OPM[i] && OPM[i].rate) {
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
  return error ? errorArray : [];
};

export const validateDualPopInformation = (
  performanceMeasureArray: PerformanceMeasure[][],
  age65PlusIndex: number,
  DefinitionOfDenominator: any
) => {
  let dualEligible;
  if (DefinitionOfDenominator) {
    dualEligible =
      DefinitionOfDenominator.indexOf(
        "DenominatorIncMedicareMedicaidDualEligible"
      ) !== -1;
  } else {
    dualEligible = false;
  }
  let error;
  let errorArray: any[] = [];
  let filledInData: any[] = [];
  const i = age65PlusIndex;
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
  if (!dualEligible && filledInData.length > 0) {
    error = true;
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage:
        "Information has been included in the Age 65 and older Performance Measure but the checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is missing",
    });
  }
  if (dualEligible && filledInData.length < performanceMeasureArray.length) {
    error = true;
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage:
        "The checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is checked but you are missing performance measure data for Age 65 and Older",
    });
  }
  return error ? errorArray : [];
};

// For every performance measure the Numerators must always be less than the denominators
export const validateNumeratorsLessThanDenominators = (
  performanceMeasureArray: PerformanceMeasure[][],
  ageGroups: string[]
) => {
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
  return error ? errorArray : [];
};

// For each age group the denominators need to be the same for both
// Initiation AND Engagement
export const validateEqualDenominators = (
  performanceMeasureArray: PerformanceMeasure[][],
  ageGroups: string[]
) => {
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
  return error ? errorArray : [];
};
