import * as DC from "dataConstants";
import { testFormData } from "./../testHelpers/_testFormData";
import { validateYearFormat } from ".";

/* This validation checks that start and end date years match YYYY format. */
describe("ensureBothYearsMatchYYYYFormat", () => {
  let formData: any;

  const run_validation = (data: any, errorMessage?: string): FormError[] => {
    const dateRange = data[DC.DATE_RANGE];
    return [...validateYearFormat(dateRange, errorMessage)];
  };

  const check_errors = (data: any, numErrors: number) => {
    const errorArray: FormError[] = run_validation(data);
    expect(errorArray.length).toBe(numErrors);
  };

  beforeEach(() => {
    formData = JSON.parse(JSON.stringify(testFormData)); // reset data
  });

  it("when DATE_RANGE is undefined", () => {
    delete formData[DC.DATE_RANGE];
    check_errors(formData, 0);
  });

  it("when START_DATE is undefined and END_DATE is undefined", () => {
    delete formData[DC.DATE_RANGE][DC.START_DATE];
    delete formData[DC.DATE_RANGE][DC.END_DATE];
    check_errors(formData, 0);
  });

  it("when START_DATE is complete and END_DATE is complete", () => {
    check_errors(formData, 0);
  });

  it("when START_DATE and END_DATE years have one digit values", () => {
    // Start Date
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_YEAR] = 1;

    // End Date
    formData[DC.DATE_RANGE][DC.END_DATE][DC.SELECTED_YEAR] = 1;
    check_errors(formData, 2);
  });

  it("when START_DATE and END_DATE have two digit values", () => {
    // Start Date
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_YEAR] = 22;

    // End Date
    formData[DC.DATE_RANGE][DC.END_DATE][DC.SELECTED_YEAR] = 22;
    check_errors(formData, 2);
  });

  it("when START_DATE and END_DATE have three digit values", () => {
    // Start Date
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_YEAR] = 333;

    // End Date
    formData[DC.DATE_RANGE][DC.END_DATE][DC.SELECTED_YEAR] = 333;
    check_errors(formData, 2);
  });

  it("Error message text should match default errorMessage", () => {
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_YEAR] = 1;
    formData[DC.DATE_RANGE][DC.END_DATE][DC.SELECTED_YEAR] = 1;
    const errorArray = run_validation(formData);
    expect(errorArray.length).toBe(2);
    expect(errorArray[0].errorMessage).toBe(
      "Please enter start date year in YYYY-format"
    );
    expect(errorArray[1].errorMessage).toBe(
      "Please enter end date year in YYYY-format"
    );
  });

  it("Error message text should match provided errorMessage", () => {
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_YEAR] = 1;
    formData[DC.DATE_RANGE][DC.END_DATE][DC.SELECTED_YEAR] = 1;
    const errorMessage = "Another one bites the dust.";
    const errorArray = run_validation(formData, errorMessage);
    expect(errorArray.length).toBe(2);
    expect(errorArray[0].errorMessage).toBe(errorMessage);
    expect(errorArray[1].errorMessage).toBe(errorMessage);
  });
});
