import * as DC from "dataConstants";
import { testFormData } from "./_testFormData";
import {
  // validateTotalNDR,
  getPerfMeasureRateArray,
} from "measures/globalValidations";
import { exampleData } from "measures/CommonQuestions/PerformanceMeasure/data";

describe("validateTotalNDR", () => {
  let formData: any;
  let errorArray: FormError[];

  const _test_setup = (data: any) => {
    return {
      ageGroups: exampleData.qualifiers!,
      performanceMeasureArray: getPerfMeasureRateArray(data, exampleData),
      OPM: data[DC.OPM_RATES],
    };
  };

  const _check_errors = (data: any, numErrors: number) => {
    const { ageGroups, performanceMeasureArray, OPM } = _test_setup(data);
    ageGroups;
    performanceMeasureArray;
    OPM;

    errorArray = [
      // ...validateTotalNDR()
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
