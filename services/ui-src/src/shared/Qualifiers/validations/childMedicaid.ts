import {
  CCSMQualifierForm,
  DeliverySystem,
} from "../../types/TypeQualifierForm";

const validate21To64EqualsToOneHundredPercent = (
  data: CCSMQualifierForm,
  year: number | undefined
) => {
  // Extract year from URL
  if (!year && typeof window !== "undefined") {
    const pathYear = window.location.pathname.match(/\/(\d{4})\//)?.[1];
    year = pathYear ? parseInt(pathYear) : undefined;
  }

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

  if (
    totalUnder21MedicaidPercent > 0 &&
    (totalUnder21MedicaidPercent < 99 || totalUnder21MedicaidPercent > 101)
  ) {
    errorArray.push({
      errorLocation: "Delivery System",
      errorMessage:
        year === 2025
          ? "Entries for column must total 100"
          : "Entries for Under Age 21 Medicaid column must total 100",
    });
  }
  return errorArray.length ? errorArray : [];
};

export const CCSM = [validate21To64EqualsToOneHundredPercent];
