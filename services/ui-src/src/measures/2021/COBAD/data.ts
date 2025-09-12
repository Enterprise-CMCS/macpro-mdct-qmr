import { getCatQualLabels } from "../rateLabelText";
import * as GV from "shared/globalValidations";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("COB-AD");

export const data: MeasureTemplateData = {
  type: "PQA",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Percentage of beneficiaries age 18 and older with concurrent use of prescription opioids and benzodiazepines. Beneficiaries with a cancer diagnosis, sickle cell disease diagnosis, or in hospice are excluded.",
    ],
    questionListItems: [],
    categories,
    qualifiers,
  },
  validations: [
    GV.validateRequiredRadioButtonForCombinedRates,
    GV.validateAtLeastOneDeviationFieldFilled,
    GV.validateReasonForNotReporting,
    GV.validateAtLeastOneDataSource,
    GV.validateAtLeastOneRateComplete,
    GV.validateRateZeroOMS,
    GV.validateRateZeroPM,
    GV.validateRateNotZeroOMS,
    GV.validateRateNotZeroPM,
    GV.validateNumeratorLessThanDenominatorOMS,
    GV.validateNumeratorsLessThanDenominatorsPM,
    GV.validateBothDatesCompleted,
    GV.validateEqualQualifierDenominatorsOMS,
    GV.validateYearFormat,
    GV.validateDualPopInformationPM,
  ],
};
