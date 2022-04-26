import { test_setup } from "../testHelpers/_helper";
import { testFormData } from "../testHelpers/_testFormData";
// import { validateNoNonZeroNumOrDenom } from "measures/globalValidations";

describe("validateNoNonZeroNumOrDenom", () => {
  let formData: any;
  let errorArray: FormError[];

  const _check_errors = (data: any, numErrors: number) => {
    const { ageGroups, performanceMeasureArray, OPM } = test_setup(data);
    ageGroups;
    performanceMeasureArray;
    OPM;

    errorArray = [
      // ...validateNoNonZeroNumOrDenom()
    ];
    expect(errorArray.length).toBe(numErrors);
  };

  beforeEach(() => {
    formData = JSON.parse(JSON.stringify(testFormData)); // reset data
    errorArray = [];
  });

  test("", () => {
    _check_errors(formData, 0);
  });
});
