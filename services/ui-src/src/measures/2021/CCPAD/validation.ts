import * as DC from "dataConstants";
import * as GV from "measures/globalValidations";
import * as PMD from "./data";
import { FormData } from "./types";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

const validate3daysLessOrEqualTo30days = (data: FormData) => {
  const perfMeasure = GV.getPerfMeasureRateArray(data, PMD.data);
  const sevenDays = perfMeasure[1];
  const thirtyDays = perfMeasure[0];

  const errorArray: any[] = [];

  if (sevenDays?.length === 2) {
    if (
      parseFloat(sevenDays[0]?.rate ?? "") >
      parseFloat(sevenDays[1]?.rate ?? "")
    ) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage: `The rate value of the ${PMD.qualifiers[0]} must be less than or equal to the ${PMD.qualifiers[1]} within ${PMD.categories[1]}.`,
      });
    }
  }
  if (thirtyDays?.length === 2) {
    if (
      parseFloat(thirtyDays[0]?.rate ?? "") >
      parseFloat(thirtyDays[1]?.rate ?? "")
    ) {
      errorArray.push({
        errorLocation: "Performance Measure",
        errorMessage: `The rate value of the ${PMD.qualifiers[0]} must be less than or equal to the ${PMD.qualifiers[1]} within ${PMD.categories[0]}.`,
      });
    }
  }

  return errorArray;
};

const CCPADValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const deviationArray = GV.getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    true
  );

  const performanceMeasureArray = GV.getPerfMeasureRateArray(data, PMD.data);

  let errorArray: any[] = [];
  if (data["DidReport"] === "no") {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }
  const didCalculationsDeviate = data["DidCalculationsDeviate"] === DC.YES;

  const dateRange = data["DateRange"];
  errorArray = [
    ...errorArray,
    ...GV.validateAllDenomsTheSameCrossQualifier(data, PMD.categories),
    ...GV.validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      ageGroups,
      deviationArray,
      didCalculationsDeviate
    ),
    ...GV.atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...GV.validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...GV.validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups),
    ...GV.ensureBothDatesCompletedInRange(dateRange),
    ...GV.validateOneRateHigherThanOther(data, PMD.data),
  ];

  return errorArray;
};

const validateOMS = (data: FormData) => {
  const errorArray: FormError[] = [];

  errorArray.push(
    ...GV.omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: GV.omsLocationDictionary(
        OMSData(true),
        PMD.qualifiers,
        PMD.categories
      ),
      validationCallbacks: [
        GV.validateDenominatorGreaterThanNumerator,
        // validateDenominatorsAreTheSame,
        GV.validateOneRateLessThanOther,
        GV.validateCrossQualifierRateCorrect,
        GV.validateRateZero,
        GV.validateRateNotZero,
        GV.validateAllDenomsAreTheSameCrossQualifier,
      ],
    })
  );

  return errorArray;
};

export const validationFunctions = [
  CCPADValidation,
  GV.validateRequiredRadioButtonForCombinedRates,
  validateOMS,
  validate3daysLessOrEqualTo30days,
];
