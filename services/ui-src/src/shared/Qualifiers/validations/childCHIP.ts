import {
  CCSCQualifierForm,
  DeliverySystem,
} from "../../types/TypeQualifierForm";

const validate21To64EqualsToOneHundredPercent = (
  data: CCSCQualifierForm,
  year: number | undefined
) => {
  // Extract year from URL
  if (!year && typeof window !== "undefined") {
    const pathYear = window.location.pathname.match(/\/(\d{4})\//)?.[1];
    year = pathYear ? parseInt(pathYear) : undefined;
  }

  const values = data["PercentageEnrolledInEachDeliverySystem"];
  const errorArray: any[] = [];
  const totalUnder21CHIPPercent = values?.reduce(
    (acc: number, curr: DeliverySystem) => {
      return acc + parseFloat(curr.UnderTwentyOne || "0");
    },
    0
  );

  // Check for validation errors
  const hasZeroValueError = totalUnder21CHIPPercent === 0;
  const hasTotalError =
    totalUnder21CHIPPercent > 0 &&
    (totalUnder21CHIPPercent < 99 || totalUnder21CHIPPercent > 101);

  if (year === 2025) {
    // For 2025, show one generic message if any validation fails
    if (hasZeroValueError || hasTotalError) {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for column must total 100",
      });
    }
  } else {
    // For other years, show specific messages for each validation
    if (hasZeroValueError) {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for Under Age 21 CHIP are required.",
      });
    }
    if (hasTotalError) {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for Under Age 21 CHIP column must total 100",
      });
    }
  }

  return errorArray.length ? errorArray : [];
};

export const CCSC = [validate21To64EqualsToOneHundredPercent];
