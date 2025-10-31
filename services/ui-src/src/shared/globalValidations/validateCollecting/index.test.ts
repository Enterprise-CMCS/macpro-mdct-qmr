import * as DC from "dataConstants";
import { testFormData } from "../testHelpers/_testFormData";
import { validateCollecting } from ".";
import { FormError } from "error";

describe("validateCollecting", () => {
  let formData: any;

  const run_validation = (data: any): FormError[] => {
    return [...validateCollecting(data)];
  };

  beforeEach(() => {
    formData = JSON.parse(JSON.stringify(testFormData)); // reset data
  });

  it("Should not show collecting validation error", () => {
    const errorArray = run_validation(formData);
    expect(errorArray.length).toBe(0);
  });

  it("Should show collecting validation error", () => {
    formData[DC.DID_COLLECT] = undefined;
    const errorArray = run_validation(formData);
    expect(errorArray.length).toBe(1);
  });
});
