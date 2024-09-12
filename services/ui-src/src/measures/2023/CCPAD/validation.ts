import * as DC from "dataConstants";
import * as GV from "measures/2023/shared/globalValidations";
import * as PMD from "./data";
import { OMSData } from "shared/commonQuestions/OptionalMeasureStrat/data";
//form type
import { DefaultFormData as FormData } from "shared/types/FormData";

const CCPADValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const dateRange = data[DC.DATE_RANGE];
  const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;
  const deviationReason = data[DC.DEVIATION_REASON];
  const OPM = data[DC.OPM_RATES];
  const performanceMeasureArray = GV.getPerfMeasureRateArray(data, PMD.data);
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];

  let errorArray: any[] = [];
  if (data[DC.DID_REPORT] === DC.NO) {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  errorArray = [
    // Performance Measure and OPM Validations
    ...GV.validateAtLeastOneRateComplete(
      performanceMeasureArray,
      OPM,
      ageGroups,
      PMD.categories
    ),
    ...GV.validateDateRangeRadioButtonCompletion(data),
    ...GV.validateBothDatesCompleted(dateRange),
    ...GV.validateYearFormat(dateRange),
    ...GV.validateOPMRates(OPM),
    ...GV.validateOneQualRateHigherThanOtherQualPM(data, PMD.data, 1, 0),
    ...GV.validateEqualCategoryDenominatorsPM(data, PMD.categories),
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.validateAtLeastOneDataSourceType(data),
    ...GV.validateAtLeastOneDeviationFieldFilled(
      didCalculationsDeviate,
      deviationReason
    ),
    ...GV.validateRateNotZeroPM(performanceMeasureArray, OPM, ageGroups),
    ...GV.validateRateZeroPM(performanceMeasureArray, OPM, ageGroups, data),
    ...GV.validateNumeratorsLessThanDenominatorsPM(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...GV.validateOneCatRateHigherThanOtherCatPM(data, PMD.data),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.validateAtLeastOneDeliverySystem(data),
    ...GV.validateFfsRadioButtonCompletion(data),
    ...GV.validateAtLeastOneDefinitionOfPopulation(data),

    // OMS Specific Validations
    ...GV.omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: GV.omsLocationDictionary(
        OMSData(2023),
        PMD.qualifiers,
        PMD.categories
      ),
      validationCallbacks: [
        GV.validateEqualCategoryDenominatorsOMS(),
        GV.validateOneQualRateHigherThanOtherQualOMS(1, 0),
        GV.validateNumeratorLessThanDenominatorOMS(),
        GV.validateOneCatRateHigherThanOtherCatOMS(),
        GV.validateRateNotZeroOMS(),
        GV.validateRateZeroOMS(),
      ],
    }),
  ];

  return errorArray;
};

export const validationFunctions = [CCPADValidation];
