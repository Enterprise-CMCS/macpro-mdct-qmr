import { testFormData } from "./../testHelpers/_testFormData";
import * as DC from "dataConstants";
import { validateDateRangeRadioButtonCompletion } from ".";
import { FormError } from "error";

describe("validateDateRangeRadioButtonCompletion", () => {
  let formData: any;
  let errorArray: FormError[];

  const _check_errors = (data: any, numErrors: number) => {
    errorArray = [...validateDateRangeRadioButtonCompletion(data)];
    expect(errorArray.length).toBe(numErrors);
  };

  beforeEach(() => {
    formData = JSON.parse(JSON.stringify(testFormData)); // reset data
    errorArray = [];
  });

  it("When no date range radio button is selected a validation warning shows", () => {
    delete formData[DC.MEASUREMENT_PERIOD_CORE_SET];
    _check_errors(formData, 1);
  });

  it("Error message text should match default errorMessage", () => {
    delete formData[DC.MEASUREMENT_PERIOD_CORE_SET];
    errorArray = [...validateDateRangeRadioButtonCompletion(formData)];
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(
      "Date Range answer must be selected"
    );
  });

  it("Error message text should match provided errorMessage", () => {
    delete formData[DC.MEASUREMENT_PERIOD_CORE_SET];
    const errorMessage = "Another one bites the dust.";
    errorArray = [
      ...validateDateRangeRadioButtonCompletion(formData, errorMessage),
    ];
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(errorMessage);
  });
});
