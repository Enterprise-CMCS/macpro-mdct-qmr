import * as PMD from "./data";
import * as DC from "dataConstants";
import { FormData } from "./types";
import * as GV from "measures/globalValidations";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

const WCCHValidation = (data: FormData) => {
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const dateRange = data["DateRange"];
  const performanceMeasureArray = GV.getPerfMeasureRateArray(data, PMD.data);
  const includesHybridDataSource = data["DataSource"]?.includes(
    DC.HYBRID_ADMINSTRATIVE_AND_MEDICAL_RECORDS_DATA
  );

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

  let sameDenominatorError = [
    ...GV.validateEqualDenominators(performanceMeasureArray, PMD.qualifiers),
  ];
  sameDenominatorError =
    sameDenominatorError.length > 0 ? [...sameDenominatorError] : [];
  errorArray = [
    ...errorArray,
    ...GV.atLeastOneRateComplete(performanceMeasureArray, OPM, PMD.qualifiers),
    ...GV.validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      PMD.qualifiers
    ),
    ...sameDenominatorError,
    ...GV.validateNoNonZeroNumOrDenom(
      performanceMeasureArray,
      OPM,
      PMD.qualifiers,
      includesHybridDataSource
    ),
    ...GV.validateOneRateHigherThanOther(data, PMD.data),
    ...GV.ensureBothDatesCompletedInRange(dateRange),
    ...GV.validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      PMD.qualifiers,
      deviationArray,
      didCalculationsDeviate
    ),
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
        GV.validateRateNotZero,
        GV.validateOMSTotalNDR,
        ...(includesHybridDataSource ? [] : [GV.validateRateZero]),
      ],
    }),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.validateTotalNDR(performanceMeasureArray, undefined, PMD.categories),
  ];

  return errorArray;
};

export const validationFunctions = [WCCHValidation];
