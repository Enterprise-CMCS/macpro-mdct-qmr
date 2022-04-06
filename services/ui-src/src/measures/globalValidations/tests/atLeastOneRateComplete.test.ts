import * as DC from "dataConstants";
import { testFormData } from "./_testFormData";
import {
  atLeastOneRateComplete,
  getPerfMeasureRateArray,
} from "measures/globalValidations";
import { exampleData } from "measures/CommonQuestions/PerformanceMeasure/data";

/* Ensure that at least 1 NDR set is complete for either the Performance Measure or Other Performance Measure

  Test Cases:
    - when Peformance Measure is partially complete and OPM is undefined
    - when Performance Measure is undefined and OPM is partially complete
    - when Performance Measure is undefined and OPM is undefined
    - when Performance Measure is incomplete and OPM is undefined
    - when Performance Measure is undefined and OPM is incomplete
*/
describe("atLeastOneRateComplete", () => {
  let formData: any;
  let errorArray: FormError[];

  // By default: PM is partially complete, OPM is undefined
  // To be used in places where we want to check OPM
  const opmData = {
    "OtherPerformanceMeasure-Rates": [
      {
        description: "Label 1",
        rate: [
          {
            rate: "50.0",
            numerator: "1",
            denominator: "2",
          },
        ],
      },
      {
        description: "Label 2",
        rate: [
          {
            rate: "",
            numerator: "",
            denominator: "",
          },
        ],
      },
    ],
  };

  const _test_setup = (data: any) => {
    return {
      ageGroups: exampleData.qualifiers!,
      performanceMeasureArray: getPerfMeasureRateArray(data, exampleData),
      OPM: data[DC.OPM_RATES],
    };
  };

  const _check_errors = (data: any, numErrors: number) => {
    const { ageGroups, performanceMeasureArray, OPM } = _test_setup(data);
    errorArray = [
      ...atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ];
    expect(errorArray.length).toBe(numErrors);
  };

  beforeEach(() => {
    formData = { ...testFormData };
    errorArray = [];
  });

  test("when Peformance Measure is partially complete and OPM is undefined", () => {
    _check_errors(formData, 0);
  });

  test("when Performance Measure is undefined and OPM is partially complete", () => {
    delete formData[DC.PERFORMANCE_MEASURE];
    formData[DC.OPM_RATES] = opmData[DC.OPM_RATES];
    _check_errors(formData, 0);
  });

  test("when Performance Measure is undefined and OPM is undefined", () => {
    delete formData[DC.PERFORMANCE_MEASURE];
    _check_errors(formData, 1);
  });

  test("when Performance Measure is incomplete and OPM is undefined", () => {
    Object.keys(formData[DC.PERFORMANCE_MEASURE][DC.RATES]).forEach(
      (label: any) => {
        formData[DC.PERFORMANCE_MEASURE][DC.RATES][label].forEach(
          (rate: any) => {
            rate.rate = "";
            rate.numerator = "";
            rate.denominator = "";
          }
        );
      }
    );
    _check_errors(formData, 1);
  });

  test("when Performance Measure is undefined and OPM is incomplete", () => {
    delete formData[DC.PERFORMANCE_MEASURE];
    formData[DC.OPM_RATES] = [
      {
        description: "Label 2",
        rate: [
          {
            rate: "",
            numerator: "",
            denominator: "",
          },
        ],
      },
    ];
    _check_errors(formData, 1);
  });
});
