import * as DC from "dataConstants";
import { FormRateField } from "shared/types/TypeValidations";
import { featuresByYear } from "utils/featuresByYear";

export const getLabels = (errorReplacementText: string) => {
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

export const ComplexValidateDualPopInformation = (
  performanceMeasureArray: any,
  OPM: any,
  DefinitionOfDenominator: string[] | undefined,
  errorReplacementText: string = "Age 65 and Older"
) => {
  if (OPM) {
    return [];
  }
  const labels = getLabels(errorReplacementText);
  const dualEligible = DefinitionOfDenominator
    ? DefinitionOfDenominator.includes(
        DC.DENOMINATOR_INC_MEDICAID_DUAL_ELIGIBLE
      )
    : false;

  const errorArray: FormError[] = [];
  const filledInData: FormRateField[] = [];
  const age65Data: FormRateField[] = [];

  performanceMeasureArray.forEach((cat: any) => {
    cat?.forEach((qual: any) => {
      if (qual?.label === "Age 65 and older") age65Data.push(qual);
      if (qual?.label === "Ages 65 to 74") age65Data.push(qual);
      if (qual?.label === "Ages 75 to 84") age65Data.push(qual);
      if (qual?.label === "Age 85 and older") age65Data.push(qual);
    });
  });

  const allFieldsComplete = (qual: {
    fields: { label: string; value: string }[];
  }) => {
    return qual.fields.every(
      (field) => field.value !== undefined && field.value !== ""
    );
  };

  age65Data.forEach((qual: any) => {
    if (qual && allFieldsComplete(qual)) filledInData.push(qual);
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
