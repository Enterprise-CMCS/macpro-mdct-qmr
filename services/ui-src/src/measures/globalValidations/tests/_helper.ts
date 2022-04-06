import * as DC from "dataConstants";
import { exampleData } from "measures/CommonQuestions/PerformanceMeasure/data";
import { getPerfMeasureRateArray } from "measures/globalValidations";

export const test_setup = (data: any) => {
  return {
    ageGroups: exampleData.qualifiers!,
    performanceMeasureArray: getPerfMeasureRateArray(data, exampleData),
    OPM: data[DC.OPM_RATES],
  };
};
