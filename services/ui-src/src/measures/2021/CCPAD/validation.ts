import * as DC from "dataConstants";
import * as GV from "measures/globalValidations";
import * as PMD from "./data";
import { FormData } from "./types";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

const CCPADValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const dateRange = data["DateRange"];
  const deviationArray = GV.getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    true
  );
  const didCalculationsDeviate = data["DidCalculationsDeviate"] === DC.YES;
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = GV.getPerfMeasureRateArray(data, PMD.data);
  const whyNotReporting = data["WhyAreYouNotReporting"];

  let errorArray: any[] = [];
  if (data["DidReport"] === "no") {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  errorArray = [
    // Performance Measure and OPM Validations
    ...GV.atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...GV.ensureBothDatesCompletedInRange(dateRange),
    ...GV.validate3daysLessOrEqualTo30days(data, PMD.data),
    ...GV.validateAllDenomsTheSameCrossQualifier(data, PMD.categories),
    ...GV.validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      ageGroups,
      deviationArray,
      didCalculationsDeviate
    ),
    ...GV.validateNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ageGroups,data),
    ...GV.validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...GV.validateOneRateHigherThanOther(data, PMD.data),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),

    // OMS Specific Validations
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
        GV.validateAllDenomsAreTheSameCrossQualifier,
        GV.validateCrossQualifierRateCorrect,
        GV.validateDenominatorGreaterThanNumerator,
        GV.validateOneRateLessThanOther,
        GV.validateRateNotZero,
        GV.validateRateZero,
      ],
    }),
  ];

  return errorArray;
};

export const validationFunctions = [CCPADValidation];
