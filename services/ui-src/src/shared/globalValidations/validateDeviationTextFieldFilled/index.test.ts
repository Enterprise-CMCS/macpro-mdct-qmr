import * as DC from "dataConstants";
import { testFormData } from "./../testHelpers/_testFormData";
import { validateAtLeastOneDeviationFieldFilled } from ".";

describe("validateAtLeastOneNDRInDeviationOfMeasureSpec", () => {
  let formData: any = {};
  let errorArray: FormError[];

  const _run_validation = (data: any, errorMessage?: string): FormError[] => {
    const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;
    const deviationReason = data[DC.DEVIATION_REASON];
    return [
      ...validateAtLeastOneDeviationFieldFilled(
        didCalculationsDeviate,
        deviationReason,
        errorMessage
      ),
    ];
  };

  const _check_errors = (data: any, numErrors: number) => {
    errorArray = _run_validation(data);
    expect(errorArray.length).toBe(numErrors);
  };

  beforeEach(() => {
    formData = JSON.parse(JSON.stringify(testFormData)); // reset data
    errorArray = [];
  });

  it("Default Form Data", () => {
    _check_errors(formData, 0);
  });

  it("Calculations deviated, but no answer given", () => {
    formData[DC.DID_CALCS_DEVIATE] = DC.YES;
    _check_errors(formData, 1);
  });

  it("Calculations deviated, reason given", () => {
    formData[DC.DID_CALCS_DEVIATE] = DC.YES;
    formData[DC.DEVIATION_OPTIONS] = ["Test"];
    formData[DC.DEVIATION_REASON] = "Deviation Reason Here";
    _check_errors(formData, 0);
  });

  it("Error message text should match default errorMessage", () => {
    formData[DC.DID_CALCS_DEVIATE] = DC.YES;
    errorArray = _run_validation(formData);
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe("Variation(s) must be explained");
  });

  it("Error message text should match provided errorMessage", () => {
    formData[DC.DID_CALCS_DEVIATE] = DC.YES;
    const errorMessage = "Another one bites the dust.";
    errorArray = _run_validation(formData, errorMessage);
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(errorMessage);
  });
});
