import * as PMD from "./data";
import { FormData } from "./types";
import {
  ensureBothDatesCompletedInRange,
  validateRequiredRadioButtonForCombinedRates,
  validateAtLeastOneNDRInDeviationOfMeasureSpec,
} from "measures/globalValidations/validationsLib";

const validateRates = (data: FormData) => {
  const sevenDays =
    data.PerformanceMeasure?.rates?.[
      `${PMD.categories[1].replace(/[^\w]/g, "")}`
    ] ?? [];
  const thirtyDays =
    data.PerformanceMeasure?.rates?.[
      `${PMD.categories[0].replace(/[^\w]/g, "")}`
    ] ?? [];
  let error;
  const errorArray: any[] = [];

  if (sevenDays && thirtyDays) {
    sevenDays.forEach((_sevenDaysObj, index) => {
      if (
        sevenDays[index] &&
        thirtyDays[index] &&
        sevenDays[index].denominator &&
        thirtyDays[index].denominator &&
        sevenDays[index].denominator !== thirtyDays[index].denominator
      ) {
        const ageGroup = index === 0 ? "18 to 64" : "65 and older";
        const isSingular = index === 1;

        error = {
          errorLocation: "Performance Measure",
          errorMessage: `Denominators must be the same for both 30 days rate and 7 days rate for Age${
            isSingular ? "" : "s"
          } ${ageGroup}.`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};

const validateDualPopulationInformation = (data: FormData) => {
  const sevenDays65orOlder =
    data.PerformanceMeasure?.rates?.[
      `${PMD.categories[1].replace(/[^\w]/g, "")}`
    ] ?? [];
  const thirtyDays65orOlder =
    data.PerformanceMeasure?.rates?.[
      `${PMD.categories[0].replace(/[^\w]/g, "")}`
    ] ?? [];
  const DualEligibleCheck = data["DefinitionOfDenominator"] ?? [];

  let error;

  if (sevenDays65orOlder || thirtyDays65orOlder) {
    if (sevenDays65orOlder[1] || thirtyDays65orOlder[1]) {
      if (
        sevenDays65orOlder[1]?.numerator ||
        thirtyDays65orOlder[1]?.numerator ||
        sevenDays65orOlder[1]?.denominator ||
        thirtyDays65orOlder[1]?.denominator
      ) {
        if (
          DualEligibleCheck.indexOf(
            "DenominatorIncMedicareMedicaidDualEligible"
          ) === -1
        ) {
          error = {
            errorLocation: "Performance Measure",
            errorMessage:
              "Information has been included in the Age 65 and older Performance Measure but the checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is missing",
          };
        }
      }
    }
  }
  if (
    DualEligibleCheck.indexOf("DenominatorIncMedicareMedicaidDualEligible") !==
    -1
  ) {
    if (!sevenDays65orOlder && !thirtyDays65orOlder) {
      error = {
        errorLocation: "Performance Measure",
        errorMessage:
          "Missing data on Performance Measure for Age 65 and older",
      };
    } else if (!sevenDays65orOlder[1] && !thirtyDays65orOlder[1]) {
      error = {
        errorLocation: "Performance Measure",
        errorMessage:
          "Missing data on Performance Measure for Age 65 and older",
      };
    } else if (
      (!sevenDays65orOlder[1]?.numerator || // either not filled in
        !sevenDays65orOlder[1]?.denominator) && // either not filled in
      !thirtyDays65orOlder[1]?.numerator && //both filled in
      !thirtyDays65orOlder[1]?.denominator //both filled in
    ) {
      return {
        errorLocation: "Performance Measure",
        errorMessage:
          "Missing data on Performance Measure for Age 65 and older (Follow-up within 7 days of ED visit)",
      };
    } else if (
      (!thirtyDays65orOlder[1]?.numerator ||
        !thirtyDays65orOlder[1]?.denominator) &&
      !sevenDays65orOlder[1]?.numerator &&
      !sevenDays65orOlder[1]?.denominator
    ) {
      return {
        errorLocation: "Performance Measure",
        errorMessage:
          "Missing data on Performance Measure for Age 65 and older (Follow-up within 30 days of ED visit)",
      };
    }
  }
  return error;
};

const validate7DaysGreaterThan30Days = (data: FormData) => {
  const sevenDays =
    data.PerformanceMeasure?.rates?.[
      `${PMD.categories[1].replace(/[^\w]/g, "")}`
    ] ?? [];
  const thirtyDays =
    data.PerformanceMeasure?.rates?.[
      `${PMD.categories[0].replace(/[^\w]/g, "")}`
    ] ?? [];
  let error;
  const errorArray: any[] = [];

  if (sevenDays && thirtyDays) {
    sevenDays.forEach((_sevenDaysObj, index) => {
      if (
        sevenDays[index] &&
        thirtyDays[index] &&
        parseFloat(sevenDays[index]?.rate ?? "") >
          parseFloat(thirtyDays[index]?.rate ?? "")
      ) {
        const ageGroup = index === 0 ? "18 to 64" : "65 and older";
        const isSingular = index === 1;
        error = {
          errorLocation: "Performance Measure",
          errorMessage: `7 Days Rate should not be higher than 30 Days Rate for Age${
            isSingular ? "" : "s"
          } ${ageGroup}`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};

const validateThirtyDayNumeratorLessThanDenominator = (data: FormData) => {
  const thirtyDays =
    data.PerformanceMeasure?.rates?.[
      `${PMD.categories[0].replace(/[^\w]/g, "")}`
    ] ?? [];
  let error;
  const errorArray: any[] = [];

  if (thirtyDays) {
    thirtyDays.forEach((thirtyDay, index) => {
      if (
        thirtyDay &&
        thirtyDay.numerator &&
        thirtyDay.denominator &&
        parseFloat(thirtyDay?.numerator) > parseFloat(thirtyDay?.denominator)
      ) {
        const ageGroup = index === 0 ? "18 to 64" : "65 and older";
        const isSingular = index === 1;

        error = {
          errorLocation: "Performance Measure",
          errorMessage: `30 Days Rate: Numerator must be less than or equal to Denominator for Age${
            isSingular ? "" : "s"
          } ${ageGroup}`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};

const validateSevenDayNumeratorLessThanDenominator = (data: FormData) => {
  const sevenDays =
    data.PerformanceMeasure?.rates?.[
      `${PMD.categories[1].replace(/[^\w]/g, "")}`
    ] ?? [];
  let error;
  const errorArray: any[] = [];

  if (sevenDays) {
    sevenDays.forEach((sevenDay, index) => {
      if (
        sevenDay &&
        sevenDay.numerator &&
        sevenDay.denominator &&
        parseFloat(sevenDay?.numerator) > parseFloat(sevenDay?.denominator)
      ) {
        const ageGroup = index === 0 ? "18 to 64" : "65 and older";
        const isSingular = index === 1;

        error = {
          errorLocation: "Performance Measure",
          errorMessage: `7 Days Rate: Numerator must be less than or equal to Denominator for Age${
            isSingular ? "" : "s"
          } ${ageGroup}`,
        };

        errorArray.push(error);
      }
    });
  }

  return error ? errorArray : error;
};

const validateAtLeastOneNDRSet = (data: FormData) => {
  let error;
  const measureSpecification = data["MeasurementSpecification"];
  const sevenDays =
    data.PerformanceMeasure?.rates?.[
      `${PMD.categories[1].replace(/[^\w]/g, "")}`
    ] ?? [];
  const thirtyDays =
    data.PerformanceMeasure?.rates?.[
      `${PMD.categories[0].replace(/[^\w]/g, "")}`
    ] ?? [];
  const otherPerformanceRates = data["OtherPerformanceMeasure-Rates"] ?? [];
  const isHEDIS = measureSpecification === "NCQA/HEDIS";

  let doesOtherNDRExist = false;
  otherPerformanceRates.forEach((ndr) => {
    const ndrRate = ndr?.rate?.[0]?.rate;
    if (ndrRate) {
      doesOtherNDRExist = true;
    }
  });

  if (
    isHEDIS &&
    !sevenDays?.[0]?.rate &&
    !sevenDays?.[1]?.rate &&
    !thirtyDays?.[0]?.rate &&
    !thirtyDays?.[1]?.rate
  ) {
    error = {
      errorLocation: "Performance Measure",
      errorMessage:
        "At least one Performance Measure Numerator, Denominator, and Rate must be completed",
    };
  } else if (measureSpecification && !isHEDIS && !doesOtherNDRExist) {
    error = {
      errorLocation: "Other Performance Measure",
      errorMessage:
        "At least one Other Performance Measure Numerator, Denominator, and Rate must be completed",
    };
  }

  return error;
};

const validateAtLeastOneDeviationNDR = (data: FormData) => {
  console.log(data);
  const performanceMeasureArray: any = [
    //   // data["PerformanceMeasure-AgeRates-7Days"],
    //   // data["PerformanceMeasure-AgeRates-30Days"],
  ];

  // Array of deviation NDRs with empty/undefined values removed
  const deviationArray = [
    // ...(data["DeviationFields-Within30"] || []),
    // ...(data["DeviationFields-Within7"] || []),
  ].filter((data) => data);

  return validateAtLeastOneNDRInDeviationOfMeasureSpec(
    performanceMeasureArray,
    ["18 to 64", "65 and older"],
    deviationArray
  );
};
const validateBothDatesCompletedInRange = (data: FormData) => {
  const dateRange = data["DateRange"];
  return [...ensureBothDatesCompletedInRange(dateRange)];
};

export const validationFunctions = [
  validateRates,
  validate7DaysGreaterThan30Days,
  validateSevenDayNumeratorLessThanDenominator,
  validateThirtyDayNumeratorLessThanDenominator,
  validateAtLeastOneNDRSet,
  validateDualPopulationInformation,
  validateAtLeastOneDeviationNDR,
  validateRequiredRadioButtonForCombinedRates,
  validateBothDatesCompletedInRange,
];
