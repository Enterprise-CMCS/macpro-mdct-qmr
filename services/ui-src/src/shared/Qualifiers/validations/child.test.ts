import { CCS } from "./child";
import { qualifierBaseData } from "utils/testUtils/testFormData";
import { getMeasureYear } from "utils/getMeasureYear";

jest.mock("utils/getMeasureYear", () => ({
  getMeasureYear: jest.fn(),
}));

describe("Test Child Qualifier validation", () => {
  it("Test validate21To64EqualsToOneHundredPercent validation", () => {
    const validation = CCS[0](qualifierBaseData);
    expect(validation).toStrictEqual([
      {
        errorLocation: "Delivery System",
        errorMessage:
          "Entries are required in at least one column. Entries are permitted in the second column but are not required",
      },
    ]);
  });

  it("Test validate21To64EqualsToOneHundredPercent validation when values does not total 100", () => {
    (getMeasureYear as jest.Mock).mockReturnValue(2023);
    qualifierBaseData.PercentageEnrolledInEachDeliverySystem = [
      {
        label: "Fee-for-Service",
        UnderTwentyOneMedicaid: "22",
        UnderTwentyOneCHIP: "33",
      },
    ];
    const validation = CCS[0](qualifierBaseData);
    expect(validation).toStrictEqual([
      {
        errorLocation: "Delivery System",
        errorMessage: "Entries for Medicaid Under Age 21 column must total 100",
      },
      {
        errorLocation: "Delivery System",
        errorMessage: "Entries for CHIP Under Age 21 column must total 100",
      },
    ]);
  });
  it("Test validate21To64EqualsToOneHundredPercent validation with lessSpecificQualifierValidationLanguage", () => {
    (getMeasureYear as jest.Mock).mockReturnValue(2025);
    qualifierBaseData.PercentageEnrolledInEachDeliverySystem = [
      {
        label: "Fee-for-Service",
        UnderTwentyOneMedicaid: "22",
      },
    ];
    const validation = CCS[0](qualifierBaseData);
    expect(validation).toStrictEqual([
      {
        errorLocation: "Delivery System",
        errorMessage: "Entries for column must total 100",
      },
    ]);
  });
});
