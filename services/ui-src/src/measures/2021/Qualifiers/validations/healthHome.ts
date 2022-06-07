import { HHCSQualifierForm, DeliverySystem } from "../types";

const validate0To64EqualsToOneHundredPercent = (data: HHCSQualifierForm) => {
  const values = data["PercentageEnrolledInEachDeliverySystem"];
  const errorArray: any[] = [];
  const total0To17Percent = values?.reduce(
    (acc: number, curr: DeliverySystem) => {
      return acc + parseFloat(curr.ZeroToSeventeen || "0");
    },
    0
  );

  const total18To64Percent = values?.reduce(
    (acc: number, curr: DeliverySystem) => {
      return acc + parseFloat(curr.EighteenToSixtyFour || "0");
    },
    0
  );

  const total65PlusPercent = values?.reduce(
    (acc: number, curr: DeliverySystem) => {
      return acc + parseFloat(curr.GreaterThanSixtyFive || "0");
    },
    0
  );
  if (
    (total0To17Percent < 99 || total0To17Percent > 101) &&
    total0To17Percent !== 0
  ) {
    errorArray.push({
      errorLocation: "Delivery System",
      errorMessage: "Entries for Ages 0 to 17 column must total 100",
    });
  }
  if (
    (total18To64Percent < 99 || total18To64Percent > 101) &&
    total18To64Percent !== 0
  ) {
    errorArray.push({
      errorLocation: "Delivery System",
      errorMessage: "Entries for Ages 18 to 64 column must total 100",
    });
  }

  if (
    (total65PlusPercent < 99 || total65PlusPercent > 101) &&
    total65PlusPercent !== 0
  ) {
    errorArray.push({
      errorLocation: "Delivery System",
      errorMessage: "Entries for Age 65 and Older column must total 100",
    });
  }

  return errorArray.length ? errorArray : [];
};

export const HHCS = [validate0To64EqualsToOneHundredPercent];
