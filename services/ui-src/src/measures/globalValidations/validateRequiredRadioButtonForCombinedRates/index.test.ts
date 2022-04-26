import { test_setup } from "../testHelpers/_helper";
import { testFormData } from "../testHelpers/_testFormData";
// import { validateRequiredRadioButtonForCombinedRates } from "measures/globalValidations";

describe("validateRequiredRadioButtonForCombinedRates", () => {
  let formData: any;
  let errorArray: FormError[];

  const _check_errors = (data: any, numErrors: number) => {
    const { ageGroups, performanceMeasureArray, OPM } = test_setup(data);
    ageGroups;
    performanceMeasureArray;
    OPM;

    errorArray = [
      // ...validateRequiredRadioButtonForCombinedRates()
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
