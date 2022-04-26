import * as DC from "dataConstants";
import * as GV from "measures/globalValidations";
import * as PMD from "./data";
import { FormData } from "./types";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

const CCPCHValidation = (data: FormData) => {
  const ageGroups = ["Ages 19 to 50", "Ages 51 to 64", "Total (Ages 19 to 64)"];
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
    ...GV.validateAtLeastOneRateComplete(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...GV.validateBothDatesInRange(dateRange),
    ...GV.validateEqualCategoryDenominatorsPM(data, PMD.categories),
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.validateAtLeastOneDeviationFieldFilled(
      performanceMeasureArray,
      ageGroups,
      deviationArray,
      didCalculationsDeviate
    ),
    ...GV.validateNoNonZeroNumOrDenomPM(
      performanceMeasureArray,
      OPM,
      ageGroups,
      data
    ),
    ...GV.validateNumeratorsLessThanDenominatorsPM(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...GV.validateOneCatRateHigherThanOtherCatPM(data, PMD.data),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.validateOneQualRateHigherThanOtherQualPM(data, PMD.data),

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
        GV.validateEqualCategoryDenominatorsOMS,
        GV.validateCrossQualifierRateCorrect,
        GV.validateNumeratorLessThanDenominatorOMS,
        GV.validateOneCatRateLessThanOtherCatOMS(),
        GV.validateRateNotZeroOMS,
        GV.validateRateZeroOMS,
      ],
    }),
  ];
  return errorArray;
};

export const validationFunctions = [CCPCHValidation];
