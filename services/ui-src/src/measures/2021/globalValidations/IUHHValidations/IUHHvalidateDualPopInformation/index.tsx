import * as DC from "dataConstants";
import { FormRateField } from "measures/2022/globalValidations/types";

export const IUHHvalidateDualPopInformation = (
  performanceMeasureArray: any,
  OPM: any,
  DefinitionOfDenominator: string[] | undefined,
  errorReplacementText: string = "Age 65 and Older",
  explicitErrorMessage?: string
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
  const age65Data: FormRateField[] = [];

  performanceMeasureArray.forEach((cat: any) => {
    cat?.forEach((qual: any) => {
      if (qual?.label === "Age 65 and older") age65Data.push(qual);
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

  if (!dualEligible && filledInData.length > 0) {
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage: explicitErrorMessage
        ? explicitErrorMessage
        : `Information has been included in the ${errorReplacementText} Performance Measure but the checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is missing`,
    });
  }
  if (dualEligible && filledInData.length === 0) {
    errorArray.push({
      errorLocation: "Performance Measure",
      errorMessage: explicitErrorMessage
        ? explicitErrorMessage
        : `The checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is checked but you are missing performance measure data for ${errorReplacementText}`,
    });
  }
  return errorArray;
};
