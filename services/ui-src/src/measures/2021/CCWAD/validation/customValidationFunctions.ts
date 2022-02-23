import { Measure } from "../validation/types";
import {
  atLeastOneRateComplete,
  validateNoNonZeroNumOrDenom,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
} from "../../globalValidations/validationsLib";

const validateReversibleNumeratorLessThanDenominator = (data: Measure.Form) => {
  const reversibleRates =
    data["PerformanceMeasure-ReversibleMethodOfContraceptionRate"];
  let error;
  const errorArray: any[] = [];

  if (reversibleRates) {
    reversibleRates.forEach((reversibleRate, _index) => {
      if (
        reversibleRate &&
        reversibleRate?.numerator &&
        reversibleRate?.denominator &&
        parseFloat(reversibleRate?.numerator) >
          parseFloat(reversibleRate?.denominator)
      ) {
        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Reversible Method of Contraception Rate: Numerator must be less than or equal to Denominator for Age`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};
const validateModeratelyNumeratorLessThanDenominator = (data: Measure.Form) => {
  const moderatelyRates =
    data["PerformanceMeasure-ModeratelyEffectiveMethodOfContraceptionRate"];
  let error;
  const errorArray: any[] = [];

  if (moderatelyRates) {
    moderatelyRates.forEach((moderatelyRate, _index) => {
      if (
        moderatelyRate &&
        moderatelyRate.numerator &&
        moderatelyRate.denominator &&
        parseFloat(moderatelyRate?.numerator) >
          parseFloat(moderatelyRate?.denominator)
      ) {
        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Moderately Effective Method of Contraception Rate: Numerator must be less than or equal to Denominator for Age`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};

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

const validateNonZeroDenom = (data: Measure.Form) => {
  return validateNoNonZeroNumOrDenom(
    [
      data["PerformanceMeasure-ModeratelyEffectiveMethodOfContraceptionRate"],
      data["PerformanceMeasure-ReversibleMethodOfContraceptionRate"],
    ],
    data["OtherPerformanceMeasure-Rates"],
    [""]
  );
};

const validateAtLeastOneNPR = (data: Measure.Form) => {
  return atLeastOneRateComplete(
    [
      data["PerformanceMeasure-ModeratelyEffectiveMethodOfContraceptionRate"],
      data["PerformanceMeasure-ReversibleMethodOfContraceptionRate"],
    ],
    data["OtherPerformanceMeasure-Rates"],
    [""]
  );
};

const validateAtLeastOneDeviationNDR = (data: Measure.Form) => {
  const performanceMeasureArray = [
    data["PerformanceMeasure-ModeratelyEffectiveMethodOfContraceptionRate"],
    data["PerformanceMeasure-ReversibleMethodOfContraceptionRate"],
  ];

  // Array of deviation NDRs with empty/undefined values removed
  const deviationArray = [
    data["moderate-method-deviation"],
    data["reversible-method-deviation"],
  ].filter((data) => data);

  return validateAtLeastOneNDRInDeviationOfMeasureSpec(
    performanceMeasureArray,
    [""],
    deviationArray
  );
};

export const validationFunctions = [
  validateReversibleNumeratorLessThanDenominator,
  validateModeratelyNumeratorLessThanDenominator,
  validateLarcRateGreater,
  validateDenominatorsAreTheSame,
  validateNonZeroDenom,
  validateAtLeastOneNPR,
  validateAtLeastOneDeviationNDR,
];
