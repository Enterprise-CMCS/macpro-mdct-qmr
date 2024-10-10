import { testFormData } from "./../testHelpers/_testFormData";
import * as DC from "dataConstants";
import { validateAtLeastOneDeliverySystem } from ".";

describe("validateAtLeastOneDeliverySystem", () => {
  let formData: any;
  let errorArray: FormError[];

  const _check_errors = (data: any, numErrors: number) => {
    errorArray = [...validateAtLeastOneDeliverySystem(data)];
    expect(errorArray.length).toBe(numErrors);
  };

  beforeEach(() => {
    formData = JSON.parse(JSON.stringify(testFormData)); // reset data
    errorArray = [];
  });

  it("When no Delivery System is Selected a validation warning shows", () => {
    formData[DC.DELIVERY_SYS_REPRESENTATION_DENOMINATOR] = [];
    _check_errors(formData, 1);
  });

  it("When a Delivery System is Selected no validation warning shows", () => {
    formData[DC.DELIVERY_SYS_REPRESENTATION_DENOMINATOR] = [
      DC.DELIVERY_SYS_FFS,
    ];
    _check_errors(formData, 0);
  });

  it("Error message text should match default errorMessage", () => {
    formData[DC.DELIVERY_SYS_REPRESENTATION_DENOMINATOR] = [];
    errorArray = [...validateAtLeastOneDeliverySystem(formData)];
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(
      "You must select at least one delivery system option"
    );
  });

  it("Error message text should match provided errorMessage", () => {
    formData[DC.DELIVERY_SYS_REPRESENTATION_DENOMINATOR] = [];
    const errorMessage = "Another one bites the dust.";
    errorArray = [...validateAtLeastOneDeliverySystem(formData, errorMessage)];
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(errorMessage);
  });
});
