import * as DC from "dataConstants";
import * as GV from "shared/globalValidations";
import { OMSData } from "shared/commonQuestions/OptionalMeasureStrat/data";

//form type
import { DefaultFormDataLegacy as FormData } from "shared/types/FormData";
import { LabelData } from "utils";
import { FormRateField } from "shared/types/TypeValidations";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

const commonValidations = (
  data: FormData,
  validations: string[],
  performanceMeasureArray: FormRateField[][],
  qualifiers: LabelData[]
) => {
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
        qualifiers,
        deviationArray,
        didCalculationsDeviate
      ),
    validateAtLeastOneDataSource: GV.validateAtLeastOneDataSource(data),
  };

  type validationKeys = keyof typeof validationList;

  const errors = [];
  for (const validation of validations) {
    if (validationList[validation as validationKeys]) {
      errors.push(...validationList[validation as validationKeys]);
    }
  }
  return errors;
};

const pmValidations = (
  data: FormData,
  validations: string[],
  performanceMeasureArray: FormRateField[][],
  categories: LabelData[],
  qualifiers: LabelData[]
) => {
  const OPM = data[DC.OPM_RATES];

  const validationList = {
    validateAtLeastOneRateComplete: GV.validateAtLeastOneRateComplete(
      performanceMeasureArray,
      OPM,
      qualifiers,
      categories
    ),
    validateRateZeroPM: GV.validateRateZeroPM(
      performanceMeasureArray,
      OPM,
      qualifiers,
      data
    ),
    validateRateNotZeroPM: GV.validateRateNotZeroPM(
      performanceMeasureArray,
      OPM,
      qualifiers
    ),
    validateNumeratorsLessThanDenominatorsPM:
      GV.validateNumeratorsLessThanDenominatorsPM(
        performanceMeasureArray,
        OPM,
        qualifiers
      ),
    validateOneQualDenomHigherThanOtherDenomPM:
      GV.validateOneQualDenomHigherThanOtherDenomPM(data, {
        categories,
        qualifiers,
      }),
  };

  type validationKeys = keyof typeof validationList;

  const errors = [];
  for (const validation of validations) {
    if (validationList[validation as validationKeys]) {
      errors.push(...validationList[validation as validationKeys]);
    }
  }
  return errors;
};

const omsValidations = (
  data: FormData,
  validations: string[],
  categories: LabelData[],
  qualifiers: LabelData[]
) => {
  const validationCallbacks = {
    validateNumeratorLessThanDenominatorOMS:
      GV.validateNumeratorLessThanDenominatorOMS(),
    validateRateZeroOMS: GV.validateRateZeroOMS(),
    validateRateNotZeroOMS: GV.validateRateNotZeroOMS(),
    validateOneQualDenomHigherThanOtherDenomOMS:
      GV.validateOneQualDenomHigherThanOtherDenomOMS(),
  };

  type validationKeys = keyof typeof validationCallbacks;
  const callbacks = validations
    .filter((validation) => validationCallbacks[validation as validationKeys])
    .map((validation) => validationCallbacks[validation as validationKeys]);

  return [
    ...GV.omsValidations({
      data,
      qualifiers: qualifiers,
      categories: categories,
      locationDictionary: GV.omsLocationDictionary(
        OMSData(2021, true),
        qualifiers,
        categories
      ),
      validationCallbacks: [...callbacks],
    }),
  ];
};

export const validationTemplate = (
  data: FormData,
  PMD: MeasureTemplateData
) => {
  console.log("data", data);
  console.log("PMD", PMD);

  const { categories, qualifiers } = PMD.performanceMeasure;

  const performanceMeasureArray = GV.getPerfMeasureRateArray(
    data,
    PMD.performanceMeasure
  );
  const { common, pm, oms } = PMD.validations;

  //if user selects no on "are you reporting on this measure?"
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];
  if (data[DC.DID_REPORT] === DC.NO) {
    return [...GV.validateReasonForNotReporting(whyNotReporting)];
  }

  let errorArray: any[] = [];
  errorArray.push(
    ...commonValidations(data, common, performanceMeasureArray, qualifiers!)
  );
  errorArray.push(
    ...pmValidations(
      data,
      pm,
      performanceMeasureArray,
      categories!,
      qualifiers!
    )
  );
  errorArray.push(...omsValidations(data, oms, categories!, qualifiers!));

  return errorArray;
};

export const validationFunctions = [validationTemplate];
