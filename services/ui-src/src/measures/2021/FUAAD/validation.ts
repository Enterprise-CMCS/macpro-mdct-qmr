import * as PMD from "./data";
import * as DC from "dataConstants";
import { FormData } from "./types";
import * as GV from "measures/globalValidations";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

const FUAADValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const sixtyDaysIndex = 1;
  const dateRange = data["DateRange"];
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = GV.getPerfMeasureRateArray(data, PMD.data);
  const validateDualPopInformationArray = [performanceMeasureArray?.[1]];
  const didCalculationsDeviate = data["DidCalculationsDeviate"] === DC.YES;
  const deviationArray = GV.getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    true
  );

  const DefinitionOfDenominator = data["DefinitionOfDenominator"];

  let errorArray: any[] = [];
  if (data["DidReport"] === "no") {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  let sameDenominatorError = [
    ...GV.validateEqualDenominators(performanceMeasureArray, ageGroups),
  ];
  sameDenominatorError =
    sameDenominatorError.length > 0 ? [...sameDenominatorError] : [];
  errorArray = [
    ...errorArray,
    ...GV.atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...GV.validateOneDataSource(data),
    ...GV.validateDualPopInformation(
      validateDualPopInformationArray,
      OPM,
      sixtyDaysIndex,
      DefinitionOfDenominator
    ),
    ...GV.validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...sameDenominatorError,
    ...GV.validateNoNonZeroNumOrDenom(
      performanceMeasureArray,
      OPM,
      ageGroups,
      data
    ),
    ...GV.validateOneRateHigherThanOther(data, PMD.data),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.ensureBothDatesCompletedInRange(dateRange),
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
        GV.validateDenominatorsAreTheSame,
        GV.validateOneRateLessThanOther,
        GV.validateRateZero,
        GV.validateRateNotZero,
      ],
    }),
    ...GV.validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      PMD.qualifiers,
      deviationArray,
      didCalculationsDeviate
    ),
  ];

  return errorArray;
};

export const validationFunctions = [FUAADValidation];
