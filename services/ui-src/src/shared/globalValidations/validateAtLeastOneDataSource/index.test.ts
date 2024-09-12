import * as DC from "dataConstants";
import { validateAtLeastOneDataSource } from ".";
import { testFormData } from "measures/2024/shared/globalValidations/testHelpers/_testFormData";

describe("validateOneDataSource", () => {
  let formData: any;
  let errorArray: FormError[];

  const _check_errors = (data: any, numErrors: number) => {
    errorArray = [...validateAtLeastOneDataSource(data)];
    expect(errorArray.length).toBe(numErrors);
  };

  beforeEach(() => {
    formData = JSON.parse(JSON.stringify(testFormData)); // reset data
    errorArray = [];
  });

  it("When no Data Source is Selected a validation warning shows", () => {
    formData[DC.DATA_SOURCE] = [];
    formData[DC.DATA_SOURCE_SELECTIONS] = {};
    _check_errors(formData, 1);
  });

  it("When a Data Source is Selected no validation warning shows", () => {
    formData[DC.DATA_SOURCE_SELECTIONS] = {};
    _check_errors(formData, 0);
  });
  //This scenario below is actually impossible from a ui perspective I believe
  it("When no Data Source but Data Source Selections are Selected a validation warning shows", () => {
    formData[DC.DATA_SOURCE] = [];
    _check_errors(formData, 1);
  });

  it("Error message text should match default errorMessage", () => {
    formData[DC.DATA_SOURCE] = [];
    errorArray = [...validateAtLeastOneDataSource(formData)];
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(
      "You must select at least one Data Source option"
    );
  });

  it("Error message text should match provided errorMessage", () => {
    formData[DC.DATA_SOURCE] = [];
    const errorMessage = "Another one bites the dust.";
    errorArray = [...validateAtLeastOneDataSource(formData, errorMessage)];
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(errorMessage);
  });
});
