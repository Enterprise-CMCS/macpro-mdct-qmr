import * as DC from "dataConstants";
import * as HELP from "measures/2024/shared/globalValidations/testHelpers/_helper";
import { testFormData } from "measures/2024/shared/globalValidations/testHelpers/_testFormData";
import { DefaultFormData } from "shared/types/FormData";
import { validateAtLeastOneRateComplete } from ".";

/* Ensure that at least 1 NDR in a set is complete for either the Performance Measure or Other Performance Measure */
describe("atLeastOneRateComplete", () => {
  let formData: DefaultFormData;

  const _run_validation = (
    data: DefaultFormData,
    errorMessage?: string
  ): FormError[] => {
    const { ageGroups, performanceMeasureArray, OPM } = HELP.test_setup(data);
    return [
      ...validateAtLeastOneRateComplete(
        performanceMeasureArray,
        OPM,
        ageGroups,
        undefined,
        errorMessage
      ),
    ];
  };

  // Check that the provided Form Data returns a certain number of validation errors.
  const check_errors = (data: DefaultFormData, numErrors: number) => {
    const errorArray = _run_validation(data);
    expect(errorArray.length).toBe(numErrors);
  };

  beforeEach(() => {
    formData = JSON.parse(JSON.stringify(testFormData)); // reset data
  });

  it("when Peformance Measure is partially complete and OPM is partially complete", () => {
    check_errors(formData, 0);
  });

  it("when Performance Measure is undefined and OPM is undefined", () => {
    formData[DC.PERFORMANCE_MEASURE] = {};
    formData[DC.OPM_RATES] = [];
    check_errors(formData, 1);
  });

  it("when Peformance Measure is partially complete and OPM is undefined", () => {
    formData[DC.OPM_RATES] = [];
    check_errors(formData, 0);
  });

  it("when Performance Measure is undefined and OPM is partially complete", () => {
    delete formData[DC.PERFORMANCE_MEASURE];
    check_errors(formData, 0);
  });

  it("when Performance Measure is incomplete and OPM is incomplete", () => {
    HELP.zero_PM(formData);
    HELP.zero_OPM(formData);
    check_errors(formData, 1);
  });

  it("when Performance Measure is incomplete and OPM is undefined", () => {
    HELP.zero_PM(formData);
    formData[DC.OPM_RATES] = [];
    check_errors(formData, 1);
  });

  it("when Performance Measure is undefined and OPM is incomplete", () => {
    formData[DC.PERFORMANCE_MEASURE] = {};
    HELP.zero_OPM(formData);

    check_errors(formData, 1);
  });

  it("Error message text should match default errorMessage", () => {
    formData[DC.PERFORMANCE_MEASURE] = {};
    HELP.zero_OPM(formData);
    const errorArray = _run_validation(formData);
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(
      "At least one Performance Measure Numerator, Denominator, and Rate must be completed"
    );
  });

  it("Error message text should match provided errorMessage", () => {
    formData[DC.PERFORMANCE_MEASURE] = {};
    HELP.zero_OPM(formData);
    const errorMessage = "Another one bites the dust.";
    const errorArray = _run_validation(formData, errorMessage);
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(errorMessage);
  });
});
