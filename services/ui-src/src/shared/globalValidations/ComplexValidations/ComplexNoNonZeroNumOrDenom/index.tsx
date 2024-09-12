import { cleanString, isLegacyLabel } from "utils";
import * as DC from "dataConstants";
import { AnyObject } from "types";

interface NDRforumla {
  numerator: number;
  denominator: number;
  rateIndex: number;
}

export const ComplexNoNonZeroNumOrDenomOMS = (
  rateData: any,
  OPM: AnyObject[],
  ndrFormulas: NDRforumla[],
  errorLocation: string
) => {
  let errorArray: any[] = [];

  //OMS errors for OPM data
  if (OPM && OPM.length > 0) {
    const keyList = OPM?.map((item: any) => {
      return {
        id: isLegacyLabel()
          ? cleanString(item.description)
          : `${DC.OPM_KEY}${cleanString(item.description)}`,
        desc: item.description,
      };
    });

    for (const id of keyList.map((key) => key.id)) {
      if (rateData[id]) {
        const description = keyList.find((key) => key.id === id)?.desc;
        errorArray.push(
          ...ComplexNoNonZeroNumOrDenom(
            [],
            [
              {
                rate: isLegacyLabel()
                  ? rateData[id]["OPM"]
                  : rateData["OPM"][id],
              },
            ],
            ndrFormulas,
            `${errorLocation} - ${description}`
          )
        );
      }
    }
  } else {
    for (const key in rateData) {
      for (const category in rateData[key]) {
        const label = rateData[key][category]?.[0]?.label;
        errorArray.push(
          ...ComplexNoNonZeroNumOrDenom(
            [rateData[key][category]],
            false,
            ndrFormulas,
            `${errorLocation} - ${label}`
          )
        );
      }
    }
  }

  return errorArray;
};

/* Validation for manually entered rates */
export const ComplexNoNonZeroNumOrDenom = (
  performanceMeasureArray: any,
  OPM: any,
  ndrFormulas: NDRforumla[],
  errorLocation: string = "Performance Measure/Other Performance Measure"
) => {
  let nonZeroRateError = false;
  let zeroRateError = false;
  let errorArray: any[] = [];

  if (!OPM) {
    for (const category of performanceMeasureArray) {
      if (category && category.length > 0) {
        for (const qualifier of category) {
          for (const formula of ndrFormulas) {
            const numerator = qualifier.fields[formula.numerator]?.value;
            const denominator = qualifier.fields[formula.denominator]?.value;
            const rate = qualifier.fields[formula.rateIndex]?.value;

            if (numerator && denominator && rate) {
              if (parseFloat(numerator) === 0 && parseFloat(rate) !== 0)
                nonZeroRateError = true;
              if (
                parseFloat(rate) === 0 &&
                parseFloat(numerator) !== 0 &&
                parseFloat(denominator) !== 0
              )
                zeroRateError = true;
            }
          }
        }
      }
    }
  }
  OPM &&
    OPM.forEach((performanceMeasure: any) => {
      performanceMeasure.rate?.forEach((rate: any) => {
        if (parseFloat(rate.numerator) === 0 && parseFloat(rate.rate) !== 0) {
          nonZeroRateError = true;
        }

        if (
          parseFloat(rate.numerator) !== 0 &&
          parseFloat(rate.denominator) !== 0 &&
          parseFloat(rate.rate) === 0
        ) {
          zeroRateError = true;
        }
      });
    });
  if (nonZeroRateError) {
    errorArray.push({
      errorLocation: errorLocation,
      errorMessage: `Manually entered rate should be 0 if numerator is 0`,
    });
  }
  if (zeroRateError) {
    errorArray.push({
      errorLocation: errorLocation,
      errorMessage: `Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation.`,
    });
  }
  return zeroRateError || nonZeroRateError ? errorArray : [];
};
