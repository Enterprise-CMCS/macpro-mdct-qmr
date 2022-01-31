import { Measure } from "../validation/types";

const validateRates = (data: Measure.Form) => {
  const sevenDays = data["PerformanceMeasure-AgeRates-longActingContraception"];
  const thirtyDays = data["PerformanceMeasure-AgeRates-effectiveContraception"];
  let error;
  const errorArray: any[] = [];

  if (sevenDays && thirtyDays) {
    sevenDays.forEach((_sevenDaysObj, index) => {
      if (
        sevenDays[index] &&
        thirtyDays[index] &&
        sevenDays[index].denominator &&
        thirtyDays[index].denominator &&
        sevenDays[index].denominator !== thirtyDays[index].denominator
      ) {
        const timeSet =
          index === 0 ? "Three Days Postpartum" : "Sixty Days Postpartum";

        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Denominators must be the same for both Most Effective/Moderately Effective Contraception rate and Long-acting Reversible Contraception (LARC) rate for ${timeSet}.`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};

const validateDualPopulationInformation = (data: Measure.Form) => {
  const sevenDays65orOlder =
    data["PerformanceMeasure-AgeRates-longActingContraception"];
  const thirtyDays65orOlder =
    data["PerformanceMeasure-AgeRates-effectiveContraception"];
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
              "Information has been included in the Sixty Days Postpartum Performance Measure but the checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is missing",
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
          "Missing data on Performance Measure for Sixty Days Postpartum",
      };
    } else if (!sevenDays65orOlder[1] && !thirtyDays65orOlder[1]) {
      error = {
        errorLocation: "Performance Measure",
        errorMessage:
          "Missing data on Performance Measure for Sixty Days Postpartum",
      };
    } else if (
      (!sevenDays65orOlder[1]?.numerator || // either not filled in
        !sevenDays65orOlder[1]?.denominator) && // either not filled in
      !thirtyDays65orOlder[1]?.numerator && //both filled in
      !thirtyDays65orOlder[1]?.denominator //both filled in
    ) {
      return {
        errorLocation: "Performance Measure",
        errorMessage:
          "Missing data on Performance Measure for Sixty Days Postpartum (Most Effective or Moderately Effective Method of Contraceptive)",
      };
    } else if (
      (!thirtyDays65orOlder[1]?.numerator ||
        !thirtyDays65orOlder[1]?.denominator) &&
      !sevenDays65orOlder[1]?.numerator &&
      !sevenDays65orOlder[1]?.denominator
    ) {
      return {
        errorLocation: "Performance Measure",
        errorMessage:
          "Missing data on Performance Measure for Sixty Days Postpartum (Long-acting Reversible Method of Contraception (LARC))",
      };
    }
  }
  return error;
};

const validate7DaysGreaterThan30Days = (data: Measure.Form) => {
  const sevenDays = data["PerformanceMeasure-AgeRates-longActingContraception"];
  const thirtyDays = data["PerformanceMeasure-AgeRates-effectiveContraception"];
  let error;
  const errorArray: any[] = [];

  if (sevenDays && thirtyDays) {
    sevenDays.forEach((_sevenDaysObj, index) => {
      if (
        sevenDays[index] &&
        thirtyDays[index] &&
        parseFloat(sevenDays[index]?.rate) > parseFloat(thirtyDays[index]?.rate)
      ) {
        const ageGroup =
          index === 0 ? "Three Days Postpartum" : "Sixty Days Postpartum";
        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Most Effective or Moderately Effective Method of Contraception Rate should not be higher than Long-acting Reversible Method of Contraception (LARC) Rate for ${ageGroup}`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};

const validateThirtyDayNumeratorLessThanDenominator = (data: Measure.Form) => {
  const thirtyDays = data["PerformanceMeasure-AgeRates-effectiveContraception"];
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
        const ageGroup =
          index === 0 ? "Three Days Postpartum" : "Sixty Days Postpartum";

        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Most Effective/Moderately Effective Contraceptive: Numerator must be less than or equal to Denominator for ${ageGroup}`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};

const validateSevenDayNumeratorLessThanDenominator = (data: Measure.Form) => {
  const sevenDays = data["PerformanceMeasure-AgeRates-longActingContraception"];
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
        const ageGroup =
          index === 0 ? "Three Days Postpartum" : "Sixty Days Postpartum";

        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Long-acting Reversible Contraceptive (LARC): Numerator must be less than or equal to Denominator for ${ageGroup}`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};

//TODO:
const validateAtLeastOneNDRSet = (data: Measure.Form) => {
  let error;
  const measureSpecification = data["MeasurementSpecification"];
  const sevenDays = data["PerformanceMeasure-AgeRates-longActingContraception"];
  const thirtyDays = data["PerformanceMeasure-AgeRates-effectiveContraception"];
  const otherPerformanceRates = data["OtherPerformanceMeasure-Rates"] ?? [];
  const isHEDIS = measureSpecification === "HHS-OPA";

  let doesOtherNDRExist = false;
  otherPerformanceRates.forEach((ndr) => {
    const ndrRate = ndr?.rate?.[0]?.rate;
    if (ndrRate) {
      doesOtherNDRExist = true;
    }
  });

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
  } else if (measureSpecification && !isHEDIS && !doesOtherNDRExist) {
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
