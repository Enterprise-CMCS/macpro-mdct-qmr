import {
  CCSCQualifierForm,
  DeliverySystem,
} from "../../types/TypeQualifierForm";

const validate21To64EqualsToOneHundredPercent = (data: CCSCQualifierForm) => {
  const values = data["PercentageEnrolledInEachDeliverySystem"];
  const errorArray: any[] = [];

  const totalUnder21CHIPPercent = values?.reduce(
    (acc: number, curr: DeliverySystem) => {
      return acc + parseFloat(curr.UnderTwentyOne || "0");
    },
    0
  );
  if (totalUnder21CHIPPercent === 0) {
    errorArray.push({
      errorLocation: "Delivery System",
      errorMessage: "Entries for Under Age 21 CHIP are required.",
    });
  }

  if (
    totalUnder21CHIPPercent > 0 &&
    (totalUnder21CHIPPercent < 99 || totalUnder21CHIPPercent > 101)
  ) {
    errorArray.push({
      errorLocation: "Delivery System",
      errorMessage: "Entries for Under Age 21 CHIP column must total 100",
    });
  }
  return errorArray.length ? errorArray : [];
};

export const CCSC = [validate21To64EqualsToOneHundredPercent];
