import * as DC from "dataConstants";
import { FormRateField } from "shared/types/TypeValidations";
import { featuresByYear } from "utils/featuresByYear";
import { CoreSetAbbr } from "types";

export const getLabels = (errorReplacementText: string, coreSet?: string) => {
  if (
    coreSet &&
    coreSet === CoreSetAbbr.ACSC &&
    featuresByYear.hasAdultSeparateCHIPInclusiveWarning &&
    featuresByYear.shouldValidateDuallyEligibleCheckbox
  ) {
    return {
      checkmarkWarning: `Information has been included in the ${errorReplacementText} Performance Measure but the checkmark for (Denominator Includes Medicare and Separate CHIP Dually-Eligible population) is missing`,
      missingDataWarning: `The checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is checked but you are missing performance measure data for ${errorReplacementText}`,
    };
  }
  if (featuresByYear.shouldValidateDuallyEligibleCheckbox) {
    return {
      checkmarkWarning: `Information has been included in the ${errorReplacementText} Performance Measure but the checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is missing`,
      missingDataWarning: `The checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is checked but you are missing performance measure data for ${errorReplacementText}`,
    };
  }
  return {
    missingDataWarning: `"Individuals Dually Eligible for Medicare and Medicaid" is selected in the "Definition of Denominator" question but you are missing performance measure data for ${errorReplacementText}`,
  };
};

export const validateDualPopInformationPM = (
  performanceMeasureArray: FormRateField[][],
  OPM: any,
  age65PlusIndex: number,
  DefinitionOfDenominator: string[] | undefined,
  coreSet?: string,
  errorReplacementText: string = "Age 65 and Older"
) => {
  if (OPM) {
    return [];
  }

  const labels = getLabels(errorReplacementText, coreSet);

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

  if (!dualEligible && filledInData.length > 0 && labels.checkmarkWarning) {
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage: labels.checkmarkWarning,
      errorType: "Warning",
    });
  }
  if (dualEligible && filledInData.length === 0 && labels.missingDataWarning) {
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage: labels.missingDataWarning,
      errorType: "Warning",
    });
  }
  return errorArray;
};
