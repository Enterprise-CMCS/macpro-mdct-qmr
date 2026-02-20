import { featuresByYear } from "utils/featuresByYear";
import {
  CCSMQualifierForm,
  DeliverySystem,
} from "../../types/TypeQualifierForm";

const validate21To64EqualsToOneHundredPercent = (data: CCSMQualifierForm) => {
  const values = data["PercentageEnrolledInEachDeliverySystem"];
  const errorArray: any[] = [];

  const totalUnder21MedicaidPercent = values?.reduce(
    (acc: number, curr: DeliverySystem) => {
      return acc + parseFloat(curr.UnderTwentyOne || "0");
    },
    0
  );

  if (totalUnder21MedicaidPercent === 0) {
    const label = featuresByYear.lessSpecificQualifierValidationLanguage
      ? "Entries for column must have values"
      : "Entries for Under Age 21 CHIP are required.";
    errorArray.push({
      errorLocation: "Delivery System",
      errorMessage: label,
    });
  }

  const hasUnder21MedicaidTotal100Error =
    (totalUnder21MedicaidPercent > 0 && totalUnder21MedicaidPercent < 99) ||
    totalUnder21MedicaidPercent > 101;

  if (hasUnder21MedicaidTotal100Error)
    if (featuresByYear.lessSpecificQualifierValidationLanguage) {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for column must total 100",
      });
    } else {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for Under Age 21 Medicaid column must total 100",
      });
    }

  return errorArray.length > 0 ? errorArray : [];
};

export const CCSM = [validate21To64EqualsToOneHundredPercent];
