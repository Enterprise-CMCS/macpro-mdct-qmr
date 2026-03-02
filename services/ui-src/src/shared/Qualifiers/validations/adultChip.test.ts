import { ACSC } from "./adultChip";
import { qualifierBaseData } from "utils/testUtils/testFormData";
import { getMeasureYear } from "utils/getMeasureYear";

jest.mock("utils/getMeasureYear", () => ({
  getMeasureYear: jest.fn(),
}));

describe("Test Adult Qualifier validation", () => {
  it("Test validate21To64EqualsToOneHundredPercent validation when no value has been entered", () => {
    (getMeasureYear as jest.Mock).mockReturnValue(2023);
    const validation = ACSC[0](qualifierBaseData);
    expect(validation).toStrictEqual([
      {
        errorLocation: "Delivery System",
        errorMessage: "Entries for Ages 21 to 64 column must have values",
      },
    ]);
  });
  it("Test validate21To64EqualsToOneHundredPercent validation when values does not total 100", () => {
    (getMeasureYear as jest.Mock).mockReturnValue(2023);
    qualifierBaseData.PercentageEnrolledInEachDeliverySystem = [
      {
        label: "Fee-for-Service",
        TwentyOneToSixtyFour: "22",
      },
    ];
    const validation = ACSC[0](qualifierBaseData);
    expect(validation).toStrictEqual([
      {
        errorLocation: "Delivery System",
        errorMessage: "Entries for Ages 21 to 64 column must total 100",
      },
    ]);
  });
  it("Test validate21To64EqualsToOneHundredPercent validation with lessSpecificQualifierValidationLanguage", () => {
    (getMeasureYear as jest.Mock).mockReturnValue(2025);
    qualifierBaseData.PercentageEnrolledInEachDeliverySystem = [
      {
        label: "Fee-for-Service",
        TwentyOneToSixtyFour: "22",
      },
    ];

    const validation = ACSC[0](qualifierBaseData);
    expect(validation).toStrictEqual([
      {
        errorLocation: "Delivery System",
        errorMessage: "Entries for column must total 100",
      },
    ]);
  });
});
