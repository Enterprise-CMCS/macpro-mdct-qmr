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

  const total64PlusPercent = values?.reduce(
    (acc: number, curr: DeliverySystem) => {
      return acc + parseFloat(curr.GreaterThanSixtyFour || "0");
    },
    0
  );

  // Check for validation errors
  const has21To64Error =
    (total21To64Percent < 99 || total21To64Percent > 101) &&
    total21To64Percent !== 0;
  const has64Plus4Error =
    (total64PlusPercent < 99 || total64PlusPercent > 101) &&
    total64PlusPercent !== 0;

  if (total21To64Percent === 0) {
    errorArray.push({
      errorLocation: "Delivery System",
      errorMessage: "Entries for Ages 21 to 64 column must have values",
    });
  }

  // For 2025, show one generic message if any validation fails
  if (featuresByYear.lessSpecificQualifierValidationLanguage) {
    if (has21To64Error || has64Plus4Error) {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for column must total 100",
      });
    }
  } else {
    // For other years, show specific messages for each validation
    if (
      (total21To64Percent < 99 || total21To64Percent > 101) &&
      total21To64Percent !== 0
    ) {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for Ages 21 to 64 column must total 100",
      });
    }
    if (
      (total64PlusPercent < 99 || total64PlusPercent > 101) &&
      total64PlusPercent !== 0
    ) {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for Age 65 and Older column must total 100",
      });
    }
  }

  return errorArray.length ? errorArray : [];
};

export const ACS = [validate21To64EqualsToOneHundredPercent];
