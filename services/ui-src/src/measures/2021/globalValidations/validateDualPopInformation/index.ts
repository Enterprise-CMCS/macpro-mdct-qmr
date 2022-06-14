import * as DC from "dataConstants";
import { FormRateField } from "../types";

export const validateDualPopInformationPM = (
  performanceMeasureArray: FormRateField[][],
  OPM: any,
  age65PlusIndex: number,
  DefinitionOfDenominator: string[] | undefined,
  errorReplacementText: string = "Age 65 and Older",
  customErrorMessage?: string
) => {
  if (OPM) {
    return [];
  }

  const dualEligible = DefinitionOfDenominator
    ? DefinitionOfDenominator.indexOf(
        DC.DENOMINATOR_INC_MEDICAID_DUAL_ELIGIBLE
      ) !== -1
    : false;

  const errorArray: FormError[] = [];
  const filledInData: FormRateField[] = [];
  performanceMeasureArray?.forEach((performanceMeasure) => {
    if (
      performanceMeasure &&
      performanceMeasure[age65PlusIndex] &&
      performanceMeasure[age65PlusIndex].denominator &&
      performanceMeasure[age65PlusIndex].numerator &&
      performanceMeasure[age65PlusIndex].rate
    ) {
      filledInData.push(performanceMeasure[age65PlusIndex]);
    }
  });

  if (!dualEligible && filledInData.length > 0) {
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage: customErrorMessage
        ? customErrorMessage
        : `Information has been included in the ${errorReplacementText} Performance Measure but the checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is missing`,
    });
  }
  if (dualEligible && filledInData.length === 0) {
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage: customErrorMessage
        ? customErrorMessage
        : `The checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is checked but you are missing performance measure data for ${errorReplacementText}`,
    });
  }
  return errorArray;
};
