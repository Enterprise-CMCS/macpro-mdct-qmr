import { Measure } from "../validation/types";

const validateRates = (data: Measure.Form) => {
  const sevenDays = data["PerformanceMeasure-AgeRates-7Days"];
  const thirtyDays = data["PerformanceMeasure-AgeRates-30Days"];
  let error;

  sevenDays.forEach((_sevenDaysObj, index) => {
    if (sevenDays[index]?.denominator !== thirtyDays[index]?.denominator) {
      error = {
        errorMessage:
          "Denominators must be the same for both thirty and seven day rates.",
      };
    }
  });

  return error;
};

const validate7DaysGreaterThan30Days = (data: Measure.Form) => {
  const sevenDays = data["PerformanceMeasure-AgeRates-7Days"];
  const thirtyDays = data["PerformanceMeasure-AgeRates-30Days"];
  let error;

  sevenDays.forEach((_sevenDaysObj, index) => {
    if (sevenDays[index].rate < thirtyDays[index].rate) {
      error = {
        errorMessage: "Seven Days Rate must be higher than 30 days rate",
      };
    }
  });

  return error;
};

export const validationFunctions = [
  validateRates,
  validate7DaysGreaterThan30Days,
];
