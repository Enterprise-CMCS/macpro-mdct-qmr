import * as DC from "dataConstants";
import { testFormData } from "./../testHelpers/_testFormData";
import { validateHedisYear } from ".";
import { FormError } from "error";

describe("Hedis Year Validation - FY 2024", () => {
  let formData: any;

  const run_validation = (data: any): FormError[] => {
    return [...validateHedisYear(data)];
  };

  beforeEach(() => {
    formData = JSON.parse(JSON.stringify(testFormData)); // reset data
  });

  it("Should not show hedis validation error", () => {
    const hedisOptions = [
      "DC.HEDIS_MY_2021",
      "DC.HEDIS_MY_2022",
      "DC.HEDIS_MY_2023",
    ];
    for (let i = 0; i < hedisOptions.length - 1; i++) {
      formData[DC.MEASUREMENT_SPECIFICATION_HEDIS] = hedisOptions[i];
      const errorArray = run_validation(formData);
      expect(errorArray.length).toBe(0);
    }
  });

  it("Should show hedis validation error", () => {
    formData[DC.MEASUREMENT_SPECIFICATION_HEDIS] = "";
    const errorArray = run_validation(formData);
    expect(errorArray.length).toBe(1);
  });

  it("Should show no error when measure specification is other", () => {
    formData[DC.MEASUREMENT_SPECIFICATION] = "Other";
    const errorArray = run_validation(formData);
    expect(errorArray.length).toBe(0);
  });
});
