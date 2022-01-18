import { Measure } from "../validation/types";

const validateRates = (data: Measure.Form) => {
  const sevenDays = data["PerformanceMeasure-AgeRates-7Days"];
  const thirtyDays = data["PerformanceMeasure-AgeRates-30Days"];
  let error;
  const errorArray: any[] = [];

  if (sevenDays && thirtyDays) {
    sevenDays.forEach((_sevenDaysObj, index) => {
      if (
        sevenDays[index] &&
        thirtyDays[index] &&
        sevenDays[index]?.denominator !== thirtyDays[index]?.denominator
      ) {
        const ageGroup = index === 0 ? "18 - 64" : "65 and older";
        const isSingular = index === 1;

        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Denominators must be the same for both 30 day rates and 7 day rates for age${
            isSingular ? "" : "s"
          } ${ageGroup}.`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};

const validateDualPopulationInformation = (data: Measure.Form) => {
  const sevenDays65orOlder = data["PerformanceMeasure-AgeRates-7Days"];
  const thirtyDays65orOlder = data["PerformanceMeasure-AgeRates-30Days"];
  const DualEligibleCheck = data["DefinitionOfDenominator"] ?? [];

  let error;

  if (sevenDays65orOlder || thirtyDays65orOlder) {
    if (sevenDays65orOlder[1] || thirtyDays65orOlder[1]) {
      if (
        sevenDays65orOlder[1]?.numerator ||
        thirtyDays65orOlder[1]?.numerator ||
        sevenDays65orOlder[1]?.denominator ||
        thirtyDays65orOlder[1]?.denominator
      ) {
        if (
          DualEligibleCheck.indexOf(
            "DenominatorIncMedicareMedicaidDualEligible"
          ) === -1
        ) {
          error = {
            errorLocation: "Performance Measure",
            errorMessage:
              "Information has been included in the Age 65 and older Performance Mesure but the checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is missing",
          };
        }
      }
    }
  }
  if (
    DualEligibleCheck.indexOf("DenominatorIncMedicareMedicaidDualEligible") !==
    -1
  ) {
    if (!sevenDays65orOlder && !thirtyDays65orOlder) {
      error = {
        errorLocation: "Performance Measure",
        errorMessage:
          "Missing data on Performance Measure for Age 65 and older",
      };
    } else if (!sevenDays65orOlder[1] && !thirtyDays65orOlder[1]) {
      error = {
        errorLocation: "Performance Measure",
        errorMessage:
          "Missing data on Performance Measure for Age 65 and older",
      };
    } else if (
      !sevenDays65orOlder[1]?.numerator ||
      !sevenDays65orOlder[1]?.denominator
    ) {
      return {
        errorLocation: "Performance Measure",
        errorMessage:
          "Missing data on Performance Measure for Age 65 and older (Follow-up within 7 days of ED visit)",
      };
    } else if (
      !thirtyDays65orOlder[1]?.numerator ||
      !thirtyDays65orOlder[1]?.denominator
    ) {
      return {
        errorLocation: "Performance Measure",
        errorMessage:
          "Missing data on Performance Measure for Age 65 and older (Follow-up within 30 days of ED visit)",
      };
    }
  }
  return error;
};

const validate7DaysGreaterThan30Days = (data: Measure.Form) => {
  const sevenDays = data["PerformanceMeasure-AgeRates-7Days"];
  const thirtyDays = data["PerformanceMeasure-AgeRates-30Days"];
  let error;
  const errorArray: any[] = [];

  if (sevenDays && thirtyDays) {
    sevenDays.forEach((_sevenDaysObj, index) => {
      if (
        sevenDays[index] &&
        thirtyDays[index] &&
        parseFloat(sevenDays[index]?.rate) > parseFloat(thirtyDays[index]?.rate)
      ) {
        const ageGroup = index === 0 ? "18 - 64" : "65 and older";
        const isSingular = index === 1;
        error = {
          errorLocation: "Performance Measure",
          errorMessage: `7 Days Rate should not be higher than 30 Days Rate for age${
            isSingular ? "" : "s"
          } ${ageGroup}`,
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
      if (
        thirtyDay &&
        thirtyDay.numerator &&
        thirtyDay.denominator &&
        parseFloat(thirtyDay?.numerator) > parseFloat(thirtyDay?.denominator)
      ) {
        const ageGroup = index === 0 ? "18 - 64" : "65 and older";
        error = {
          errorLocation: "Performance Measure",
          errorMessage: `30 Day Rate: Numerator must be less than or equal to Denominator for ages ${ageGroup}`,
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
      if (
        sevenDay &&
        sevenDay.numerator &&
        sevenDay.denominator &&
        parseFloat(sevenDay?.numerator) > parseFloat(sevenDay?.denominator)
      ) {
        const ageGroup = index === 0 ? "18 - 64" : "65 and older";
        error = {
          errorLocation: "Performance Measure",
          errorMessage: `7 Day Rate: Numerator must be less than or equal to Denominator for ages ${ageGroup}`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
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
  } else if (!isHEDIS && !otherPerformanceRates?.[0]?.rate?.[0]?.rate) {
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
  validateDualPopulationInformation,
];
