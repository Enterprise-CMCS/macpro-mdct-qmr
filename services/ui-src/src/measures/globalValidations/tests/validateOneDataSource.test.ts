import { testFormData } from "./_testFormData";
import * as DC from "dataConstants";
import { validateOneDataSource } from "measures/globalValidations";

describe("validateOneDataSource", () => {
  let formData: any;
  let errorArray: FormError[];

  const _check_errors = (data: any, numErrors: number) => {
    errorArray = [...validateOneDataSource(data)];
    expect(errorArray.length).toBe(numErrors);
  };

  beforeEach(() => {
    formData = JSON.parse(JSON.stringify(testFormData)); // reset data
    errorArray = [];
  });

  test("When no Data Source is Selected a validation warning shows", () => {
    formData[DC.DATA_SOURCE] = [];
    formData[DC.DATA_SOURCE_SELECTIONS] = {};
    _check_errors(formData, 1);
  });

  test("When a Data Source is Selected no validation warning shows", () => {
    formData[DC.DATA_SOURCE_SELECTIONS] = {};
    _check_errors(formData, 0);
  });
  //This scenario below is actually impossible from a ui perspective I believe
  test("When no Data Source but Data Source Selections are Selected a validation warning shows", () => {
    formData[DC.DATA_SOURCE] = [];
    _check_errors(formData, 1);
  });
});
