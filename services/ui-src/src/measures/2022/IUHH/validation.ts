import * as DC from "dataConstants";
import * as GV from "measures/2022/shared/globalValidations";
import * as PMD from "./data";
import { OMSData } from "shared/commonQuestions/OptionalMeasureStrat/data";
//form type
import { DefaultFormData as FormData } from "measures/2022/shared/CommonQuestions/types";

// Rate structure by index in row
const ndrForumlas = [
  // Discharges per 1,000 Enrollee Months
  {
    numerator: 1,
    denominator: 0,
    rateIndex: 2,
  },
  // Days per 1,000 Enrollee Months
  {
    numerator: 3,
    denominator: 0,
    rateIndex: 4,
  },
  // Average Length of Stay
  {
    numerator: 3,
    denominator: 1,
    rateIndex: 5,
  },
];

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
  const performanceMeasureArray = GV.getPerfMeasureRateArray(data, PMD.data);
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
    ...GV.ComplexNoNonZeroNumOrDenom(performanceMeasureArray, OPM, ndrForumlas),
    ...GV.ComplexValidateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      ndrForumlas,
      deviationArray,
      didCalculationsDeviate
    ),
    ...GV.ComplexValidateNDRTotals(
      performanceMeasureArray,
      PMD.categories,
      ndrForumlas
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
}) => {
  const rates = Object.keys(rateData?.rates ?? {}).map((x) => {
    return { rate: [rateData?.rates?.[x]?.OPM?.[0]] };
  });
  return OPM === undefined
    ? [
        ...GV.ComplexNoNonZeroNumOrDenomOMS(
          rateData?.["iuhh-rate"]?.rates ?? {},
          rates ?? [],
          ndrForumlas,
          `Optional Measure Stratification: ${locationDictionary(label)}`
        ),
        ...GV.ComplexValidateNDRTotalsOMS(
          rateData?.["iuhh-rate"]?.rates ?? {},
          PMD.categories,
          ndrForumlas,
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
          rates ?? [],
          ndrForumlas,
          `Optional Measure Stratification: ${locationDictionary(label)}`
        ),
      ];
};

export const validationFunctions = [IUHHValidation];
