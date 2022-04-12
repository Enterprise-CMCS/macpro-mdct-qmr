import * as DC from "dataConstants";
import { ensureBothDatesCompletedInRange } from "measures/globalValidations";
import { testFormData } from "./_testFormData";

/* This validation checks that both date fields have been completed.

Test Cases:
  1    DATE_RANGE is undefined
     ┌────────────┬───────────┐
     │ Start Date │ End Date  │
     ├────────────┼───────────┤
  2  │ Complete   │ Complete  │
  3  │ Undefined  │ Undefined │
  4  │ Empty      │ Empty     │
  5  │ Empty      │ Undefined │
  6  │ Undefined  │ Empty     │
  7  │ 0          │ 0         │
  8  │ Complete   │ Empty     │
  9  │ Empty      │ Complete  │
  10 │ Month      │ Year      │
  11 │ Year       │ Month     │
     └────────────┴───────────┘  
*/
describe("ensureBothDatesCompletedInRange", () => {
  let formData: any;

  const check_errors = (data: any, numErrors: number) => {
    const dateRange = data[DC.DATE_RANGE];
    const errorArray: FormError[] = [
      ...ensureBothDatesCompletedInRange(dateRange),
    ];
    expect(errorArray.length).toBe(numErrors);
  };

  beforeEach(() => {
    formData = JSON.parse(JSON.stringify(testFormData)); // reset data
  });

  test("when DATE_RANGE is undefined", () => {
    delete formData[DC.DATE_RANGE];
    check_errors(formData, 0);
  });

  test("when START_DATE is complete and END_DATE is complete", () => {
    check_errors(formData, 0);
  });

  test("when START_DATE is undefined and END_DATE is undefined", () => {
    delete formData[DC.DATE_RANGE][DC.START_DATE];
    delete formData[DC.DATE_RANGE][DC.END_DATE];
    check_errors(formData, 1);
  });

  test("when START_DATE is empty and END_DATE is empty", () => {
    formData[DC.DATE_RANGE][DC.START_DATE] = {};
    formData[DC.DATE_RANGE][DC.END_DATE] = {};
    check_errors(formData, 1);
  });

  test("when START_DATE is empty and END_DATE is undefined", () => {
    // Start Date
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_MONTH] = undefined;
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_YEAR] = undefined;

    // End Date
    delete formData[DC.DATE_RANGE][DC.END_DATE];
    check_errors(formData, 1);
  });

  test("when START_DATE is undefined and END_DATE is empty", () => {
    // Start Date
    delete formData[DC.DATE_RANGE][DC.START_DATE];

    // End Date
    formData[DC.DATE_RANGE][DC.END_DATE][DC.SELECTED_MONTH] = undefined;
    formData[DC.DATE_RANGE][DC.END_DATE][DC.SELECTED_YEAR] = undefined;
    check_errors(formData, 1);
  });

  test("when START_DATE and END_DATE have '0' values", () => {
    // Start Date
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_MONTH] = 0;
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_YEAR] = 0;

    // End Date
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_MONTH] = 0;
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_YEAR] = 0;
    check_errors(formData, 1);
  });

  test("when START_DATE is complete and END_DATE is empty", () => {
    formData[DC.DATE_RANGE][DC.END_DATE][DC.SELECTED_MONTH] = undefined;
    formData[DC.DATE_RANGE][DC.END_DATE][DC.SELECTED_YEAR] = undefined;
    check_errors(formData, 1);
  });

  test("when START_DATE is empty and END_DATE is complete", () => {
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_MONTH] = undefined;
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_YEAR] = undefined;
    check_errors(formData, 1);
  });

  test("when START_DATE has a month and END_DATE has a year", () => {
    // Start Date
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_YEAR] = undefined;

    // End Date
    formData[DC.DATE_RANGE][DC.END_DATE][DC.SELECTED_MONTH] = undefined;
    check_errors(formData, 1);
  });

  test("when START_DATE has a year and END_DATE has a month", () => {
    // Start Date
    formData[DC.DATE_RANGE][DC.START_DATE][DC.SELECTED_MONTH] = undefined;

    // End Date
    formData[DC.DATE_RANGE][DC.END_DATE][DC.SELECTED_YEAR] = undefined;
    check_errors(formData, 1);
  });
});
