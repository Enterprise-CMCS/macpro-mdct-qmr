import * as DC from "dataConstants";
import { testFormData } from "measures/2024/shared/globalValidations/testHelpers/_testFormData";
import { validateBothDatesCompleted } from ".";

/* This validation checks that both date fields have been completed. */
describe("ensureBothDatesCompletedInRange", () => {
  let formData: any;

  const run_validation = (data: any, errorMessage?: string): FormError[] => {
    const dateRange = data[DC.DATE_RANGE];
    return [...validateBothDatesCompleted(dateRange, errorMessage)];
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

  it("when START_DATE is complete and END_DATE is complete", () => {
    check_errors(formData, 0);
  });

  it("when START_DATE is undefined and END_DATE is undefined", () => {
    delete formData[DC.DATE_RANGE][DC.START_DATE];
    delete formData[DC.DATE_RANGE][DC.END_DATE];
    check_errors(formData, 1);
  });

  it("when START_DATE is empty and END_DATE is empty", () => {
    formData[DC.DATE_RANGE][DC.START_DATE] = {};
    formData[DC.DATE_RANGE][DC.END_DATE] = {};
    check_errors(formData, 1);
  });

  it("when START_DATE is empty and END_DATE is undefined", () => {
    // Start Date
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_MONTH] = undefined;
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_YEAR] = undefined;

    // End Date
    delete formData[DC.DATE_RANGE][DC.END_DATE];
    check_errors(formData, 1);
  });

  it("when START_DATE is undefined and END_DATE is empty", () => {
    // Start Date
    delete formData[DC.DATE_RANGE][DC.START_DATE];

    // End Date
    formData[DC.DATE_RANGE][DC.END_DATE][DC.SELECTED_MONTH] = undefined;
    formData[DC.DATE_RANGE][DC.END_DATE][DC.SELECTED_YEAR] = undefined;
    check_errors(formData, 1);
  });

  it("when START_DATE and END_DATE have '0' values", () => {
    // Start Date
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_MONTH] = 0;
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_YEAR] = 0;

    // End Date
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_MONTH] = 0;
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_YEAR] = 0;
    check_errors(formData, 1);
  });

  it("when START_DATE is complete and END_DATE is empty", () => {
    formData[DC.DATE_RANGE][DC.END_DATE][DC.SELECTED_MONTH] = undefined;
    formData[DC.DATE_RANGE][DC.END_DATE][DC.SELECTED_YEAR] = undefined;
    check_errors(formData, 1);
  });

  it("when START_DATE is empty and END_DATE is complete", () => {
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_MONTH] = undefined;
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_YEAR] = undefined;
    check_errors(formData, 1);
  });

  it("when START_DATE has a month and END_DATE has a year", () => {
    // Start Date
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_YEAR] = undefined;

    // End Date
    formData[DC.DATE_RANGE][DC.END_DATE][DC.SELECTED_MONTH] = undefined;
    check_errors(formData, 1);
  });

  it("when START_DATE has a year and END_DATE has a month", () => {
    // Start Date
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_MONTH] = undefined;

    // End Date
    formData[DC.DATE_RANGE][DC.END_DATE][DC.SELECTED_YEAR] = undefined;
    check_errors(formData, 1);
  });

  it("Error message text should match default errorMessage", () => {
    formData[DC.DATE_RANGE][DC.START_DATE] = {};
    formData[DC.DATE_RANGE][DC.END_DATE] = {};
    const errorArray = run_validation(formData);
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe("Date Range must be completed");
  });

  it("Error message text should match provided errorMessage", () => {
    formData[DC.DATE_RANGE][DC.START_DATE] = {};
    formData[DC.DATE_RANGE][DC.END_DATE] = {};
    const errorMessage = "Another one bites the dust.";
    const errorArray = run_validation(formData, errorMessage);
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(errorMessage);
  });
});
