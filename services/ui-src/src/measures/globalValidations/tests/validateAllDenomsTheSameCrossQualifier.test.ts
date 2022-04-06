import { test_setup } from "./_helper";
import { testFormData } from "./_testFormData";
// import { validateAllDenomsAreTheSameCrossQualifier } from "measures/globalValidations";

describe("validateAllDenomsAreTheSameCrossQualifier", () => {
  let formData: any;
  let errorArray: FormError[];

  const _check_errors = (data: any, numErrors: number) => {
    const { ageGroups, performanceMeasureArray, OPM } = test_setup(data);
    ageGroups;
    performanceMeasureArray;
    OPM;

    errorArray = [
      // ...validateAllDenomsAreTheSameCrossQualifier()
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
