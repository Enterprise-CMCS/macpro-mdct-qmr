import { Measure } from "../validation/types";

const validateRates = (data: Measure.Form) => {
  const sevenDays = data["PerformanceMeasure-AgeRates-7Days"];
  const thirtyDays = data["PerformanceMeasure-AgeRates-30Days"];
  let error;
  const errorArray: any[] = [];

  if (sevenDays && thirtyDays) {
    sevenDays.forEach((_sevenDaysObj, index) => {
      if (sevenDays[index]?.denominator !== thirtyDays[index]?.denominator) {
        const ageGroup = index === 0 ? "18 - 64" : "65 and older";

        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Denominators must be the same for both thirty day rates and seven day rates for ages ${ageGroup}.`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};

const validate7DaysGreaterThan30Days = (data: Measure.Form) => {
  const sevenDays = data["PerformanceMeasure-AgeRates-7Days"];
  const thirtyDays = data["PerformanceMeasure-AgeRates-30Days"];
  let error;
  const errorArray: any[] = [];

  if (sevenDays && thirtyDays) {
    sevenDays.forEach((_sevenDaysObj, index) => {
      if (sevenDays[index].rate > thirtyDays[index].rate) {
        const ageGroup = index === 0 ? "18 - 64" : "65 and older";

        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Seven Days Rate should not be higher than Thirty Days Rate for ages ${ageGroup}`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};

const validateThirtyDayNumeratorLessThanDenominator = (data: Measure.Form) => {
  const thirtyDays = data["PerformanceMeasure-AgeRates-30Days"];
  let error;
  const errorArray: any[] = [];

  if (thirtyDays) {
    thirtyDays.forEach((thirtyDay, index) => {
      if (parseFloat(thirtyDay.numerator) > parseFloat(thirtyDay.denominator)) {
        const ageGroup = index === 0 ? "18 - 64" : "65 and older";

        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Thirty Day Rate: Numerator must be less than or equal to Denominator for ages ${ageGroup}`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};

const validateSevenDayNumeratorLessThanDenominator = (data: Measure.Form) => {
  const sevenDays = data["PerformanceMeasure-AgeRates-7Days"];
  let error;
  const errorArray: any[] = [];

  if (sevenDays) {
    sevenDays.forEach((sevenDay, index) => {
      if (parseFloat(sevenDay.numerator) > parseFloat(sevenDay.denominator)) {
        const ageGroup = index === 0 ? "18 - 64" : "65 and older";

        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Seven Day Rate: Numerator must be less than or equal to Denominator for ages ${ageGroup}`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};

export const validationFunctions = [
  validateRates,
  validate7DaysGreaterThan30Days,
  validateSevenDayNumeratorLessThanDenominator,
  validateThirtyDayNumeratorLessThanDenominator,
];
