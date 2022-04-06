import { testFormData } from "./_testFormData";
// import { validateAtLeastOneNDRInDeviationOfMeasureSpec } from "measures/globalValidations";
import { test_setup } from "./_helper";

describe("validateAtLeastOneNDRInDeviationOfMeasureSpec", () => {
  let formData: any;
  let errorArray: FormError[];

  const _check_errors = (data: any, numErrors: number) => {
    const { ageGroups, performanceMeasureArray, OPM } = test_setup(data);
    ageGroups;
    performanceMeasureArray;
    OPM;

    errorArray = [
      // ...validateAtLeastOneNDRInDeviationOfMeasureSpec()
    ];
    expect(errorArray.length).toBe(numErrors);
  };

  beforeEach(() => {
    formData = { ...testFormData };
    errorArray = [];
  });

  test("", () => {
    _check_errors(formData, 0);
  });
});
