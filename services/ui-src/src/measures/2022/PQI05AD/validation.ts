import * as DC from "dataConstants";
import * as GV from "shared/globalValidations";
import * as PMD from "./data";
import { OMSData } from "shared/commonQuestions/OptionalMeasureStrat/data";
//form type
import { DefaultFormDataLegacy as FormData } from "shared/types/FormData";

const PQI05Validation = (data: FormData) => {
  const OPM = data[DC.OPM_RATES];
  const ageGroups = PMD.qualifiers;
  const dateRange = data[DC.DATE_RANGE];
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];
  const performanceMeasureArray = GV.getPerfMeasureRateArray(
    data,
    PMD.data.performanceMeasure
  );
  const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;

  const deviationArray = GV.getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations
  );

  const age65PlusIndex = 0;
  const validateDualPopInformationArray = [
    performanceMeasureArray?.[0].filter((pm) => {
      return pm?.label === "Age 65 and older";
    }),
  ];
  const definitionOfDenominator = data[DC.DEFINITION_OF_DENOMINATOR];

  let errorArray: any[] = [];
  if (data[DC.DID_REPORT] === DC.NO) {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }
  errorArray = [
    ...errorArray,
    ...GV.validateBothDatesCompleted(dateRange),
    ...GV.validateYearFormat(dateRange),
    ...GV.validateRateNotZeroPM(performanceMeasureArray, OPM, PMD.qualifiers),
    ...GV.validateRateZeroPM(
      performanceMeasureArray,
      OPM,
      PMD.qualifiers,
      data
    ),
    ...GV.validateDualPopInformationPM(
      validateDualPopInformationArray,
      OPM,
      1,
      ageGroups.map((item) => item.label)
    ),
    ...GV.validateAtLeastOneDeviationFieldFilled(
      performanceMeasureArray,
      PMD.qualifiers,
      deviationArray,
      didCalculationsDeviate
    ),
    ...GV.validateDualPopInformationPM(
      validateDualPopInformationArray,
      OPM,
      age65PlusIndex,
      definitionOfDenominator
    ),
    ...GV.validateAtLeastOneRateComplete(
      performanceMeasureArray,
      OPM,
      ageGroups,
      PMD.categories
    ),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: GV.omsLocationDictionary(
        OMSData(2022, true),
        PMD.qualifiers,
        PMD.categories
      ),
      validationCallbacks: [
        GV.validateRateZeroOMS(),
        GV.validateRateNotZeroOMS(),
      ],
    }),
  ];

  return errorArray;
};

export const validationFunctions = [PQI05Validation];
