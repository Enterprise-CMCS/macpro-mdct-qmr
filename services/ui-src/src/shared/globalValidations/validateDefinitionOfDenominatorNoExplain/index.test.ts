import * as DC from "dataConstants";
import { testFormData } from "./../testHelpers/_testFormData";
import { validateDefinitionOfDenominatorNoExplain } from ".";

describe("validateDefinitionOfDenominatorNoExplain", () => {
  let formData: any;

  const expectedError = {
    errorLocation: "Denominator Includes Total Measure-Eligible Population",
    errorMessage:
      "Complete the additional fields to explain which populations are excluded and why and, if possible, estimate the size of the excluded measure-eligible population.",
  };

  const setValues = (
    totalTechSpec: string,
    explanation: string,
    excludedPopSize: string
  ) => {
    formData[DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC] = totalTechSpec;
    formData[DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC_NO_EXPLAIN] = explanation;
    formData[DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC_NO_SIZE] = excludedPopSize;
  };

  beforeEach(() => {
    formData = JSON.parse(JSON.stringify(testFormData));
  });

  it("returns no errors when total tech spec is yes", () => {
    setValues(DC.YES, "", "");
    expect(validateDefinitionOfDenominatorNoExplain(formData)).toEqual([]);
  });

  it("returns no errors when total tech spec is no and explanation is filled", () => {
    setValues(DC.NO, "Population A is excluded due to missing claims", "123");
    expect(validateDefinitionOfDenominatorNoExplain(formData)).toEqual([]);
  });

  it("returns no errors when total tech spec is no and excluded population size is blank", () => {
    setValues(DC.NO, "Population A is excluded due to missing claims", "");
    expect(validateDefinitionOfDenominatorNoExplain(formData)).toEqual([]);
  });

  it("returns an error when explanation is blank", () => {
    setValues(DC.NO, "", "123");
    expect(validateDefinitionOfDenominatorNoExplain(formData)).toEqual([
      expectedError,
    ]);
  });
});
