import objectPath from "object-path";
import { IUHHRateFields, RateFields } from "../types";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { CompFlagType, usePerformanceMeasureContext } from "./context";

interface TempRate {
  numerator?: number;
  denominator?: number;
  rate?: string;
}

interface TotalCalcHookProps {
  // OMS name of current rate section
  name: string;
  // current cleaned category
  cleanedCategory?: string;
  // Rate component type identifier
  compFlag: CompFlagType;
}

interface CalcOmsTotalProp {
  watchOMS: any;
  cleanedCategory: string;
  qualifiers: string[];
  rateMultiplicationValue?: number;
  numberOfDecimals: number;
}

export const cleanString = (s: string) => s && s.replace(/[^\w]/g, "");

/** Process all OMS rate values pertaining to set category and calculate new rate object */
const calculateOMSTotal = ({
  cleanedCategory,
  numberOfDecimals,
  qualifiers,
  rateMultiplicationValue = 100,
  watchOMS,
}: CalcOmsTotalProp): RateFields => {
  const tempRate: TempRate = {
    numerator: undefined,
    denominator: undefined,
    rate: undefined,
  };

  for (const qual of qualifiers.slice(0, -1).map((s) => cleanString(s))) {
    if (
      watchOMS?.[qual]?.[cleanedCategory]?.[0]?.numerator &&
      watchOMS?.[qual]?.[cleanedCategory]?.[0]?.denominator &&
      watchOMS?.[qual]?.[cleanedCategory]?.[0]?.rate
    ) {
      tempRate.numerator ??= 0;
      tempRate.denominator ??= 0;
      tempRate.numerator += parseFloat(
        watchOMS[qual][cleanedCategory][0].numerator
      );
      tempRate.denominator += parseFloat(
        watchOMS[qual][cleanedCategory][0].denominator
      );
    }
  }

  if (tempRate.numerator !== undefined && tempRate.denominator !== undefined) {
    tempRate.rate = (
      Math.round(
        (tempRate.numerator / tempRate.denominator) *
          rateMultiplicationValue *
          Math.pow(10, numberOfDecimals)
      ) / Math.pow(10, numberOfDecimals)
    ).toFixed(1);
  }

  return {
    numerator:
      tempRate.numerator !== undefined ? `${tempRate.numerator}` : undefined,
    denominator:
      tempRate.denominator !== undefined
        ? `${tempRate.denominator}`
        : undefined,
    rate: tempRate.rate,
  };
};

const calculateIUHHOMSTotal = ({
  cleanedCategory,
  numberOfDecimals,
  qualifiers,
  rateMultiplicationValue = 100,
  watchOMS,
}: CalcOmsTotalProp): RateFields => {
  console.log("calculateIUHHOMSTotal");
  const tempRate: TempRate = {
    numerator: undefined,
    denominator: undefined,
    rate: undefined,
  };

  for (const qual of qualifiers.slice(0, -1).map((s) => cleanString(s))) {
    if (
      watchOMS?.[qual]?.[cleanedCategory]?.[0]?.numerator &&
      watchOMS?.[qual]?.[cleanedCategory]?.[0]?.denominator &&
      watchOMS?.[qual]?.[cleanedCategory]?.[0]?.rate
    ) {
      tempRate.numerator ??= 0;
      tempRate.denominator ??= 0;
      tempRate.numerator += parseFloat(
        watchOMS[qual][cleanedCategory][0].numerator
      );
      tempRate.denominator += parseFloat(
        watchOMS[qual][cleanedCategory][0].denominator
      );
    }
  }

  if (tempRate.numerator !== undefined && tempRate.denominator !== undefined) {
    tempRate.rate = (
      Math.round(
        (tempRate.numerator / tempRate.denominator) *
          rateMultiplicationValue *
          Math.pow(10, numberOfDecimals)
      ) / Math.pow(10, numberOfDecimals)
    ).toFixed(1);
  }

  return {
    numerator:
      tempRate.numerator !== undefined ? `${tempRate.numerator}` : undefined,
    denominator:
      tempRate.denominator !== undefined
        ? `${tempRate.denominator}`
        : undefined,
    rate: tempRate.rate,
  };
};

/** Checks if previous non-undefined OMS values have changed */
const checkNewOmsValuesChanged = (
  next: RateFields[],
  prev?: RateFields[]
): boolean => {
  if (!prev) return false;
  return !next.every(
    (v, i) =>
      v.numerator === prev?.[i]?.numerator &&
      v.denominator === prev?.[i]?.denominator &&
      v.rate === prev?.[i]?.rate
  );
};

const checkNewIUHHOmsValuesChanged = (
  next: IUHHRateFields[],
  prev?: IUHHRateFields[]
): boolean => {
  if (!prev) return false;
  return !next.every((v, i) => {
    return (
      v.fields?.[0]?.value === prev?.[i]?.fields?.[0]?.value &&
      v.fields?.[1]?.value === prev?.[i]?.fields?.[1]?.value &&
      v.fields?.[2]?.value === prev?.[i]?.fields?.[2]?.value &&
      v.fields?.[3]?.value === prev?.[i]?.fields?.[3]?.value &&
      v.fields?.[4]?.value === prev?.[i]?.fields?.[4]?.value &&
      v.fields?.[5]?.value === prev?.[i]?.fields?.[5]?.value
    );
  });
};

/**
 * Hook to handle OMS total calculation only on field changes
 *
 * - type === undefined: is a field reset or form load
 * - type === change: NDR rate calculation or field change
 *
 * NOTE: we track previous fields in all states, but only fire recalculation if type === change and
 * fields have changed since last triggered event
 */
export const useTotalAutoCalculation = ({
  name,
  cleanedCategory = "singleCategory",
  compFlag,
}: TotalCalcHookProps) => {
  const { watch, setValue } = useFormContext();
  const { qualifiers, numberOfDecimals, rateMultiplicationValue } =
    usePerformanceMeasureContext();
  const [previousOMS, setPreviousOMS] = useState<RateFields[] | undefined>();
  console.log("first previousOMS: ", previousOMS);

  useEffect(() => {
    const totalFieldName = `${name}.rates.${cleanString(
      qualifiers.slice(-1)[0]
    )}.${cleanedCategory}`;
    const nonTotalQualifiers = qualifiers
      .slice(0, -1)
      .map((s) => cleanString(s));
    const includedNames = nonTotalQualifiers.map(
      (s) => `${name}.rates.${s}.${cleanedCategory}`
    );

    const subscription = watch((values, { name: fieldName, type }) => {
      if (fieldName && values) {
        const omsFields =
          compFlag === "IU" ? ([] as IUHHRateFields[]) : ([] as RateFields[]);
        const watchOMS = objectPath.get(values, `${name}.rates`);
        for (const q of nonTotalQualifiers) {
          omsFields.push(watchOMS?.[q]?.[cleanedCategory]?.[0] ?? {});
        }

        // console.log("omsFields: ", omsFields);
        console.log("previousOMS: ", previousOMS);

        const OMSValuesChanged: boolean =
          compFlag === "IU"
            ? checkNewIUHHOmsValuesChanged(omsFields, previousOMS)
            : checkNewOmsValuesChanged(omsFields, previousOMS);
        if (
          type === "change" &&
          includedNames.includes(fieldName) &&
          OMSValuesChanged
        ) {
          console.log("here");
          setValue(totalFieldName, [
            compFlag === "IU"
              ? calculateIUHHOMSTotal({
                  cleanedCategory,
                  qualifiers,
                  numberOfDecimals,
                  rateMultiplicationValue,
                  watchOMS,
                })
              : calculateOMSTotal({
                  cleanedCategory,
                  qualifiers,
                  numberOfDecimals,
                  rateMultiplicationValue,
                  watchOMS,
                }),
          ]);
        }
        if (values) {
          setPreviousOMS(omsFields);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [
    watch,
    setValue,
    cleanedCategory,
    name,
    numberOfDecimals,
    qualifiers,
    rateMultiplicationValue,
    previousOMS,
    setPreviousOMS,
  ]);
};
