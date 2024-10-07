import * as DC from "dataConstants";
import { test_setup } from "./../testHelpers/_helper";
import { testFormData } from "./../testHelpers/_testFormData";
import { validateRequiredRadioButtonForCombinedRates } from ".";

describe("validateRequiredRadioButtonForCombinedRates", () => {
  let formData: any;
  let errorArray: FormError[];

  const _check_errors = (data: any, numErrors: number) => {
    const { ageGroups, performanceMeasureArray, OPM } = test_setup(data);
    ageGroups;
    performanceMeasureArray;
    OPM;

    errorArray = [...validateRequiredRadioButtonForCombinedRates(data)];
    expect(errorArray.length).toBe(numErrors);
  };

  beforeEach(() => {
    formData = { ...testFormData };
    errorArray = [];
  });

  it("Default form data", () => {
    _check_errors(formData, 0);
  });

  it("No error if combined rate not checked", () => {
    delete formData[DC.COMBINED_RATES];
    _check_errors(formData, 0);
  });

  it("Should throw error for missing field", () => {
    delete formData[DC.COMBINED_RATES_COMBINED_RATES];
    _check_errors(formData, 1);
  });

  it("Error message text should match provided errorMessage", () => {
    const errorMessage = "Another one bites the dust";
    delete formData[DC.COMBINED_RATES_COMBINED_RATES];
    errorArray = [
      ...validateRequiredRadioButtonForCombinedRates(formData, errorMessage),
    ];
    expect(errorArray[0].errorMessage).toBe(errorMessage);
  });
});
