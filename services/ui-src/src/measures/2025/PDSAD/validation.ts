import * as DC from "dataConstants";
import * as GV from "shared/globalValidations";
import * as PMD from "./data";
import { OMSData } from "shared/commonQuestions/OptionalMeasureStrat/data";
//form type
import { DefaultFormData as FormData } from "shared/types/FormData";

const PDSValidation = (data: FormData) => {
  const OPM = data[DC.OPM_RATES];
  const ageGroups = PMD.qualifiers;
  const performanceMeasureArray =
    GV.getPerfMeasureRateArray(data, PMD.data.performanceMeasure) ?? [];
  const dateRange = data[DC.DATE_RANGE];
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];
  const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;
  const deviationReason = data[DC.DEVIATION_REASON];

  let errorArray: any[] = [];
  if (data[DC.DID_REPORT] === DC.NO) {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  errorArray = [
    ...errorArray,
    ...GV.validateOneQualDenomHigherThanOtherDenomPM(data, PMD),
    ...GV.validateAtLeastOneRateComplete(
      performanceMeasureArray,
      OPM,
      PMD.qualifiers,
      PMD.categories
    ),
    ...GV.validateDateRangeRadioButtonCompletion(data),
    ...GV.validateBothDatesCompleted(dateRange),
    ...GV.validateYearFormat(dateRange),
    ...GV.validateAtLeastOneDefinitionOfPopulation(data),
    ...GV.validateOPMRates(OPM),
    ...GV.validateNumeratorsLessThanDenominatorsPM(
      performanceMeasureArray,
      OPM,
      PMD.qualifiers
    ),
    ...GV.validateDeviationTextFieldFilled(
      didCalculationsDeviate,
      deviationReason
    ),
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.validateAtLeastOneDataSourceType(data),
    ...GV.validateAtLeastOneDeliverySystem(data),
    ...GV.validateFfsRadioButtonCompletion(data),
    ...GV.omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: GV.omsLocationDictionary(
        OMSData(2025),
        PMD.qualifiers,
        PMD.categories
      ),
      validationCallbacks: [
        GV.validateNumeratorLessThanDenominatorOMS(),
        GV.validateNumeratorLessThanDenominatorOMS(),
        GV.validateRateZeroOMS(),
        GV.validateRateNotZeroOMS(),
      ],
    }),
    ...GV.validateRateNotZeroPM(performanceMeasureArray, OPM, ageGroups),
    ...GV.validateRateZeroPM(performanceMeasureArray, OPM, ageGroups, data),
  ];

  return errorArray;
};

export const validationFunctions = [PDSValidation];
