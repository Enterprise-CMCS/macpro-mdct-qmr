import * as PMD from "./data";
import * as DC from "dataConstants";
import * as GV from "measures/globalValidations";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";
import { FormData } from "./types";

const HPCADValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const age65PlusIndex = 1;
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray =
    GV.getPerfMeasureRateArray(data, PMD.data) ?? [];
  const dateRange = data["DateRange"];
  const deviationArray = GV.getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    true
  );
  const didCalculationsDeviate = data["DidCalculationsDeviate"] === DC.YES;

  let errorArray: any[] = [];
  if (data["DidReport"] === "no") {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }
  const DefinitionOfDenominator = data[DC.DEFINITION_OF_DENOMINATOR];
  const includesHybridDataSource = data["DataSource"]?.includes(
    DC.HYBRID_ADMINSTRATIVE_AND_MEDICAL_RECORDS_DATA
  );

  errorArray = [
    ...errorArray,
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
        ...(includesHybridDataSource
          ? []
          : [GV.validateRateNotZero, GV.validateRateZero]),
      ],
    }),
    ...GV.validateDualPopInformation(
      performanceMeasureArray,
      OPM,
      age65PlusIndex,
      DefinitionOfDenominator
    ),
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
    ...GV.validateAllDenomsTheSameCrossQualifier(
      data,
      PMD.categories,
      PMD.qualifiers
    ),
    ...(includesHybridDataSource
      ? []
      : GV.validateNoNonZeroNumOrDenom(
          performanceMeasureArray,
          OPM,
          ageGroups
        )),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.ensureBothDatesCompletedInRange(dateRange),
  ];

  return errorArray;
};

export const validationFunctions = [HPCADValidation];
