import * as DC from "dataConstants";
import * as GV from "shared/globalValidations";
import * as PMD from "./data";
//form type
import { DefaultFormData as FormData } from "shared/types/FormData";

const CPUADValidation = (data: FormData) => {
  const carePlans = PMD.qualifiers;
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];
  const performanceMeasureArray = GV.getPerfMeasureRateArray(
    data,
    PMD.data.performanceMeasure
  );

  let errorArray: any[] = [];
  const OPM = data[DC.OPM_RATES];
  const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;
  const deviationReason = data[DC.DEVIATION_REASON];
  const dateRange = data[DC.DATE_RANGE];

  if (data[DC.DID_REPORT] === DC.NO) {
    errorArray = [...GV.validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  errorArray = [
    ...errorArray,
    ...GV.validateAtLeastOneRateComplete(
      performanceMeasureArray,
      OPM,
      carePlans,
      PMD.categories
    ),
    ...GV.validateNumeratorsLessThanDenominatorsPM(
      performanceMeasureArray,
      OPM,
      carePlans
    ),
    ...GV.validateRateNotZeroPM(performanceMeasureArray, OPM, carePlans),
    ...GV.validateRateZeroPM(performanceMeasureArray, OPM, carePlans, data),
    ...GV.validateEqualCategoryDenominatorsPM(data, PMD.categories, carePlans),
    ...GV.validateOneQualRateHigherThanOtherQualPM(data, PMD),
    ...GV.validateAtLeastOneDeliverySystem(data),
    ...GV.validateFfsRadioButtonCompletion(data),
    ...GV.validateRequiredRadioButtonForCombinedRates(data),
    ...GV.validateDateRangeRadioButtonCompletion(data),
    ...GV.validateBothDatesCompleted(dateRange),
    ...GV.validateYearFormat(dateRange),
    ...GV.validateHedisYear(data),
    ...GV.validateOPMRates(OPM),
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.validateAtLeastOneDefinitionOfPopulation(data),

    ...GV.validateAtLeastOneDataSourceType(data),
    ...GV.validateDeviationTextFieldFilled(
      didCalculationsDeviate,
      deviationReason
    ),
  ];

  return errorArray;
};

export const validationFunctions = [CPUADValidation];
