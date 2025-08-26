import { featuresByYear } from "utils/featuresByYear";
import {
  ACSCQualifierForm,
  DeliverySystem,
} from "../../types/TypeQualifierForm";

const validate21To64EqualsToOneHundredPercent = (data: ACSCQualifierForm) => {
  const values = data["PercentageEnrolledInEachDeliverySystem"];
  const errorArray: any[] = [];
  const total21To64Percent = values?.reduce(
    (acc: number, curr: DeliverySystem) => {
      return acc + parseFloat(curr.TwentyOneToSixtyFour || "0");
    },
    0
  );

  if (total21To64Percent === 0) {
    const label = featuresByYear.lessSpecificQualifierValidationLanguage
      ? "Entries for column must have values"
      : "Entries for Ages 21 to 64 column must have values";
    errorArray.push({
      errorLocation: "Delivery System",
      errorMessage: label,
    });
  }
  if (
    (total21To64Percent < 99 || total21To64Percent > 101) &&
    total21To64Percent !== 0
  ) {
    if (featuresByYear.lessSpecificQualifierValidationLanguage) {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for column must total 100",
      });
    } else {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for Ages 21 to 64 column must total 100",
      });
    }
  }

  return errorArray.length ? errorArray : [];
};

export const ACSC = [validate21To64EqualsToOneHundredPercent];
