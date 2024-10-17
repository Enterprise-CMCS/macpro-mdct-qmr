import * as DC from "dataConstants";
import { testFormData } from "./../testHelpers/_testFormData";
import { validateReasonForNotReporting } from ".";

describe("validateReasonForNotReporting", () => {
  let formData: string[];
  let errorArray: FormError[];

  const _check_errors = (
    data: string[],
    numErrors: number,
    collecting?: boolean
  ) => {
    errorArray = [...validateReasonForNotReporting(data, collecting)];
    expect(errorArray.length).toBe(numErrors);
  };

  beforeEach(() => {
    formData = testFormData[DC.WHY_ARE_YOU_NOT_REPORTING]; // reset data
    errorArray = [];
  });

  it("Default form data", () => {
    _check_errors(["Sample Error Reason"], 0, false);
  });

  it("Reason for not reporting not selected (reporting)", () => {
    _check_errors(formData, 1);
  });

  it("Reason for not reporting not selected (collecting)", () => {
    _check_errors(formData, 1, true);
  });

  it("Error message text should match provided errorMessage", () => {
    const errorMessageFunc = (collecting?: boolean) => {
      return `Another ${collecting} bites the dust`;
    };
    errorArray = [
      ...validateReasonForNotReporting(formData, true, errorMessageFunc),
    ];
    expect(errorArray[0].errorMessage).toBe(errorMessageFunc(true));
  });
});
