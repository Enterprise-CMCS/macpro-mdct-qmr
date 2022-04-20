import * as PMD from "./data";
import * as DC from "dataConstants";
import {
  atLeastOneRateComplete,
  ensureBothDatesCompletedInRange,
  validateNumeratorsLessThanDenominators,
  validateEqualDenominators,
  validateNoNonZeroNumOrDenom,
  validateReasonForNotReporting,
  validateRequiredRadioButtonForCombinedRates,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
  getDeviationNDRArray,
  omsLocationDictionary,
} from "../../globalValidations";
import { getPerfMeasureRateArray } from "../../globalValidations";
import { FormData } from "./types";
import {
  OmsValidationCallback,
  omsValidations,
  validateDenominatorGreaterThanNumerator,
  validateOneRateLessThanOther,
  validateRateNotZero,
  validateRateZero,
} from "measures/globalValidations/omsValidationsLib";
import { OMSData } from "measures/CommonQuestions/OptionalMeasureStrat/data";

const validate7DaysGreaterThan30Days = (data: FormData) => {
  if (
    !(
      data?.PerformanceMeasure?.rates?.FollowUpwithin7daysafterdischarge ||
      data?.PerformanceMeasure?.rates?.FollowUpwithin30daysafterdischarge
    )
  ) {
    return [];
  }
  const sevenDays =
    data["PerformanceMeasure"]["rates"]["FollowUpwithin7daysafterdischarge"];
  const thirtyDays =
    data["PerformanceMeasure"]["rates"]["FollowUpwithin30daysafterdischarge"];
  let error;
  const errorArray: any[] = [];

  if (sevenDays && thirtyDays) {
    sevenDays.forEach((_sevenDaysObj: any, index: number) => {
      if (
        sevenDays[index] &&
        thirtyDays[index] &&
        parseFloat(sevenDays[index]?.rate ?? "") >
          parseFloat(thirtyDays[index]?.rate ?? "")
      ) {
        error = {
          errorLocation: "Performance Measure",
          errorMessage:
            "Follow up within 7 days after discharge Rate should not be higher than Follow up within 30 days after discharge Rates.",
        };

        errorArray.push(error);
      }
    });
  }
  return error ? errorArray : [];
};

const cleanString = (s: string) => s.replace(/[^\w]/g, "");
const sameDenominatorSets: OmsValidationCallback = ({
  rateData,
  locationDictionary,
  categories,
  qualifiers,
  isOPM,
  label,
}) => {
  if (isOPM) return [];
  const errorArray: FormError[] = [];

  for (const qual of qualifiers.map((s) => cleanString(s))) {
    for (let initiation = 0; initiation < categories.length; initiation += 2) {
      const engagement = initiation + 1;
      const initRate =
        rateData.rates?.[qual]?.[cleanString(categories[initiation])]?.[0];
      const engageRate =
        rateData.rates?.[qual]?.[cleanString(categories[engagement])]?.[0];

      if (
        initRate &&
        engageRate &&
        initRate.denominator !== engageRate.denominator
      ) {
        errorArray.push({
          errorLocation: `Optional Measure Stratification: ${locationDictionary(
            [...label, qual]
          )}`,
          errorMessage: `Denominators must be the same for ${locationDictionary(
            [categories[initiation]]
          )} and ${locationDictionary([categories[engagement]])}.`,
        });
      }
    }
  }

  return errorArray;
};

const FUHValidation = (data: FormData) => {
  const ageGroups = PMD.qualifiers;
  const whyNotReporting = data["WhyAreYouNotReporting"];
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const dateRange = data["DateRange"];
  const deviationArray = getDeviationNDRArray(
    data.DeviationOptions,
    data.Deviations,
    true
  );
  const didCalculationsDeviate = data["DidCalculationsDeviate"] === DC.YES;

  let errorArray: any[] = [];
  if (data["DidReport"] === "no") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }
  let unfilteredSameDenominatorErrors: any[] = [];
  for (let i = 0; i < performanceMeasureArray.length; i += 2) {
    unfilteredSameDenominatorErrors = [
      ...unfilteredSameDenominatorErrors,
      ...validateEqualDenominators(
        [performanceMeasureArray[i], performanceMeasureArray[i + 1]],
        ageGroups
      ),
    ];
  }

  let filteredSameDenominatorErrors: any = [];
  let errorList: string[] = [];
  unfilteredSameDenominatorErrors.forEach((error) => {
    if (!(errorList.indexOf(error.errorMessage) > -1)) {
      errorList.push(error.errorMessage);
      filteredSameDenominatorErrors.push(error);
    }
  });

  errorArray = [
    ...errorArray,
    ...atLeastOneRateComplete(performanceMeasureArray, OPM, ageGroups),
    ...validateNumeratorsLessThanDenominators(
      performanceMeasureArray,
      OPM,
      ageGroups
    ),
    ...filteredSameDenominatorErrors,
    ...validateNoNonZeroNumOrDenom(
      performanceMeasureArray,
      OPM,
      ageGroups,
      data
    ),
    ...validateRequiredRadioButtonForCombinedRates(data),
    ...ensureBothDatesCompletedInRange(dateRange),
    ...validate7DaysGreaterThan30Days(data),
    ...validateAtLeastOneNDRInDeviationOfMeasureSpec(
      performanceMeasureArray,
      ageGroups,
      deviationArray,
      didCalculationsDeviate
    ),
    ...omsValidations({
      data,
      qualifiers: PMD.qualifiers,
      categories: PMD.categories,
      locationDictionary: omsLocationDictionary(
        OMSData(true),
        PMD.qualifiers,
        PMD.categories
      ),
      validationCallbacks: [
        validateOneRateLessThanOther,
        validateDenominatorGreaterThanNumerator,
        validateRateZero,
        validateRateNotZero,
        sameDenominatorSets,
      ],
    }),
  ];

  return errorArray;
};

export const validationFunctions = [FUHValidation];
