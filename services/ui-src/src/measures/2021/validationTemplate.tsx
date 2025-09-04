import * as DC from "dataConstants";
import * as GV from "shared/globalValidations";

import * as PMD from "./ADDCH/data";

//form type
import { DefaultFormDataLegacy as FormData } from "shared/types/FormData";

const commonValidations = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const performanceMeasureArray = GV.getPerfMeasureRateArray(
    data,
    PMD.data.performanceMeasure
  );
  const dateRange = data[DC.DATE_RANGE];
  const deviationArray = GV.getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    true
  );
  const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;

  const validationList = {
    validateRequiredRadioButtonForCombinedRates:
      GV.validateRequiredRadioButtonForCombinedRates(data),
    validateBothDatesCompleted: GV.validateBothDatesCompleted(dateRange),
    validateYearFormat: GV.validateYearFormat(dateRange),
    validateAtLeastOneDeviationFieldFilled:
      GV.validateAtLeastOneDeviationFieldFilled(
        performanceMeasureArray,
        ageGroups,
        deviationArray,
        didCalculationsDeviate
      ),
    validateAtLeastOneDataSource: GV.validateAtLeastOneDataSource(data),
  };

  type validationKeys = keyof typeof validationList;

  const errors = [];
  for (const validation of PMD.validations.common) {
    if (validationList[validation as validationKeys]) {
      errors.push(...validationList[validation as validationKeys]);
    }
  }
  return errors;
};

const pmValidations = (data: FormData) => {
  return [];
};

const omsValidations = (data: FormData) => {
  return [];
};

export const validationTemplate = (data: FormData) => {
  //if user selects no on "are you reporting on this measure?"
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];
  if (data[DC.DID_REPORT] === DC.NO) {
    return [...GV.validateReasonForNotReporting(whyNotReporting)];
  }

  let errorArray: any[] = [];
  errorArray.push(...commonValidations(data));
  errorArray.push(...pmValidations(data));
  errorArray.push(...omsValidations(data));

  return errorArray;
};

export const validationFunctions = [validationTemplate];
