import { HHCS } from "./healthHome";
import { qualifierBaseData } from "utils/testUtils/testFormData";
import { getMeasureYear } from "utils/getMeasureYear";

jest.mock("utils/getMeasureYear", () => ({
  getMeasureYear: jest.fn(),
}));

const adminDataError = {
  numberOfAdults: "2",
  minAgeOfAdults: "",
  numberOfChildren: "3",
  maxAgeChildren: "",
  numberOfIndividuals: "2",
  numberOfProviders: "6",
};

const percentageEnrolledDataError = [
  {
    label: "Fee-for-Service",
    ZeroToSeventeen: "3",
    EighteenToSixtyFour: "4",
    GreaterThanSixtyFive: "23",
  },
];

describe("Test Health Home Qualifier validations", () => {
  describe("Test validateEqualsToOneHundredPercent", () => {
    it("There are no errors when data is good", () => {
      qualifierBaseData.AdministrativeData = {
        numberOfAdults: "2",
        minAgeOfAdults: "18",
        numberOfChildren: "4",
        maxAgeChildren: "15",
        numberOfIndividuals: "6",
        numberOfProviders: "2",
      };
      const validation = HHCS[0](qualifierBaseData);
      expect(validation).toStrictEqual([]);
    });
    it("There is an error when data does not add up correctly", () => {
      qualifierBaseData.PercentageEnrolledInEachDeliverySystem =
        percentageEnrolledDataError;
      const validation = HHCS[0](qualifierBaseData);
      expect(validation).toStrictEqual([
        {
          errorLocation: "Delivery System",
          errorMessage: "Entries for Ages 0 to 17 column must total 100",
        },
        {
          errorLocation: "Delivery System",
          errorMessage: "Entries for Ages 18 to 64 column must total 100",
        },
        {
          errorLocation: "Delivery System",
          errorMessage: "Entries for Age 65 and Older column must total 100",
        },
      ]);
    });
    it("Test when lessSpecificQualifierValidationLanguage is true", () => {
      (getMeasureYear as jest.Mock).mockReturnValue(2025);
      qualifierBaseData.PercentageEnrolledInEachDeliverySystem =
        percentageEnrolledDataError;
      const validation = HHCS[0](qualifierBaseData);
      expect(validation).toStrictEqual([
        {
          errorLocation: "Delivery System",
          errorMessage: "Entries for column must total 100",
        },
      ]);
    });
  });
  describe("Test validateTotalNumberOfIndividuals", () => {
    it("There are no errors when data is good", () => {
      const validation = HHCS[1](qualifierBaseData);
      expect(validation).toStrictEqual([]);
    });
    it("There is an error when data does not add up correctly", () => {
      qualifierBaseData.AdministrativeData = adminDataError;
      const validation = HHCS[1](qualifierBaseData);
      expect(validation).toStrictEqual([
        {
          errorLocation: "Administrative Questions",
          errorMessage:
            "The sum of adults and children did not equal total individuals",
        },
      ]);
    });
  });
});
