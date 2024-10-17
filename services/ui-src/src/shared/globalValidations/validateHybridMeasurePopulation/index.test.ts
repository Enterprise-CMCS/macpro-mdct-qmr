import { testFormData } from "./../testHelpers/_testFormData";
import * as DC from "dataConstants";
import { validateHybridMeasurePopulation } from ".";

describe("validateHybridMeasurePopulation", () => {
  let formData: any;
  let errorArray: FormError[];

  const _check_errors = (data: any, numErrors: number) => {
    errorArray = [...validateHybridMeasurePopulation(data)];
    expect(errorArray.length).toBe(numErrors);
  };

  beforeEach(() => {
    formData = JSON.parse(JSON.stringify(testFormData)); // reset data
    errorArray = [];
  });

  it("When no Data Source is selected, no validation warning shows", () => {
    formData[DC.DEFINITION_OF_DENOMINATOR] = [];
    _check_errors(formData, 0);
  });

  it("When Data Source - Hybrid is selected, a validation warning will show", () => {
    formData[DC.DATA_SOURCE] = [
      DC.HYBRID_ADMINSTRATIVE_AND_MEDICAL_RECORDS_DATA,
    ];
    _check_errors(formData, 1);
  });

  it("When Data Source - Case management record review is selected, a validation warning will show", () => {
    formData[DC.DATA_SOURCE] = [DC.CASE_MANAGEMENT_RECORD_REVIEW_DATA];
    _check_errors(formData, 1);
  });

  it("Error message text should match default errorMessage", () => {
    formData[DC.DATA_SOURCE] = [
      DC.HYBRID_ADMINSTRATIVE_AND_MEDICAL_RECORDS_DATA,
    ];
    errorArray = [...validateHybridMeasurePopulation(formData)];
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(
      "Size of the measure-eligible population is required"
    );
  });

  it("Error message text should match provided errorMessage", () => {
    formData[DC.DATA_SOURCE] = [
      DC.HYBRID_ADMINSTRATIVE_AND_MEDICAL_RECORDS_DATA,
    ];
    const errorMessage = "Another one bites the dust.";
    errorArray = [...validateHybridMeasurePopulation(formData, errorMessage)];
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(errorMessage);
  });
});
