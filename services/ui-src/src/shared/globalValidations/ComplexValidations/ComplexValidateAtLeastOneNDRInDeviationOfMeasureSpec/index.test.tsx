import { ComplexValidateAtLeastOneNDRInDeviationOfMeasureSpec } from ".";

const pmArr = [
  [{ fields: [{ uid: "mockid", value: "2", label: "mock-label" }] }],
];
const ndrFormula = [
  {
    numerator: 0,
    denominator: 0,
    rateIndex: 0,
    mult: 1000,
  },
];
const deviationArray = [{}];

describe("Test ComplexValidateAtLeastOneNDRInDeviationOfMeasureSpec validation", () => {
  it("no errors is returned", () => {
    const errors = ComplexValidateAtLeastOneNDRInDeviationOfMeasureSpec(
      pmArr,
      [],
      [],
      true
    );
    expect(errors).toStrictEqual([]);
  });
  it("an error message is returned", () => {
    const errors = ComplexValidateAtLeastOneNDRInDeviationOfMeasureSpec(
      pmArr,
      ndrFormula,
      deviationArray,
      true
    );
    expect(errors).toStrictEqual([
      {
        errorLocation: "Deviations from Measure Specifications",
        errorMessage:
          "At least one item must be selected and completed (Numerator, Denominator, or Other)",
      },
    ]);
  });
});
