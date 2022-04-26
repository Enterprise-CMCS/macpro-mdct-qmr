import { FormRateField } from "../types";

export const validateDualPopInformationPM = (
  performanceMeasureArray: FormRateField[][],
  OPM: any,
  age65PlusIndex: number,
  DefinitionOfDenominator: any,
  errorReplacementText: string = "Age 65 and Older"
) => {
  if (OPM) {
    return [];
  }
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
  let errorArray: FormError[] = [];
  let filledInData: any[] = [];
  const i = age65PlusIndex;
  performanceMeasureArray?.forEach((performanceMeasure) => {
    if (
      performanceMeasure &&
      performanceMeasure[i] &&
      performanceMeasure[i].denominator &&
      performanceMeasure[i].numerator &&
      performanceMeasure[i].rate
    ) {
      filledInData.push(performanceMeasure[i]);
    }
  });
  if (!dualEligible && filledInData.length > 0) {
    error = true;
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage: `Information has been included in the ${errorReplacementText} Performance Measure but the checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is missing`,
    });
  }
  if (dualEligible && filledInData.length === 0) {
    error = true;
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage: `The checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is checked but you are missing performance measure data for ${errorReplacementText}`,
    });
  }
  return error ? [errorArray[0]] : [];
};
