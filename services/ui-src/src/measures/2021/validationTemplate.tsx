import * as DC from "dataConstants";
import * as GV from "shared/globalValidations";
import { OMSData } from "shared/commonQuestions/OptionalMeasureStrat/data";
import { DefaultFormDataLegacy as FormData } from "shared/types/FormData";
import {
  MeasureTemplateData,
  ValidationFunction,
} from "shared/types/MeasureTemplate";
import { LabelData } from "utils";
import { OtherRatesFields } from "shared/types";

const sortOMSValidations = (
  categories: LabelData[],
  OPM: OtherRatesFields[],
  PMD: MeasureTemplateData
) => {
  const omsAIFHHValidations: GV.Types.OmsValidationCallback = ({
    rateData,
    locationDictionary,
    label,
    qualifiers,
  }) => {
    return OPM === undefined
      ? [
          ...GV.ComplexNoNonZeroNumOrDenomOMS(
            rateData?.["aifhh-rate"]?.rates ?? {},
            false,
            PMD.performanceMeasure.ndrFormulas ?? [],
            `Optional Measure Stratification: ${locationDictionary(label)}`,
            qualifiers
          ),
          ...GV.ComplexValidateNDRTotalsOMS(
            rateData?.["aifhh-rate"]?.rates ?? {},
            categories,
            PMD.performanceMeasure.ndrFormulas ?? [],
            `Optional Measure Stratification: ${locationDictionary(
              label
            )} Total`
          ),
        ]
      : [
          ...GV.ComplexNoNonZeroNumOrDenomOMS(
            rateData?.rates,
            true,
            PMD.performanceMeasure.ndrFormulas ?? [],
            `Optional Measure Stratification: ${locationDictionary(label)}`,
            qualifiers
          ),
        ];
  };

  const omsIUHHValidation: GV.Types.OmsValidationCallback = ({
    rateData,
    locationDictionary,
    label,
    categories,
    qualifiers,
  }) => {
    return OPM === undefined
      ? [
          ...GV.ComplexNoNonZeroNumOrDenomOMS(
            rateData?.["iuhh-rate"]?.rates ?? {},
            false,
            PMD.performanceMeasure.ndrFormulas ?? [],
            `Optional Measure Stratification: ${locationDictionary(label)}`,
            categories
          ),
          ...GV.ComplexValidateNDRTotalsOMS(
            rateData?.["iuhh-rate"]?.rates ?? {},
            categories,
            PMD.performanceMeasure.ndrFormulas ?? [],
            `Optional Measure Stratification: ${locationDictionary(
              label
            )} Total`
          ),
          ...GV.ComplexValueSameCrossCategoryOMS(
            rateData?.["iuhh-rate"]?.rates ?? {},
            categories,
            qualifiers,
            `Optional Measure Stratification: ${locationDictionary(label)}`
          ),
        ]
      : [
          ...GV.ComplexNoNonZeroNumOrDenomOMS(
            rateData?.rates,
            true,
            PMD.performanceMeasure.ndrFormulas ?? [],
            `Optional Measure Stratification: ${locationDictionary(label)}`,
            qualifiers
          ),
        ];
  };

  if (PMD.performanceMeasure.measureName === "AIFHH")
    return [omsAIFHHValidations];
  else if (PMD.performanceMeasure.measureName === "IUHH")
    return [omsIUHHValidation];

  //oms validation functions are called a little differently so we need to filter them out
  const omsCallbacks = PMD.validations!.filter((validation) =>
    validation.name.includes("OMS")
  ).map((validation) => omsValidations(validation, PMD));

  return [...omsCallbacks];
};

const omsValidations = (func: ValidationFunction, PMD: MeasureTemplateData) => {
  //Complex measures like AIF-HH & IU-HH requires unique OMS calls
  if (PMD.performanceMeasure.measureName === "AIFHH") {
  } else if (PMD.performanceMeasure.measureName === "IUHH") {
  }

  switch (func) {
    case GV.validateNumeratorLessThanDenominatorOMS:
      return GV.validateNumeratorLessThanDenominatorOMS();
    case GV.validateRateZeroOMS:
      return GV.validateRateZeroOMS();
    case GV.validateRateNotZeroOMS:
      return GV.validateRateNotZeroOMS();
    case GV.validateOneQualDenomHigherThanOtherDenomOMS:
      return GV.validateOneQualDenomHigherThanOtherDenomOMS();
    case GV.validateOMSTotalNDR():
      return GV.validateOMSTotalNDR();
    case GV.validateEqualQualifierDenominatorsOMS:
      return GV.validateEqualQualifierDenominatorsOMS();
    case GV.validateOneCatRateHigherThanOtherCatOMS:
      return GV.validateOneCatRateHigherThanOtherCatOMS(
        0,
        1,
        PMD.override?.validateOneCatRateHigherThanOtherCatOMS?.increment
      );
    default:
      throw new Error(
        `Validation function ${func.name} not recognized! See validationTemplate.tsx`
      );
  }
};

const validateTotalNDRErrorMessage = (qualifier: string, fieldType: string) => {
  return `${fieldType} for the ${qualifier} Total rate is not equal to the sum of the ${qualifier} age-specific ${fieldType.toLowerCase()}s.`;
};

export const validationTemplate = (
  data: FormData,
  PMD: MeasureTemplateData
) => {
  const categories = PMD.performanceMeasure.categories!;
  const qualifiers = PMD.performanceMeasure.qualifiers!;

  const performanceMeasureArray = GV.getPerfMeasureRateArray(
    data,
    PMD.performanceMeasure
  );
  const validations = PMD.validations;

  const dateRange = data[DC.DATE_RANGE];
  const deviationArray = GV.getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    true
  );
  const didCalculationsDeviate = data[DC.DID_CALCS_DEVIATE] === DC.YES;
  const OPM = data[DC.OPM_RATES];

  const locationDictionary = GV.omsLocationDictionary(
    OMSData(2021, true),
    qualifiers,
    categories
  );

  const validateDualPopInformationArray = [
    performanceMeasureArray?.[0].filter((pm) => {
      return pm?.label === "Age 65 and older";
    }),
  ];

  const DefinitionOfDenominator = data[DC.DEFINITION_OF_DENOMINATOR];

  const validationList = (func: ValidationFunction) => {
    switch (func) {
      case GV.validateReasonForNotReporting:
        return [];
      case GV.validateRequiredRadioButtonForCombinedRates:
        return GV.validateRequiredRadioButtonForCombinedRates(data);
      case GV.validateBothDatesCompleted:
        return GV.validateBothDatesCompleted(dateRange);
      case GV.validateYearFormat:
        return GV.validateYearFormat(dateRange);
      case GV.validateAtLeastOneDeviationFieldFilled:
        return GV.validateAtLeastOneDeviationFieldFilled(
          PMD.override?.deviationFieldFilled?.(data) ?? performanceMeasureArray,
          qualifiers,
          deviationArray,
          didCalculationsDeviate
        );
      case GV.validateAtLeastOneDataSource:
        return GV.validateAtLeastOneDataSource(data);
      case GV.validateAtLeastOneRateComplete:
        return GV.validateAtLeastOneRateComplete(
          performanceMeasureArray,
          OPM,
          qualifiers,
          categories
        );
      case GV.validateRateZeroPM:
        return GV.validateRateZeroPM(
          performanceMeasureArray,
          OPM,
          qualifiers,
          data
        );
      case GV.validateRateNotZeroPM:
        return GV.validateRateNotZeroPM(
          performanceMeasureArray,
          OPM,
          qualifiers
        );
      case GV.validateNumeratorsLessThanDenominatorsPM:
        return GV.validateNumeratorsLessThanDenominatorsPM(
          performanceMeasureArray,
          OPM,
          qualifiers
        );
      case GV.validateOneQualDenomHigherThanOtherDenomPM:
        return GV.validateOneQualDenomHigherThanOtherDenomPM(data, {
          categories,
          qualifiers,
        });
      case GV.validateTotalNDR:
        return GV.validateTotalNDR(
          performanceMeasureArray,
          undefined,
          PMD.override?.validateTotalNDR?.category ? categories : undefined,
          PMD.override?.validateTotalNDR?.errorMessage
            ? validateTotalNDRErrorMessage
            : undefined
        );
      case GV.validateEqualQualifierDenominatorsPM:
        //AMM-AD, FUH-AD, FUH-CH, IET-AD, IET-HH, SFM-CH, W30-CH
        if (PMD.override?.validateEqualQualifierDenominatorsPM?.category) {
          let unfilteredSameDenominatorErrors: any[] = [];
          let filteredSameDenominatorErrors: any = [];
          let errorList: string[] = [];

          for (let i = 0; i < performanceMeasureArray.length; i += 2) {
            //errorMsg used for IET-AD & IET-HH
            const errorMsg = (qual: string) =>
              `Denominators must be the same for ${locationDictionary([
                qual,
              ])} for ${categories[i].label} and ${categories[i + 1].label}.`;

            unfilteredSameDenominatorErrors = [
              ...unfilteredSameDenominatorErrors,
              ...GV.validateEqualQualifierDenominatorsPM(
                [performanceMeasureArray[i], performanceMeasureArray[i + 1]],
                qualifiers,
                undefined,
                PMD.override?.validateEqualQualifierDenominatorsPM?.errorMessage
                  ? errorMsg
                  : undefined
              ),
            ];
          }
          unfilteredSameDenominatorErrors.forEach((error) => {
            if (!(errorList.indexOf(error.errorMessage) > -1)) {
              errorList.push(error.errorMessage);
              filteredSameDenominatorErrors.push(error);
            }
          });

          return filteredSameDenominatorErrors;
        }

        //APM-CH & WCC-CH
        const validateEqualQualifierDenominatorsErrorMessage = (
          qualifier: string
        ) => {
          const isTotal = qualifier.split(" ")[0] === "Total";
          return `${
            isTotal ? "" : "The "
          }${qualifier} denominator must be the same for each indicator.`;
        };

        //APM-CH, FUA-AD, FUA-HH, FUH-HH, FUM-AD & WCC-CH
        return GV.validateEqualQualifierDenominatorsPM(
          performanceMeasureArray,
          qualifiers,
          undefined,
          PMD.override?.validateEqualQualifierDenominatorsPM?.errorMessage
            ? validateEqualQualifierDenominatorsErrorMessage
            : undefined
        );
      case GV.validateOneCatRateHigherThanOtherCatPM:
        return GV.validateOneCatRateHigherThanOtherCatPM(
          data,
          PMD.performanceMeasure,
          0,
          1,
          PMD.override?.validateOneCatRateHigherThanOtherCatPM?.increment ??
            undefined
        );
      case GV.validateDualPopInformationPM:
        return GV.validateDualPopInformationPM(
          PMD.override?.validateDualPopInformationPM?.dualPopInfoArray
            ? validateDualPopInformationArray
            : performanceMeasureArray,
          OPM,
          PMD.override?.validateDualPopInformationPM?.ageIndex ?? 0,
          DefinitionOfDenominator,
          PMD.override?.validateDualPopInformationPM?.errorLabel
        );
      case GV.validateEqualCategoryDenominatorsPM:
        return GV.validateEqualCategoryDenominatorsPM(
          data,
          categories,
          PMD.override?.validateEqualCategoryDenominatorsPM?.qualifiers
        );
      case GV.ComplexValidateDualPopInformation:
        return GV.ComplexValidateDualPopInformation(
          performanceMeasureArray,
          OPM,
          DefinitionOfDenominator
        );
      case GV.ComplexAtLeastOneRateComplete:
        return GV.ComplexAtLeastOneRateComplete(performanceMeasureArray, OPM);
      case GV.ComplexNoNonZeroNumOrDenom:
        return GV.ComplexNoNonZeroNumOrDenom(
          performanceMeasureArray,
          OPM,
          PMD.performanceMeasure.ndrFormulas ?? []
        );
      case GV.ComplexValidateAtLeastOneNDRInDeviationOfMeasureSpec:
        return GV.ComplexValidateAtLeastOneNDRInDeviationOfMeasureSpec(
          performanceMeasureArray,
          PMD.performanceMeasure.ndrFormulas!,
          deviationArray,
          didCalculationsDeviate
        );
      case GV.ComplexValidateNDRTotals:
        return GV.ComplexValidateNDRTotals(
          performanceMeasureArray,
          categories,
          PMD.performanceMeasure.ndrFormulas ?? []
        );
      default:
        throw new Error(
          `Validation function ${func.name} not recognized! See validationTemplate.tsx`
        );
    }
  };

  //if user selects no on "are you reporting on this measure?"
  const whyNotReporting = data[DC.WHY_ARE_YOU_NOT_REPORTING];
  if (data[DC.DID_REPORT] === DC.NO) {
    return [...GV.validateReasonForNotReporting(whyNotReporting)];
  }

  let errorArray: any[] = [];
  //run validation without oms validation functions as the returns are different
  for (const validation of validations!.filter(
    (validation) => !validation.name.includes("OMS")
  )) {
    errorArray.push(...validationList(validation));
  }

  errorArray.push(
    ...GV.omsValidations({
      data,
      qualifiers: qualifiers,
      categories: categories,
      locationDictionary: GV.omsLocationDictionary(
        OMSData(2021, true),
        qualifiers,
        categories
      ),
      validationCallbacks: sortOMSValidations(categories, OPM, PMD)!,
    })
  );

  return errorArray;
};

export const validationFunctions = [validationTemplate];
