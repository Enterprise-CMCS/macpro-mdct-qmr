import { Measure } from "../validation/types";
import {
  atLeastOneRateComplete,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
  validateReasonForNotReporting,
} from "../../globalValidations/validationsLib";

const validateLarcRateGreater = (data: Measure.Form) => {
  let error;

  if (
    data["PerformanceMeasure-ModeratelyEffectiveMethodOfContraceptionRate"] &&
    data["PerformanceMeasure-ReversibleMethodOfContraceptionRate"] &&
    data["PerformanceMeasure-ModeratelyEffectiveMethodOfContraceptionRate"][0]
      ?.rate &&
    data["PerformanceMeasure-ReversibleMethodOfContraceptionRate"][0]?.rate
  ) {
    if (
      parseFloat(
        data["PerformanceMeasure-ReversibleMethodOfContraceptionRate"][0]?.rate
      ) >
      parseFloat(
        data[
          "PerformanceMeasure-ModeratelyEffectiveMethodOfContraceptionRate"
        ][0].rate
      )
    ) {
      error = {
        errorLocation: "Performance Measure",
        errorMessage:
          "Long-acting reversible method of contraception (LARC) rate must be less than or equal to Most effective or moderately effective method of contraception rate",
      };
    }
  }

  return error;
};

const validateDenominatorsAreTheSame = (data: Measure.Form) => {
  let error;

  if (
    data["PerformanceMeasure-ModeratelyEffectiveMethodOfContraceptionRate"] &&
    data["PerformanceMeasure-ReversibleMethodOfContraceptionRate"] &&
    data["PerformanceMeasure-ModeratelyEffectiveMethodOfContraceptionRate"][0]
      ?.denominator &&
    data["PerformanceMeasure-ReversibleMethodOfContraceptionRate"][0]
      ?.denominator
  ) {
    if (
      parseFloat(
        data[
          "PerformanceMeasure-ModeratelyEffectiveMethodOfContraceptionRate"
        ][0].denominator
      ) !==
      parseFloat(
        data["PerformanceMeasure-ReversibleMethodOfContraceptionRate"][0]
          .denominator
      )
    ) {
      error = {
        errorLocation: "Performance Measure",
        errorMessage:
          "Long-acting reversible method of contraception (LARC) rate must have the same denominator as Most effective or moderately effective method of contraception rate",
      };
    }
  }

  return error;
};

const CCWADValidation = (data: Measure.Form) => {
  const ageGroups = ["21 to 44"];
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = [
    data["PerformanceMeasure-ModeratelyEffectiveMethodOfContraceptionRate"],
    data["PerformanceMeasure-ReversibleMethodOfContraceptionRate"],
  ];

  let errorArray: any[] = [];
  if (data["DidReport"] === "No, I am not reporting") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
  ];

  return errorArray;
};

export const validationFunctions = [
  CCWADValidation,
  validateDenominatorsAreTheSame,
  validateLarcRateGreater
];
