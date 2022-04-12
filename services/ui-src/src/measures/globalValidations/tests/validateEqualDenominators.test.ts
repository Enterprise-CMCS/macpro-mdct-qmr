import { test_setup } from "./_helper";
import { testFormData } from "./_testFormData";
// import {validateEqualDenominators} from "measures/globalValidations";

describe("validateEqualDenominators", () => {
  let formData: any;
  let errorArray: FormError[];

  const _check_errors = (data: any, numErrors: number) => {
    const { ageGroups, performanceMeasureArray, OPM } = test_setup(data);
    ageGroups;
    performanceMeasureArray;
    OPM;

    errorArray = [
      // ...validateEqualDenominators()
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
