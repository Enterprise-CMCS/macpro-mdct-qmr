import { Measure } from "../validation/types";

const validateRates = (data: Measure.Form) => {
  const sevenDays = data["PerformanceMeasure-AgeRates-7Days"];
  const thirtyDays = data["PerformanceMeasure-AgeRates-30Days"];
  let error;

  if (sevenDays && thirtyDays) {
    sevenDays.forEach((_sevenDaysObj, index) => {
      if (sevenDays[index]?.denominator !== thirtyDays[index]?.denominator) {
        error = {
          errorMessage:
            "Denominators must be the same for both thirty and seven day rates.",
        };
      }
    });
  }

  return error;
};

const validate7DaysGreaterThan30Days = (data: Measure.Form) => {
  const sevenDays = data["PerformanceMeasure-AgeRates-7Days"];
  const thirtyDays = data["PerformanceMeasure-AgeRates-30Days"];
  let error;

  if (sevenDays && thirtyDays) {
    sevenDays.forEach((_sevenDaysObj, index) => {
      if (sevenDays[index].rate < thirtyDays[index].rate) {
        error = {
          errorMessage: "Seven Days Rate must be higher than 30 days rate",
        };
      }
    });
  }

  return error;
};

const validateThirtyDayNumeratorLessThanDenominator = (data: Measure.Form) => {
  const thirtyDays = data["PerformanceMeasure-AgeRates-30Days"];
  let error;

  if (thirtyDays) {
    thirtyDays.forEach((thirtyDay) => {
      if (parseFloat(thirtyDay.numerator) > parseFloat(thirtyDay.denominator)) {
        error = {
          errorMessage:
            "Thirty Day Rate: Numerator must be less than or equal to Denominator",
        };
      }
    });
  }

  return error;
};

const validateSevenDayNumeratorLessThanDenominator = (data: Measure.Form) => {
  const sevenDays = data["PerformanceMeasure-AgeRates-7Days"];
  let error;

  if (sevenDays) {
    sevenDays.forEach((sevenDay) => {
      console.log({ sevenDay });
      if (parseFloat(sevenDay.numerator) > parseFloat(sevenDay.denominator)) {
        error = {
          errorMessage:
            "Seven Day Rate: Numerator must be less than or equal to Denominator",
        };
      }
    });
  }

  return error;
};

export const validationFunctions = [
  validateRates,
  validate7DaysGreaterThan30Days,
  validateSevenDayNumeratorLessThanDenominator,
  validateThirtyDayNumeratorLessThanDenominator,
];
