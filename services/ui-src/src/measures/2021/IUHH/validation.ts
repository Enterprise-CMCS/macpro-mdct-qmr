import * as DC from "dataConstants";
import * as GV from "measures/globalValidations";
import * as PMD from "./data";
import { FormData } from "./types";
// import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

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

const IUHHValidation = (data: FormData) => {
  let errorArray: any[] = [];
  // const ageGroups = PMD.qualifiers;
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

  // console.log(
  //   ageGroups,
  //   deviationArray,
  //   didCalculationsDeviate,
  //   performanceMeasureArray,
  //   OPM
  // );

  // Quick reference list of all rate indices
  // const rateLocations = ndrForumlas.map((ndr) => ndr.rateIndex);
  errorArray = [
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.validateBothDatesCompleted(dateRange),

    // Performance Measure Validations
    ...GV.IUHHatLeastOneRateComplete(performanceMeasureArray, OPM),
    ...GV.IUHHnoNonZeroNumOrDenom(performanceMeasureArray, OPM, ndrForumlas),
    ...GV.IUHHvalidateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      ndrForumlas,
      deviationArray,
      didCalculationsDeviate
    ),
    ...GV.IUHHvalidateNDRTotals(
      performanceMeasureArray,
      PMD.categories,
      ndrForumlas
    ),

    // OMS Validations
    // ...GV.omsValidations({
    //   data,
    //   qualifiers: PMD.qualifiers,
    //   categories: PMD.categories,
    //   locationDictionary: GV.omsLocationDictionary(
    //     OMSData(true),
    //     PMD.qualifiers,
    //     PMD.categories
    //   ),
    //   validationCallbacks: [OMSValidations],
    // }),
  ];
  return errorArray;
};

// const OMSValidations: GV.Types.OmsValidationCallback = ({
//   rateData,
//   locationDictionary,
//   label,
// }) => {
//   const rates = Object.keys(rateData?.rates ?? {}).map((x) => {
//     return { rate: [rateData?.rates?.[x].OPM[0]] };
//   });
//   return [
//     ...GV.IUHHnoNonZeroNumOrDenom(
//       [rateData?.["pcr-rate"] ?? []],
//       rates ?? [],
//       `Optional Measure Stratification: ${locationDictionary(label)}`
//     ),
//     ...GV.IUHHatLeastOneRateComplete(
//       [rateData?.["pcr-rate"] ?? []],
//       rates ?? [],
//       PMD.qualifiers,
//       `Optional Measure Stratification: ${locationDictionary(label)}`
//     ),
//     ...GV.IUHHvalidateNDRTotals(
//       [rateData?.["pcr-rate"] ?? []],
//       `Optional Measure Stratification: ${locationDictionary(label)} Total`
//     ),
//   ];
// };

export const validationFunctions = [IUHHValidation];
