import * as DC from "dataConstants";
import * as GV from "shared/globalValidations";
import * as PMD from "./data";
import { OMSData } from "shared/commonQuestions/OptionalMeasureStrat/data";
//form type
import { DefaultFormDataLegacy as FormData } from "shared/types/FormData";

let OPM: any;

const IUHHValidation = (data: FormData) => {
  let errorArray: any[] = [];
  const dateRange = data[DC.DATE_RANGE];
  const definitionOfDenominator = data[DC.DEFINITION_OF_DENOMINATOR];
  const deviationArray = GV.getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    false
  );
  const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;
  const performanceMeasureArray = GV.getPerfMeasureRateArray(
    data,
    PMD.data.performanceMeasure
  );
  OPM = data[DC.OPM_RATES];
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];

  if (data[DC.DID_REPORT] === DC.NO) {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  // Quick reference list of all rate indices
  errorArray = [
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.validateBothDatesCompleted(dateRange),
    ...GV.validateYearFormat(dateRange),
    ...GV.ComplexValidateDualPopInformation(
      performanceMeasureArray,
      OPM,
      definitionOfDenominator
    ),

    // Performance Measure Validations
    ...GV.ComplexAtLeastOneRateComplete(performanceMeasureArray, OPM),
    ...GV.ComplexNoNonZeroNumOrDenom(
      performanceMeasureArray,
      OPM,
      PMD.ndrFormulas
    ),
    ...GV.ComplexValidateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      PMD.ndrFormulas,
      deviationArray,
      didCalculationsDeviate
    ),
    ...GV.ComplexValidateNDRTotals(
      performanceMeasureArray,
      PMD.categories,
      PMD.ndrFormulas
    ),
    ...GV.ComplexValueSameCrossCategory({
      rateData: performanceMeasureArray,
      OPM,
    }),

    // OMS Validations
    ...GV.omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: GV.omsLocationDictionary(
        OMSData(2022, true),
        PMD.qualifiers,
        PMD.categories
      ),
      validationCallbacks: [OMSValidations],
    }),
  ];
  return errorArray;
};

const OMSValidations: GV.Types.OmsValidationCallback = ({
  rateData,
  locationDictionary,
  label,
  categories,
  qualifiers,
}) => {
  return OPM === undefined
    ? [
        ...GV.ComplexNoNonZeroNumOrDenomOMS(
          rateData?.["iuhh-rate"]?.rates ?? {},
          false,
          PMD.ndrFormulas,
          `Optional Measure Stratification: ${locationDictionary(label)}`,
          categories
        ),
        ...GV.ComplexValidateNDRTotalsOMS(
          rateData?.["iuhh-rate"]?.rates ?? {},
          PMD.categories,
          PMD.ndrFormulas,
          `Optional Measure Stratification: ${locationDictionary(label)} Total`
        ),
        ...GV.ComplexValueSameCrossCategoryOMS(
          rateData?.["iuhh-rate"]?.rates ?? {},
          PMD.categories,
          PMD.qualifiers,
          `Optional Measure Stratification: ${locationDictionary(label)}`
        ),
      ]
    : [
        ...GV.ComplexNoNonZeroNumOrDenomOMS(
          rateData?.rates,
          true,
          PMD.ndrFormulas,
          `Optional Measure Stratification: ${locationDictionary(label)}`,
          qualifiers
        ),
      ];
};

export const validationFunctions = [IUHHValidation];
