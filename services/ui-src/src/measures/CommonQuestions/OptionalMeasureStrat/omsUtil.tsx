import objectPath from "object-path";
import { RateFields } from "../types";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { usePerformanceMeasureContext } from "./context";

interface TempRate {
  numerator?: number;
  denominator?: number;
  rate: string;
}

interface TotalCalcHookProps {
  // OMS name of current rate section
  name: string;
  // current cleaned category
  cleanedCategory?: string;
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
}: CalcOmsTotalProp) => {
  const tempRate: TempRate = {
    numerator: undefined,
    denominator: undefined,
    rate: "",
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

  return tempRate;
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
}: TotalCalcHookProps) => {
  const { watch, setValue } = useFormContext();
  const { qualifiers, numberOfDecimals, rateMultiplicationValue } =
    usePerformanceMeasureContext();
  const [previousOMS, setPreviousOMS] = useState<RateFields[] | undefined>();

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
        const omsFields: RateFields[] = [];
        const watchOMS = objectPath.get(values, `${name}.rates`);
        for (const q of nonTotalQualifiers) {
          omsFields.push(watchOMS?.[q]?.[cleanedCategory]?.[0] ?? {});
        }

        if (
          type === "change" &&
          includedNames.includes(fieldName) &&
          checkNewOmsValuesChanged(omsFields, previousOMS)
        ) {
          setValue(totalFieldName, [
            calculateOMSTotal({
              cleanedCategory,
              qualifiers,
              numberOfDecimals,
              rateMultiplicationValue,
              watchOMS,
            }),
          ]);
        }
        if (values) setPreviousOMS(omsFields);
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
