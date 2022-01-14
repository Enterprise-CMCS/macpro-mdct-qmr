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

const validateAtLeastOneNDRSet = (data: Measure.Form) => {
  let error;
  const measureSpecification = data["MeasurementSpecification"];
  const sevenDays = data["PerformanceMeasure-AgeRates-7Days"];
  const thirtyDays = data["PerformanceMeasure-AgeRates-30Days"];
  const otherPerformanceRates = data["OtherPerformanceMeasure-Rates"];
  const isHEDIS = measureSpecification === "NCQA/HEDIS";
  if (
    isHEDIS &&
    !sevenDays?.[0]?.rate &&
    !sevenDays?.[1]?.rate &&
    !thirtyDays?.[0]?.rate &&
    !thirtyDays?.[1]?.rate
  ) {
    error = {
      errorLocation: "Performance Measure",
      errorMessage:
        "At least one Performance Measure Numerator, Denominator, and Rate must be completed",
    };
  } else if (!otherPerformanceRates?.[0]?.rate?.[0]?.rate) {
    error = {
      errorLocation: "Other Performance Measure",
      errorMessage:
        "At least one Other Performance Measure Numerator, Denominator, and Rate must be completed",
    };
  }

  return error;
};

export const validationFunctions = [
  validateRates,
  validate7DaysGreaterThan30Days,
  validateSevenDayNumeratorLessThanDenominator,
  validateThirtyDayNumeratorLessThanDenominator,
  validateAtLeastOneNDRSet,
];
