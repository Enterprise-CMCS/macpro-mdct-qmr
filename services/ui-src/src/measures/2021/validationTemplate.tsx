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
  const AIFHHValidationsOMS: GV.Types.OmsValidationCallback = ({
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

  const IUHHValidationOMS: GV.Types.OmsValidationCallback = ({
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

  const PCRValidationOMS: GV.Types.OmsValidationCallback = ({
    rateData,
    locationDictionary,
    label,
    qualifiers,
  }) => {
    const rates = Object.keys(rateData?.rates ?? {}).map((x) => {
      return { rate: [rateData?.rates?.[x].OPM[0]] };
    });
    return [
      ...GV.PCRnoNonZeroNumOrDenom(
        [rateData?.["pcr-rate"] ?? []],
        rates ?? [],
        PMD.performanceMeasure.ndrFormulas ?? [],
        `Optional Measure Stratification: ${locationDictionary(label)}`
      ),
      ...GV.PCRatLeastOneRateComplete(
        [rateData?.["pcr-rate"] ?? []],
        rates ?? [],
        qualifiers,
        `Optional Measure Stratification: ${locationDictionary(label)}`,
        true
      ),
    ];
  };

  //these are complex measures so they have their own unique oms validation calls
  if (PMD.performanceMeasure.measureName === "AIFHH")
    return [AIFHHValidationsOMS];
  else if (PMD.performanceMeasure.measureName === "IUHH")
    return [IUHHValidationOMS];
  else if (
    PMD.performanceMeasure.measureName === "PCRAD" ||
    PMD.performanceMeasure.measureName === "PCRHH"
  ) {
    return [PCRValidationOMS];
  }

  //oms validation functions are called a little differently so we need to filter them out
  const omsCallbacks = PMD.validations!.filter((validation) =>
    validation.name.includes("OMS")
  ).map((validation) => omsValidations(validation, PMD));

  return [...omsCallbacks];
};

const omsValidations = (func: ValidationFunction, PMD: MeasureTemplateData) => {
  switch (func) {
    case GV.validateNumeratorLessThanDenominatorOMS:
      return GV.validateNumeratorLessThanDenominatorOMS();
    case GV.validateRateZeroOMS:
      return GV.validateRateZeroOMS();
    case GV.validateRateNotZeroOMS:
      return GV.validateRateNotZeroOMS();
    case GV.validateOneQualDenomHigherThanOtherDenomOMS:
      return GV.validateOneQualDenomHigherThanOtherDenomOMS();
    case GV.validateOMSTotalNDR:
      return GV.validateOMSTotalNDR();
    case GV.validateEqualQualifierDenominatorsOMS:
      return GV.validateEqualQualifierDenominatorsOMS();
    case GV.validateOneCatRateHigherThanOtherCatOMS:
      return GV.validateOneCatRateHigherThanOtherCatOMS(
        0,
        1,
        PMD.override?.validateOneCatRateHigherThanOtherCatOMS?.increment
      );
    case GV.validateOneQualRateHigherThanOtherQualOMS:
      return GV.validateOneQualRateHigherThanOtherQualOMS(
        PMD.override?.validateOneQualRateHigherThanOtherQual?.higherIndex,
        PMD.override?.validateOneQualRateHigherThanOtherQual?.lowerIndex
      );
    case GV.validateSameDenominatorSetsOMS:
      return GV.validateSameDenominatorSetsOMS();
    case GV.validateEqualCategoryDenominatorsOMS:
      return GV.validateEqualCategoryDenominatorsOMS();
    default:
      throw new Error(
        `Validation function ${func.name} not recognized! See validationTemplate.tsx`
      );
  }
};

//APM-CH & WCC-CH
const validateTotalNDRErrorMessage = (qualifier: string, fieldType: string) => {
  return `${fieldType} for the ${qualifier} Total rate is not equal to the sum of the ${qualifier} age-specific ${fieldType.toLowerCase()}s.`;
};

export const validationTemplate = (
  data: FormData,
  PMD: MeasureTemplateData
) => {
  const categories = PMD.performanceMeasure.categories ?? [];
  const qualifiers = PMD.performanceMeasure.qualifiers ?? [];

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
          PMD.override?.validateAtLeastOneDeviationFieldFilled?.(data) ??
            performanceMeasureArray,
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
          PMD.override?.validateTotalNDR?.categories,
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
      case GV.validateOneQualRateHigherThanOtherQualPM:
        return GV.validateOneQualRateHigherThanOtherQualPM(
          data,
          PMD.performanceMeasure,
          PMD.override?.validateOneQualRateHigherThanOtherQual?.higherIndex,
          PMD.override?.validateOneQualRateHigherThanOtherQual?.lowerIndex
        );
      case GV.ComplexValueSameCrossCategory:
        return GV.ComplexValueSameCrossCategory({
          rateData: performanceMeasureArray,
          OPM,
        });
      case GV.PCRatLeastOneRateComplete:
        return GV.PCRatLeastOneRateComplete(
          performanceMeasureArray,
          OPM,
          qualifiers
        );
      case GV.PCRnoNonZeroNumOrDenom:
        return GV.PCRnoNonZeroNumOrDenom(
          performanceMeasureArray,
          OPM,
          PMD.performanceMeasure.ndrFormulas ?? []
        );
      case GV.PCRvalidateAtLeastOneNDRInDeviationOfMeasureSpec:
        return GV.PCRvalidateAtLeastOneNDRInDeviationOfMeasureSpec(
          performanceMeasureArray,
          PMD.performanceMeasure.ndrFormulas ?? [],
          deviationArray,
          didCalculationsDeviate
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
      dataSource: PMD.override?.omsValidations?.dataSource //used in validateRateZeroOMS
        ? data[DC.DATA_SOURCE]
        : undefined,
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
