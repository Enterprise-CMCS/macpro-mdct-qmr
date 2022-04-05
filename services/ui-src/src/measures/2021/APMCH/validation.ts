import * as DC from "dataConstants";
import * as GV from "measures/globalValidations";
import * as PMD from "./data";
import { FormData } from "./types";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

const APMCHValidation = (data: FormData) => {
  const dateRange = data["DateRange"];
  const deviationArray = GV.getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    true
  );
  const didCalculationsDeviate = data["DidCalculationsDeviate"] === DC.YES;
  const includesHybridDataSource = data["DataSource"]?.includes(
    DC.HYBRID_ADMINSTRATIVE_AND_MEDICAL_RECORDS_DATA
  );
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
    ...GV.atLeastOneRateComplete(performanceMeasureArray, OPM, PMD.qualifiers),
    ...GV.validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      PMD.qualifiers
    ),
    ...GV.validateNoNonZeroNumOrDenom(
      performanceMeasureArray,
      OPM,
      PMD.qualifiers,
      includesHybridDataSource
    ),
    ...GV.ensureBothDatesCompletedInRange(dateRange),
    ...GV.validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      PMD.qualifiers,
      deviationArray,
      didCalculationsDeviate
    ),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.validateTotalNDR(performanceMeasureArray, undefined, PMD.categories),
    ...GV.validateEqualDenominators(performanceMeasureArray, PMD.qualifiers),

    // OMS Validations
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
        GV.validateRateNotZero,
        GV.validateOMSTotalNDR,
        ...(includesHybridDataSource ? [] : [GV.validateRateZero]),
      ],
    }),
  ];

  return errorArray;
};

export const validationFunctions = [APMCHValidation];
