import { CCSC } from "./childCHIP";
import { qualifierBaseData } from "utils/testUtils/testFormData";
import { getMeasureYear } from "utils/getMeasureYear";

jest.mock("utils/getMeasureYear", () => ({
  getMeasureYear: jest.fn(),
}));

describe("Test Child Qualifier validation", () => {
  it("Test validate21To64EqualsToOneHundredPercent validation", () => {
    const validation = CCSC[0](qualifierBaseData);
    expect(validation).toStrictEqual([
      {
        errorLocation: "Delivery System",
        errorMessage: "Entries for Under Age 21 CHIP are required.",
      },
    ]);
  });
  it("Test validate21To64EqualsToOneHundredPercent validation when values does not total 100", () => {
    (getMeasureYear as jest.Mock).mockReturnValue(2023);
    qualifierBaseData.PercentageEnrolledInEachDeliverySystem = [
      {
        label: "Fee-for-Service",
        UnderTwentyOne: "22",
      },
    ];
    const validation = CCSC[0](qualifierBaseData);
    expect(validation).toStrictEqual([
      {
        errorLocation: "Delivery System",
        errorMessage: "Entries for Under Age 21 CHIP column must total 100",
      },
    ]);
  });
  it("Test validate21To64EqualsToOneHundredPercent validation with lessSpecificQualifierValidationLanguage", () => {
    (getMeasureYear as jest.Mock).mockReturnValue(2025);
    qualifierBaseData.PercentageEnrolledInEachDeliverySystem = [
      {
        label: "Fee-for-Service",
        UnderTwentyOne: "22",
      },
    ];
    const validation = CCSC[0](qualifierBaseData);
    expect(validation).toStrictEqual([
      {
        errorLocation: "Delivery System",
        errorMessage: "Entries for column must total 100",
      },
    ]);
  });
});
