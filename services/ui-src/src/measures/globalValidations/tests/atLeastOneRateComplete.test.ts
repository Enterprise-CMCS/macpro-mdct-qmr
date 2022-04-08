import * as DC from "dataConstants";
import * as HELP from "./_helper";
import { testFormData } from "./_testFormData";
import { atLeastOneRateComplete } from "measures/globalValidations";

/* Ensure that at least 1 NDR in a set is complete for either the Performance Measure or Other Performance Measure

  Test Cases:
    ┌─────────────────────┬────────────┐
    │ Performance Measure │    OPM     │
    ├─────────────────────┼────────────┤
  1 │ Partial             │ Partial    │
  2 │ Undefined           │ Undefined  │
  3 │ Partial             │ Undefined  │
  4 │ Undefined           │ Partial    │
  5 │ Incomplete          │ Incomplete │
  6 │ Incomplete          │ Partial    │
  7 │ Incomplete          │ Undefined  │
  8 │ Undefined           │ Incomplete │
    └─────────────────────┴────────────┘
*/
describe("atLeastOneRateComplete", () => {
  let formData: any;

  const check_errors = (data: any, numErrors: number) => {
    let errorArray: FormError[] = [];
    const { ageGroups, performanceMeasureArray, OPM } = HELP.test_setup(data);
    errorArray = [
      ...atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ];
    expect(errorArray.length).toBe(numErrors);
  };

  beforeEach(() => {
    formData = { ...testFormData }; // reset data
  });

  test("when Peformance Measure is partially complete and OPM is partially complete", () => {
    check_errors(formData, 0);
  });

  test("when Performance Measure is undefined and OPM is undefined", () => {
    delete formData[DC.PERFORMANCE_MEASURE];
    delete formData[DC.OPM_RATES];
    check_errors(formData, 1);
  });

  test("when Peformance Measure is partially complete and OPM is undefined", () => {
    delete formData[DC.OPM_RATES];
    check_errors(formData, 0);
  });

  test("when Performance Measure is undefined and OPM is partially complete", () => {
    delete formData[DC.PERFORMANCE_MEASURE];
    check_errors(formData, 0);
  });

  test("when Performance Measure is incomplete and OPM is incomplete", () => {
    // zero out all data in PM
    const PM = formData[DC.PERFORMANCE_MEASURE][DC.RATES];
    Object.keys(PM).forEach((label: any) => {
      PM[label].forEach((rate: any) => HELP.zero_out_rate(rate));
    });
    // zero out all data in OPM
    for (const opmObj of formData[DC.OPM_RATES])
      HELP.zero_out_rate(opmObj.rate[0]);
    check_errors(formData, 1);
  });

  test("when Performance Measure is incomplete and OPM is undefined", () => {
    // zero out all data in PM
    const PM = formData[DC.PERFORMANCE_MEASURE][DC.RATES];
    Object.keys(PM).forEach((label: any) => {
      PM[label].forEach((rate: any) => HELP.zero_out_rate(rate));
    });
    delete formData[DC.OPM_RATES];
    check_errors(formData, 1);
  });

  test("when Performance Measure is undefined and OPM is incomplete", () => {
    delete formData[DC.PERFORMANCE_MEASURE];
    // zero out all data in OPM
    for (const opmObj of formData[DC.OPM_RATES])
      HELP.zero_out_rate(opmObj.rate[0]);
    check_errors(formData, 1);
  });
});
