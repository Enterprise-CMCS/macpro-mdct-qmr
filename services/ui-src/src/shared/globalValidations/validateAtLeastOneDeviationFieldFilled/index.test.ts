import * as DC from "dataConstants";
import { test_setup } from "measures/2022/shared/globalValidations/testHelpers/_helper";
import { testFormData } from "measures/2022/shared/globalValidations/testHelpers/_testFormData";
import { getDeviationNDRArray } from "measures/2022/shared/globalValidations";
import { validateAtLeastOneDeviationFieldFilled } from ".";

describe("validateAtLeastOneNDRInDeviationOfMeasureSpec", () => {
  let formData: any = {};
  let errorArray: FormError[];

  const _run_validation = (
    data: any,
    noPM?: boolean,
    errorMessage?: string
  ): FormError[] => {
    const { ageGroups, performanceMeasureArray } = test_setup(data);
    const deviationArray = getDeviationNDRArray(
      data.DeviationOptions,
      data.Deviations,
      true
    );
    const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;
    return [
      ...validateAtLeastOneDeviationFieldFilled(
        noPM ? [[]] : performanceMeasureArray,
        ageGroups,
        deviationArray,
        didCalculationsDeviate,
        errorMessage
      ),
    ];
  };

  const _check_errors = (data: any, numErrors: number, noPM?: boolean) => {
    errorArray = _run_validation(data, noPM);
    expect(errorArray.length).toBe(numErrors);
  };

  beforeEach(() => {
    formData = JSON.parse(JSON.stringify(testFormData)); // reset data
    errorArray = [];
  });

  it("Default Form Data", () => {
    _check_errors(formData, 0);
  });

  it("Calculations deviated, but somehow no performance measure data", () => {
    formData[DC.DID_CALCS_DEVIATE] = DC.YES;
    _check_errors(formData, 0, true);
  });

  it("Calculations deviated, but no answer given", () => {
    formData[DC.DID_CALCS_DEVIATE] = DC.YES;
    _check_errors(formData, 1);
  });

  it("Calculations deviated, but partial answer given", () => {
    formData[DC.DID_CALCS_DEVIATE] = DC.YES;
    formData[DC.DEVIATION_OPTIONS] = ["Test"];
    formData[DC.DEVIATIONS] = {
      Test: {
        [DC.RATE_DEVIATIONS_SELECTED]: ["numerator"],
      },
    };
    _check_errors(formData, 1);
  });

  it("Calculations deviated, only numerator filled", () => {
    formData[DC.DID_CALCS_DEVIATE] = DC.YES;
    formData[DC.DEVIATION_OPTIONS] = ["Test"];
    formData[DC.DEVIATIONS] = {
      Test: {
        [DC.RATE_DEVIATIONS_SELECTED]: ["numerator"],
        numerator: "testString",
      },
    };
    _check_errors(formData, 0);
  });

  it("Calculations deviated, only denominator filled", () => {
    formData[DC.DID_CALCS_DEVIATE] = DC.YES;
    formData[DC.DEVIATION_OPTIONS] = ["Test"];
    formData[DC.DEVIATIONS] = {
      Test: {
        [DC.RATE_DEVIATIONS_SELECTED]: ["denominator"],
        denominator: "testString",
      },
    };
    _check_errors(formData, 0);
  });

  it("Calculations deviated, only other filled", () => {
    formData[DC.DID_CALCS_DEVIATE] = DC.YES;
    formData[DC.DEVIATION_OPTIONS] = ["Test"];
    formData[DC.DEVIATIONS] = {
      Test: {
        [DC.RATE_DEVIATIONS_SELECTED]: ["Other"],
        other: "testString",
      },
    };
    _check_errors(formData, 0);
  });

  it("Calculations deviated all fields filled", () => {
    formData[DC.DID_CALCS_DEVIATE] = DC.YES;
    formData[DC.DEVIATION_OPTIONS] = ["Test"];
    formData[DC.DEVIATIONS] = {
      Test: {
        [DC.RATE_DEVIATIONS_SELECTED]: ["numerator", "denominator", "Other"],
        numerator: "testString",
        denominator: "testString",
        other: "testString",
      },
    };
    _check_errors(formData, 0);
  });

  it("Error message text should match default errorMessage", () => {
    formData[DC.DID_CALCS_DEVIATE] = DC.YES;
    errorArray = _run_validation(formData);
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(
      "At least one item must be selected and completed (Numerator, Denominator, or Other)"
    );
  });

  it("Error message text should match provided errorMessage", () => {
    formData[DC.DID_CALCS_DEVIATE] = DC.YES;
    const errorMessage = "Another one bites the dust.";
    errorArray = _run_validation(formData, undefined, errorMessage);
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(errorMessage);
  });
});
