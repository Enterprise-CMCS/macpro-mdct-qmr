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

  if (total21To64Percent === 0) {
    errorArray.push({
      errorLocation: "Delivery System",
      errorMessage: "Entries for Ages 21 to 64 column must have values",
    });
  } else if (total21To64Percent < 99 || total21To64Percent > 101) {
    errorArray.push({
      errorLocation: "Delivery System",
      errorMessage: "Entries for Ages 21 to 64 column must total 100",
    });
  }
  return errorArray.length ? errorArray : [];
};

export const validationFunctions = [validate21To64EqualsToOneHundredPercent];
