import { featuresByYear } from "utils/featuresByYear";
import {
  ACSMQualifierForm,
  DeliverySystem,
} from "../../types/TypeQualifierForm";

const validate21To64EqualsToOneHundredPercent = (data: ACSMQualifierForm) => {
  const values = data["PercentageEnrolledInEachDeliverySystem"];
  const errorArray: any[] = [];

  const total21To64Percent = values?.reduce(
    (acc: number, curr: DeliverySystem) => {
      return acc + parseFloat(curr.TwentyOneToSixtyFour || "0");
    },
    0
  );
  const total65PlusPercent = values?.reduce(
    (acc: number, curr: DeliverySystem) => {
      return acc + parseFloat(curr.GreaterThanSixtyFour || "0");
    },
    0
  );

  // Check for validation errors
  const has21To64ZeroError = total21To64Percent === 0;
  const has21To64TotalError =
    (total21To64Percent < 99 || total21To64Percent > 101) &&
    total21To64Percent !== 0;
  const has65PlusTotalError =
    (total65PlusPercent < 99 || total65PlusPercent > 101) &&
    total65PlusPercent !== 0;

  if (has21To64ZeroError) {
    const label = featuresByYear.lessSpecificQualifierValidationLanguage
      ? "Entries for Adults Under Age 65 column must have values"
      : "Entries for Ages 21 to 64 column must have values";
    errorArray.push({
      errorLocation: "Delivery System",
      errorMessage: label,
    });
  }

  if (featuresByYear.lessSpecificQualifierValidationLanguage) {
    // For 2025, show one generic message if any validation fails
    if (has21To64TotalError || has65PlusTotalError) {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for column must total 100",
      });
    }
  } else {
    // For other years, show specific messages for each validation
    if (has21To64TotalError) {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for Ages 21 to 64 column must total 100",
      });
    }
    if (has65PlusTotalError) {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for Age 65 and Older column must total 100",
      });
    }
  }

  return errorArray.length > 0 ? errorArray : [];
};

export const ACSM = [validate21To64EqualsToOneHundredPercent];
