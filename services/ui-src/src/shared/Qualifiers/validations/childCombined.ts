import {
  CCSQualifierForm,
  DeliverySystem,
} from "../../types/TypeQualifierForm";

const validate21To64EqualsToOneHundredPercent = (data: CCSQualifierForm) => {
  const values = data["PercentageEnrolledInEachDeliverySystem"];
  const errorArray: any[] = [];
  const totalUnder21MedicaidPercent = values?.reduce(
    (acc: number, curr: DeliverySystem) => {
      return acc + parseFloat(curr.UnderTwentyOneMedicaid || "0");
    },
    0
  );

  const totalUnder21CHIPPercent = values?.reduce(
    (acc: number, curr: DeliverySystem) => {
      return acc + parseFloat(curr.UnderTwentyOneCHIP || "0");
    },
    0
  );

  if (totalUnder21MedicaidPercent === 0 && totalUnder21CHIPPercent === 0) {
    errorArray.push({
      errorLocation: "Delivery System",
      errorMessage:
        "Entries are required in at least one column.  Entries are permitted in the second column but are not required",
    });
  }

  if (
    (totalUnder21MedicaidPercent > 0 && totalUnder21MedicaidPercent < 99) ||
    totalUnder21MedicaidPercent > 101
  ) {
    errorArray.push({
      errorLocation: "Delivery System",
      errorMessage: "Entries for Medicaid Under Age 21 column must total 100",
    });
  }

  if (
    totalUnder21CHIPPercent > 0 &&
    (totalUnder21CHIPPercent < 99 || totalUnder21CHIPPercent > 101)
  ) {
    errorArray.push({
      errorLocation: "Delivery System",
      errorMessage: "Entries for CHIP Under Age 21 column must total 100",
    });
  }
  return errorArray.length ? errorArray : [];
};

export const CCS = [validate21To64EqualsToOneHundredPercent];
