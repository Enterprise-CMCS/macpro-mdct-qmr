import * as DC from "dataConstants";
import * as GV from "measures/2021/globalValidations";
import * as PMD from "./data";
import { OMSData } from "shared/commonQuestions/OptionalMeasureStrat/data";
//form type
import { DefaultFormDataLegacy as FormData } from "shared/types/FormData";

const ndrForumlas = [
  {
    numerator: 1,
    denominator: 0,
    rateIndex: 2,
  },
  {
    numerator: 3,
    denominator: 0,
    rateIndex: 4,
  },
  {
    numerator: 1,
    denominator: 3,
    rateIndex: 5,
  },
  {
    numerator: 7,
    denominator: 6,
    rateIndex: 8,
  },
];

const PCRHHValidation = (data: FormData) => {
  let errorArray: any[] = [];
  const ageGroups = PMD.qualifiers;
  const dateRange = data[DC.DATE_RANGE];
  const deviationArray = GV.getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    false
  );
  const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;
  const performanceMeasureArray = GV.getPerfMeasureRateArray(data, PMD.data);
  const OPM = data[DC.OPM_RATES];
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];

  if (data[DC.DID_REPORT] === DC.NO) {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  // Quick reference list of all rate indices
  // const rateLocations = ndrForumlas.map((ndr) => ndr.rateIndex);
  errorArray = [
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.validateBothDatesCompleted(dateRange),
    ...GV.validateYearFormat(dateRange),

    // Performance Measure Validations
    ...GV.PCRatLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...GV.PCRnoNonZeroNumOrDenom(performanceMeasureArray, OPM, ndrForumlas),
    ...GV.PCRvalidateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      ndrForumlas,
      deviationArray,
      didCalculationsDeviate
    ),

    // OMS Validations
    ...GV.omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: GV.omsLocationDictionary(
        OMSData(2021, true),
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
    return { rate: [rateData?.rates?.[x].OPM[0]] };
  });
  return [
    ...GV.PCRnoNonZeroNumOrDenom(
      [rateData?.["pcr-rate"] ?? []],
      rates ?? [],
      ndrForumlas,
      `Optional Measure Stratification: ${locationDictionary(label)}`
    ),
    ...GV.PCRatLeastOneRateComplete(
      [rateData?.["pcr-rate"] ?? []],
      rates ?? [],
      PMD.qualifiers,
      `Optional Measure Stratification: ${locationDictionary(label)}`,
      true
    ),
  ];
};

export const validationFunctions = [PCRHHValidation];
