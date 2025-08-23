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
    errorArray.push({
      errorLocation: "Delivery System",
      errorMessage: "Entries for Under Age 21 Medicaid are required.",
    });
  }

  const hasUnder21MedicaidTotalError =
    (totalUnder21MedicaidPercent > 0 && totalUnder21MedicaidPercent < 99) ||
    totalUnder21MedicaidPercent > 101;

  if (hasUnder21MedicaidTotalError)
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

  return errorArray.length ? errorArray : [];
};

export const CCSM = [validate21To64EqualsToOneHundredPercent];
