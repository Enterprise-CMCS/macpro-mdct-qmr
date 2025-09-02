import * as DC from "dataConstants";
import * as GV from "shared/globalValidations";
import * as PMD from "./data";
import { OMSData } from "shared/commonQuestions/OptionalMeasureStrat/data";
//form type
import { DefaultFormData as FormData } from "shared/types/FormData";

const ndrForumlas = [
  {
    numerator: 1,
    denominator: 0,
    rate: 2,
  },
  {
    numerator: 3,
    denominator: 0,
    rate: 4,
  },
  {
    numerator: 1,
    denominator: 3,
    rate: 5,
  },
  {
    numerator: 7,
    denominator: 6,
    rate: 8,
  },
];

const PCRADValidation = (data: FormData) => {
  let errorArray: any[] = [];
  const ageGroups = PMD.qualifiers;
  const dateRange = data[DC.DATE_RANGE];
  const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;
  const deviationReason = data[DC.DEVIATION_REASON];
  const performanceMeasureArray = GV.getPerfMeasureRateArray(data, PMD.data);
  const OPM = data[DC.OPM_RATES];
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];

  if (data[DC.DID_REPORT] === DC.NO) {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  // Quick reference list of all rate indices
  // const rateLocations = ndrForumlas.map((ndr) => ndr.rate);
  errorArray = [
    ...GV.validateDateRangeRadioButtonCompletion(data),
    ...GV.validateBothDatesCompleted(dateRange),
    ...GV.validateYearFormat(dateRange),
    ...GV.validateHedisYear(data),
    ...GV.validateOPMRates(OPM),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.validateAtLeastOneDefinitionOfPopulation(data),
    ...GV.validateAtLeastOneDataSourceType(data),
    ...GV.validateAtLeastOneDeliverySystem(data),
    ...GV.validateFfsRadioButtonCompletion(data),

    // Performance Measure Validations
    ...GV.PCRatLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...GV.PCRnoNonZeroNumOrDenom(performanceMeasureArray, OPM, ndrForumlas),
    ...GV.validateDeviationTextFieldFilled(
      didCalculationsDeviate,
      deviationReason
    ),

    // OMS Validations
    ...GV.omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: GV.omsLocationDictionary(
        OMSData(2023),
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

export const validationFunctions = [PCRADValidation];
