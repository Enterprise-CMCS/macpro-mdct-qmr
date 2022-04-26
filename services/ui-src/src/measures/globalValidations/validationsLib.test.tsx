import * as GV from "measures/globalValidations";

describe("Testing Global Validations Lib", () => {
  const performanceMeasuresWithOneNDR = [
    [{ label: "Ages 18 to 64", numerator: "3", denominator: "3", rate: "100" }],
  ];

  test("validate at least one NDR in Deviation of Measure Specification", () => {
    const atLeastOneDeviationNDRNotComplete =
      GV.validateAtLeastOneNDRInDeviationOfMeasureSpec(
        performanceMeasuresWithOneNDR,
        ["Ages 18 to 64"],
        [{ RateDeviationsSelected: [] }],
        true
      );
    const atLeastOneDeviationNDRCompleted =
      GV.validateAtLeastOneNDRInDeviationOfMeasureSpec(
        performanceMeasuresWithOneNDR,
        ["Ages 18 to 64"],
        [{ RateDeviationsSelected: ["numerator"], numerator: "3" }],
        true
      );

    expect(atLeastOneDeviationNDRNotComplete).toHaveLength(1);
    expect(atLeastOneDeviationNDRCompleted).toHaveLength(0);
  });
});
