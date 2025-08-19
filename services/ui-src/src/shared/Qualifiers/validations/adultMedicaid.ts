import {
  ACSMQualifierForm,
  DeliverySystem,
} from "../../types/TypeQualifierForm";

const validate21To64EqualsToOneHundredPercent = (data: ACSMQualifierForm) => {
  const values = data["PercentageEnrolledInEachDeliverySystem"];
  const errorArray: any[] = [];

  // Calculate totals for both age groups
  const totals = {
    TwentyOneToSixtyFour:
      values?.reduce(
        (acc: number, curr: DeliverySystem) =>
          acc + parseFloat(curr.TwentyOneToSixtyFour || "0"),
        0
      ) || 0,
    GreaterThanSixtyFour:
      values?.reduce(
        (acc: number, curr: DeliverySystem) =>
          acc + parseFloat(curr.GreaterThanSixtyFour || "0"),
        0
      ) || 0,
  };

  // Special validation: Ages 21-64 must have values
  if (totals.TwentyOneToSixtyFour === 0) {
    errorArray.push({
      errorLocation: "Delivery System",
      errorMessage: "Entries for Ages 21 to 64 column must have values",
    });
  }

  // Percentage validation for both age groups
  const hasInvalidPercentage = Object.values(totals).some(
    (total) => (total < 99 || total > 101) && total !== 0
  );

  if (hasInvalidPercentage) {
    errorArray.push({
      errorLocation: "Delivery System",
      errorMessage: "Entries for column must total 100",
    });
  }

  return errorArray;
};

export const ACSM = [validate21To64EqualsToOneHundredPercent];
