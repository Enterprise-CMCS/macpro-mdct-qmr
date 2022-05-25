import * as DC from "dataConstants";
import { testFormData } from "../testHelpers/_testFormData";
import {
  validateAtLeastOneDeviationFieldFilled,
  getDeviationNDRArray,
} from "measures/2021/globalValidations";
import { test_setup } from "../testHelpers/_helper";

describe("validateAtLeastOneNDRInDeviationOfMeasureSpec", () => {
  let formData: any = {};
  let errorArray: FormError[];

  const _check_errors = (data: any, numErrors: number, noPM?: boolean) => {
    const { ageGroups, performanceMeasureArray } = test_setup(data);

    const deviationArray = getDeviationNDRArray(
      data.DeviationOptions,
      data.Deviations,
      true
    );
    const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;

    errorArray = [
      ...validateAtLeastOneDeviationFieldFilled(
        noPM ? [[]] : performanceMeasureArray,
        ageGroups,
        deviationArray,
        didCalculationsDeviate
      ),
    ];
    expect(errorArray.length).toBe(numErrors);
  };

  beforeEach(() => {
    formData = JSON.parse(JSON.stringify(testFormData)); // reset data
    errorArray = [];
  });

  test("Default Form Data", () => {
    _check_errors(formData, 0);
  });

  test("Calculations deviated, but somehow no performance measure data", () => {
    formData[DC.DID_CALCS_DEVIATE] = DC.YES;
    _check_errors(formData, 0, true);
  });

  test("Calculations deviated, but no answer given", () => {
    formData[DC.DID_CALCS_DEVIATE] = DC.YES;
    _check_errors(formData, 1);
  });

  test("Calculations deviated, but partial answer given", () => {
    formData[DC.DID_CALCS_DEVIATE] = DC.YES;
    formData[DC.DEVIATION_OPTIONS] = ["Test"];
    formData[DC.DEVIATIONS] = {
      Test: {
        [DC.RATE_DEVIATIONS_SELECTED]: ["numerator"],
      },
    };
    _check_errors(formData, 1);
  });

  test("Calculations deviated, only numerator filled", () => {
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

  test("Calculations deviated, only denominator filled", () => {
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

  test("Calculations deviated, only other filled", () => {
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

  test("Calculations deviated all fields filled", () => {
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
});
