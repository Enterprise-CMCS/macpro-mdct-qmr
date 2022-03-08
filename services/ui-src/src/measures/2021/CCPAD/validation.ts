import { FormData } from "./types";
import * as PMD from "./data";
import {
  getPerfMeasureRateArray,
  omsLocationDictionary,
  getDeviationNDRArray,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
  ensureBothDatesCompletedInRange,
  validateRequiredRadioButtonForCombinedRates,
  validateReasonForNotReporting,
  atLeastOneRateComplete,
  validateNumeratorsLessThanDenominators,
  validateNoNonZeroNumOrDenom,
} from "measures/globalValidations";
import {
  omsValidations,
  validateDenominatorGreaterThanNumerator,
  validateDenominatorsAreTheSame,
  validateOneRateLessThanOther,
} from "measures/globalValidations/omsValidationsLib";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

const validateDenominatorsAreEqual = (data: FormData) => {
  const perfMeasure = getPerfMeasureRateArray(data, PMD.data);
  const larcCont = perfMeasure[1];
  const memeCont = perfMeasure[0];
  const errorArray: any[] = [];

  if (larcCont?.length && memeCont?.length) {
    for (const larcRate of larcCont) {
      for (const memeRate of memeCont) {
        if (larcRate?.denominator && memeRate?.denominator) {
          const larcParsedInt = parseFloat(larcRate.denominator);
          const memeParsedInt = parseFloat(memeRate.denominator);
          if (larcParsedInt !== memeParsedInt) {
            errorArray.push({
              errorLocation: "Performance Measure",
              errorMessage:
                "All denominators of Long-acting Reversible Method of Contraception (LARC) Rates and Most Effective and Moderately Effective Method of Contraception must be the same.",
            });
            break;
          }
        }
      }
      if (errorArray.length) break;
    }
  }

  return errorArray;
};

const CCPADValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const deviationArray = getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    true
  );

  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);

  let errorArray: any[] = [];
  if (data["DidReport"] === "no") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  const dateRange = data["DateRange"];
  errorArray = [
    ...errorArray,
    ...validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      ageGroups,
      deviationArray
    ),
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
    ...ensureBothDatesCompletedInRange(dateRange),
    ...validateDenominatorsAreEqual(data),
  ];

  return errorArray;
};

const validateOMS = (data: FormData) => {
  const errorArray: FormError[] = [];

  errorArray.push(
    ...omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: omsLocationDictionary(OMSData(true)),
      validationCallbacks: [
        validateDenominatorGreaterThanNumerator,
        validateDenominatorsAreTheSame,
        validateOneRateLessThanOther,
      ],
    })
  );

  return errorArray;
};

export const validationFunctions = [
  CCPADValidation,
  validateRequiredRadioButtonForCombinedRates,
  validateOMS,
];
