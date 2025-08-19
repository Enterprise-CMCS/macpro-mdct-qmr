import {
  HHCSQualifierForm,
  DeliverySystem,
} from "../../types/TypeQualifierForm";

const validateEqualsToOneHundredPercent = (data: HHCSQualifierForm) => {
  const values = data["PercentageEnrolledInEachDeliverySystem"];
  const errorArray: any[] = [];

  // Calculate totals for all three age groups
  const totals = {
    ZeroToSeventeen:
      values?.reduce(
        (acc: number, curr: DeliverySystem) =>
          acc + parseFloat(curr.ZeroToSeventeen || "0"),
        0
      ) || 0,
    EighteenToSixtyFour:
      values?.reduce(
        (acc: number, curr: DeliverySystem) =>
          acc + parseFloat(curr.EighteenToSixtyFour || "0"),
        0
      ) || 0,
    GreaterThanSixtyFive:
      values?.reduce(
        (acc: number, curr: DeliverySystem) =>
          acc + parseFloat(curr.GreaterThanSixtyFive || "0"),
        0
      ) || 0,
  };

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

const validateTotalNumberOfIndividuals = (data: HHCSQualifierForm) => {
  const adults = parseInt(data.AdministrativeData.numberOfAdults) || 0;
  const children = parseInt(data.AdministrativeData.numberOfChildren) || 0;
  const totalIndividuals =
    parseInt(data.AdministrativeData.numberOfIndividuals) || 0;
  const errorArray: any[] = [];

  if (adults + children !== totalIndividuals) {
    errorArray.push({
      errorLocation: "Administrative Questions",
      errorMessage:
        "The sum of adults and children did not equal total individuals",
    });
  }

  return errorArray;
};

export const HHCS = [
  validateEqualsToOneHundredPercent,
  validateTotalNumberOfIndividuals,
];
