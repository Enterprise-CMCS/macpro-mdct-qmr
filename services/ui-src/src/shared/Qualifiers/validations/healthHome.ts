import { featuresByYear } from "utils/featuresByYear";
import {
  HHCSQualifierForm,
  DeliverySystem,
} from "../../types/TypeQualifierForm";

const validateEqualsToOneHundredPercent = (data: HHCSQualifierForm) => {
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

  // Check for validation errors
  const has0To17Error =
    (total0To17Percent < 99 || total0To17Percent > 101) &&
    total0To17Percent !== 0;
  const has18To64Error =
    (total18To64Percent < 99 || total18To64Percent > 101) &&
    total18To64Percent !== 0;
  const has65PlusError =
    (total65PlusPercent < 99 || total65PlusPercent > 101) &&
    total65PlusPercent !== 0;

  if (featuresByYear.lessSpecificQualifierValidationLanguage) {
    // For 2025, show one generic message if any validation fails
    if (has0To17Error || has18To64Error || has65PlusError) {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for column must total 100",
      });
    }
  } else {
    // For other years, show specific messages for each column
    if (has0To17Error) {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for Ages 0 to 17 column must total 100",
      });
    }
    if (has18To64Error) {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for Ages 18 to 64 column must total 100",
      });
    }
    if (has65PlusError) {
      errorArray.push({
        errorLocation: "Delivery System",
        errorMessage: "Entries for Age 65 and Older column must total 100",
      });
    }
  }

  return errorArray.length > 0 ? errorArray : [];
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

  return errorArray.length > 0 ? errorArray : [];
};

export const HHCS = [
  validateEqualsToOneHundredPercent,
  validateTotalNumberOfIndividuals,
];
