import * as DC from "dataConstants";
import { RateFields } from "shared/types";
import { exampleData } from "shared/commonQuestions/PerformanceMeasure/data";
import { getPerfMeasureRateArray } from "./../dataDrivenTools";
import { DefaultFormDataLegacy, DefaultFormData } from "shared/types/FormData";

export const test_setup = (data: DefaultFormDataLegacy | DefaultFormData) => {
  return {
    ageGroups: exampleData.qualifiers!,
    performanceMeasureArray: getPerfMeasureRateArray(data, exampleData),
    OPM: data[DC.OPM_RATES],
  };
};

// Set empty values throughout OPM Measure while keeping the shape of the data
export const zero_OPM = (data: DefaultFormDataLegacy | DefaultFormData) => {
  const OPM = data[DC.OPM_RATES];
  for (const opmObj of OPM)
    opmObj?.rate !== undefined ? zero_out_rate_field(opmObj.rate[0]) : false;
};

// Set empty values throughout Performance Measure while keeping the shape of the data
export const zero_PM = (data: DefaultFormDataLegacy | DefaultFormData) => {
  const PM = data[DC.PERFORMANCE_MEASURE]![DC.RATES]!;
  Object.keys(PM).forEach((label: string) => {
    if (label) {
      PM[label]?.forEach((rate: any) => zero_out_rate_field(rate));
    }
  });
};

// clear the values of a RateField
const zero_out_rate_field = (rateField: RateFields) => {
  rateField.rate = "";
  rateField.numerator = "";
  rateField.denominator = "";
};
