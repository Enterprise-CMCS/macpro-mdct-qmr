import * as DC from "dataConstants";
import { FormRateField } from "../types";

export const validateDualPopInformationPM = (
  performanceMeasureArray: FormRateField[][],
  OPM: any,
  age65PlusIndex: number,
  DefinitionOfDenominator: string[] | undefined,
  errorReplacementText: string = "Age 65 and Older"
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

  if (dualEligible && filledInData.length === 0) {
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage: `"Individuals Dually Eligible for Medicare and Medicaid" is selected in the "Definition of Denominator" question but you are missing performance measure data for ${errorReplacementText}`,
      errorType: "Warning",
    });
  }
  return errorArray;
};
