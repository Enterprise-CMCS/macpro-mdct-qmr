import { testFormData } from "./../testHelpers/_testFormData";
import * as DC from "dataConstants";
import { validateFfsRadioButtonCompletion } from ".";

describe("validateFfsRadioButtonCompletion", () => {
  let formData: any;
  let errorArray: FormError[];

  const _check_errors = (data: any, numErrors: number) => {
    errorArray = [...validateFfsRadioButtonCompletion(data)];
    expect(errorArray.length).toBe(numErrors);
  };

  beforeEach(() => {
    formData = JSON.parse(JSON.stringify(testFormData)); // reset data
    errorArray = [];
  });

  it("When no Delivery System nested question is checked a validation warning shows", () => {
    formData[DC.DELIVERY_SYS_REPRESENTATION_DENOMINATOR] = [DC.FFS];
    formData[DC.DELIVERY_SYS_FFS] = undefined;
    _check_errors(formData, 1);
  });

  it("When a Delivery System nested question is checked no validation warning shows", () => {
    formData[DC.DELIVERY_SYS_REPRESENTATION_DENOMINATOR] = [DC.FFS];
    formData[DC.DELIVERY_SYS_FFS] = "yes";
    _check_errors(formData, 0);
  });

  it("Error message text should match default errorMessage", () => {
    formData[DC.DELIVERY_SYS_REPRESENTATION_DENOMINATOR] = [DC.FFS];
    formData[DC.DELIVERY_SYS_FFS] = undefined;
    errorArray = [...validateFfsRadioButtonCompletion(formData)];
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(
      "You must indicate if the measure-eligible population is included"
    );
  });

  it("Error message text should match provided errorMessage", () => {
    formData[DC.DELIVERY_SYS_REPRESENTATION_DENOMINATOR] = [DC.FFS];
    formData[DC.DELIVERY_SYS_FFS] = undefined;
    const errorMessage = "Another one bites the dust.";
    errorArray = [...validateFfsRadioButtonCompletion(formData, errorMessage)];
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(errorMessage);
  });
});
