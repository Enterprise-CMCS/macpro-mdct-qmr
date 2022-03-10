import { ACSQualifierForm } from "./types";
import { DeliverySystem } from "./types";

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

  if (total21To64Percent === 0 || total64PlusPercent === 0) {
    errorArray.push({
      errorLocation: "Delivery System",
      errorMessage: "Entries for each age group's column must have values",
    });
  }
  if (
    total21To64Percent < 99 ||
    total21To64Percent > 101 ||
    total64PlusPercent < 99 ||
    total64PlusPercent > 101
  ) {
    errorArray.push({
      errorLocation: "Delivery System",
      errorMessage: "Entries for each age group's column must total 100",
    });
  }
  return errorArray.length ? errorArray : [];
};

export const validationFunctions = [validate21To64EqualsToOneHundredPercent];
