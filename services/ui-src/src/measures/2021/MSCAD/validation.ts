import * as Types from "measures/CommonQuestions/types";
import * as DC from "dataConstants";
import * as GV from "measures/globalValidations";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";
import * as PMD from "./data";

const MSCADValidation = (data: Types.DefaultFormData) => {
  const ageGroups = PMD.qualifiers;
  const age65PlusIndex = 1;
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const performanceMeasureArray = GV.getPerfMeasureRateArray(data, PMD.data);
  const DefinitionOfDenominator = data["DefinitionOfDenominator"];
  const dateRange = data["DateRange"];
  const didCalculationsDeviate = data["DidCalculationsDeviate"] === DC.YES;

  const deviationArray = GV.getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    true
  );

  let errorArray: any[] = [];
  if (data["DidReport"] === "no") {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  errorArray = [
    ...errorArray,
    ...GV.atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...GV.validateDualPopInformation(
      performanceMeasureArray,
      OPM,
      age65PlusIndex,
      DefinitionOfDenominator
    ),
    ...GV.validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...GV.ensureBothDatesCompletedInRange(dateRange),
    ...GV.validateNoNonZeroNumOrDenom(
      performanceMeasureArray,
      OPM,
      ageGroups,
      data
    ),
    ...GV.validateOneDataSource(data),
    ...GV.validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      ageGroups,
      deviationArray,
      didCalculationsDeviate
    ),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
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
        GV.validateRateZero,
        GV.validateRateNotZero,
      ],
    }),
  ];

  return errorArray;
};

export const validationFunctions = [MSCADValidation];
