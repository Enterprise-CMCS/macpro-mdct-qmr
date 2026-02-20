import { featuresByYear } from "utils/featuresByYear";
import {
  ACSQualifierForm,
  DeliverySystem,
} from "../../types/TypeQualifierForm";

const validate21To64EqualsToOneHundredPercent = (data: ACSQualifierForm) => {
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
  const has21To64Total100Error =
    (total21To64Percent < 99 || total21To64Percent > 101) &&
    total21To64Percent !== 0;
  const has65PlusTotal100Error =
    (total65PlusPercent < 99 || total65PlusPercent > 101) &&
    total65PlusPercent !== 0;

  if (total21To64Percent === 0) {
    const label = featuresByYear.lessSpecificQualifierValidationLanguage
      ? "Entries for Adults Under Age 65 column must have values"
      : "Entries for Ages 21 to 64 column must have values";
    errorArray.push({
      errorLocation: "Delivery System",
      errorMessage: label,
    });
  }

  // For 2025, show one generic message if any validation fails
  if (featuresByYear.lessSpecificQualifierValidationLanguage) {
    if (has21To64Total100Error || has65PlusTotal100Error) {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for column must total 100",
      });
    }
  } else {
    // For other years, show specific messages for each validation
    if (has21To64Total100Error) {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for Ages 21 to 64 column must total 100",
      });
    }
    if (has65PlusTotal100Error) {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for Age 65 and Older column must total 100",
      });
    }
  }

  return errorArray.length > 0 ? errorArray : [];
};

export const ACS = [validate21To64EqualsToOneHundredPercent];
