import {
  ACSMQualifierForm,
  DeliverySystem,
} from "../../types/TypeQualifierForm";

const validate21To64EqualsToOneHundredPercent = (
  data: ACSMQualifierForm,
  year: number | undefined
) => {
  // Extract year from URL
  if (!year && typeof window !== "undefined") {
    const pathYear = window.location.pathname.match(/\/(\d{4})\//)?.[1];
    year = pathYear ? parseInt(pathYear) : undefined;
  }

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

  // Check for validation errors
  const has21To64ZeroError = total21To64Percent === 0;
  const has21To64TotalError =
    (total21To64Percent < 99 || total21To64Percent > 101) &&
    total21To64Percent !== 0;
  const has64PlusTotalError =
    (total64PlusPercent < 99 || total64PlusPercent > 101) &&
    total64PlusPercent !== 0;

  if (year === 2025) {
    // For 2025, show only one error message
    if (has21To64ZeroError || has21To64TotalError || has64PlusTotalError) {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for column must total 100",
      });
    }
  } else {
    // For other years, show specific messages for each validation
    if (has21To64ZeroError) {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for Ages 21 to 64 column must have values",
      });
    }
    if (has21To64TotalError) {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for Ages 21 to 64 column must total 100",
      });
    }
    if (has64PlusTotalError) {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for Age 65 and Older column must total 100",
      });
    }
  }

  return errorArray.length ? errorArray : [];
};

export const ACSM = [validate21To64EqualsToOneHundredPercent];
