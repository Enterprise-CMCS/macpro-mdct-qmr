import { testFormData } from "./../testHelpers/_testFormData";
import * as DC from "dataConstants";
import { validateAtLeastOneDefinitionOfPopulation } from ".";
import { FormError } from "error";

describe("validateAtLeastOneDefinitionOfPopulation", () => {
  let formData: any;
  let errorArray: FormError[];

  const _check_errors = (data: any, numErrors: number) => {
    errorArray = [...validateAtLeastOneDefinitionOfPopulation(data)];
    expect(errorArray.length).toBe(numErrors);
  };

  beforeEach(() => {
    formData = JSON.parse(JSON.stringify(testFormData)); // reset data
    errorArray = [];
  });

  it("When no Definition of Population is Selected a validation warning shows", () => {
    formData[DC.DEFINITION_OF_DENOMINATOR] = [];
    _check_errors(formData, 1);
  });

  it("When a Definition of Population is Selected no validation warning shows", () => {
    formData[DC.DEFINITION_OF_DENOMINATOR] = [DC.DENOMINATOR_INC_MEDICAID_POP];
    _check_errors(formData, 0);
  });

  it("Error message text should match default errorMessage", () => {
    formData[DC.DEFINITION_OF_DENOMINATOR] = [];
    errorArray = [...validateAtLeastOneDefinitionOfPopulation(formData)];
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(
      "You must select at least one definition of population option"
    );
  });

  it("Error message text should match provided errorMessage", () => {
    formData[DC.DEFINITION_OF_DENOMINATOR] = [];
    const errorMessage = "Another one bites the dust.";
    errorArray = [
      ...validateAtLeastOneDefinitionOfPopulation(formData, errorMessage),
    ];
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(errorMessage);
  });
});
