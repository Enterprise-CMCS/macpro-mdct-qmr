import { validationFunctions } from "./validation";

describe("Test CPA-AD Validation", () => {
  it('Test for error response when "Did you collect this measure" is undefined', () => {
    const validation = validationFunctions[0];
    const errors = validation({ DidCollect: undefined } as any);
    expect(errors).toStrictEqual([
      {
        errorLocation: "Did you collect this measure",
        errorMessage:
          "You must select at least one option for Did you collect this measure?",
      },
    ]);
  });
  it('Test for error response when "Did you collect this measure" is no and whyNotReporting is empty', () => {
    const validation = validationFunctions[0];
    const errors = validation({ DidCollect: "no" } as any);
    expect(errors).toStrictEqual([
      {
        errorLocation: "Why Are You Not Collecting On This Measure",
        errorMessage:
          "You must select at least one reason for not collecting on this measure",
      },
    ]);
  });
});
