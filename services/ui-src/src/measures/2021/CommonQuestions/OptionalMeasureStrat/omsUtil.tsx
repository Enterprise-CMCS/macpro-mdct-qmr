import objectPath from "object-path";
import { complexRateFields, RateFields } from "../types";
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

interface IUHHTempRate {
  label: string;
  fields: { label: string; value: any }[];
  isTotal: true;
}

const IUHHndrForumlas = [
  // Discharges per 1,000 Enrollee Months
  {
    num: 1,
    denom: 0,
    rate: 2,
    mult: 1000,
  },
  // Days per 1,000 Enrollee Months
  {
    num: 3,
    denom: 0,
    rate: 4,
    mult: 1000,
  },
  // Average Length of Stay
  {
    num: 3,
    denom: 1,
    rate: 5,
    mult: 1,
  },
];

const AIFHHndrFormulas = [
  // Discharges per 1,000 Enrollee Months
  {
    num: 1,
    denom: 0,
    rate: 2,
    mult: 1000,
  },
  // Days per 1,000 Enrollee Months
  {
    num: 3,
    denom: 0,
    rate: 4,
    mult: 1000,
  },
  // Average Length of Stay
  {
    num: 5,
    denom: 0,
    rate: 6,
    mult: 1000,
  },
];

/** (IU-HH Specific) Process all OMS rate values pertaining to set category and calculate new rate object */
const calculateIUHHOMSTotal = ({
  cleanedCategory,
  qualifiers,
  watchOMS,
}: CalcOmsTotalProp): complexRateFields => {
  const cleanedQualifiers = qualifiers.slice(0, -1).map((s) => cleanString(s));
  const fieldNames = watchOMS?.["Total"]?.[cleanedCategory]?.[0]?.fields.map(
    (field: any) => field.label
  );

  // Create empty temp obj
  const tempRate: IUHHTempRate = {
    label: cleanedCategory,
    fields: fieldNames?.map((f: string) => {
      return {
        label: f,
        value: undefined,
      };
    }),
    isTotal: true,
  };

  // Store sums in temp
  for (const qual of cleanedQualifiers) {
    const fields = watchOMS?.[qual]?.[cleanedCategory]?.[0]?.fields;
    fields?.forEach((field: { value: string }, i: number) => {
      if (field?.value && tempRate?.fields?.[i]) {
        tempRate.fields[i].value ??= 0;
        tempRate.fields[i].value += parseFloat(field.value);
      }
    });
  }

  // Calculate rates for totals
  for (const f of IUHHndrForumlas) {
    const numerator = tempRate.fields?.[f.num]?.value;
    const denominator = tempRate.fields?.[f.denom]?.value;
    if (numerator && denominator) {
      tempRate.fields[f.rate].value = (
        Math.round((numerator / denominator) * f.mult * 10) / 10
      ).toFixed(1);
    }
  }

  // Convert numbers to strings
  for (const field of tempRate?.fields ?? []) {
    field.value = field.value !== undefined ? `${field.value}` : undefined;
  }

  return tempRate;
};

const calculateAIFHHOMSTotal = ({
  cleanedCategory,
  qualifiers,
  watchOMS,
}: CalcOmsTotalProp): complexRateFields => {
  const cleanedQualifiers = qualifiers.slice(0, -1).map((s) => cleanString(s));
  const fieldNames = watchOMS?.["Total"]?.[cleanedCategory]?.[0]?.fields.map(
    (field: any) => field.label
  );

  // Create empty temp obj
  const tempRate: IUHHTempRate = {
    label: cleanedCategory,
    fields: fieldNames?.map((f: string) => {
      return {
        label: f,
        value: undefined,
      };
    }),
    isTotal: true,
  };

  // Store sums in temp
  for (const qual of cleanedQualifiers) {
    const fields = watchOMS?.[qual]?.[cleanedCategory]?.[0]?.fields;
    fields?.forEach((field: { value: string }, i: number) => {
      if (field?.value && tempRate?.fields?.[i]) {
        tempRate.fields[i].value ??= 0;
        tempRate.fields[i].value += parseFloat(field.value);
      }
    });
  }

  // Calculate rates for totals
  for (const f of AIFHHndrFormulas) {
    const numerator = tempRate.fields?.[f.num]?.value;
    const denominator = tempRate.fields?.[f.denom]?.value;
    if (numerator && denominator) {
      tempRate.fields[f.rate].value = (
        Math.round((numerator / denominator) * f.mult * 10) / 10
      ).toFixed(1);
    }
  }

  // Convert numbers to strings
  for (const field of tempRate?.fields ?? []) {
    field.value = field.value !== undefined ? `${field.value}` : undefined;
  }

  return tempRate;
};

/** (IU-HH Specific) Checks if previous non-undefined OMS values have changed */
const checkNewIUHHOmsValuesChanged = (
  next: complexRateFields[],
  prev?: complexRateFields[]
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

/** (AIF-HH Specific) Checks if previous non-undefined OMS values have changed */
const checkNewAIFHHOmsValuesChanged = (
  next: complexRateFields[],
  prev?: complexRateFields[]
): boolean => {
  if (!prev) return false;
  return !next.every((v, i) => {
    return (
      v.fields?.[0]?.value === prev?.[i]?.fields?.[0]?.value &&
      v.fields?.[1]?.value === prev?.[i]?.fields?.[1]?.value &&
      v.fields?.[2]?.value === prev?.[i]?.fields?.[2]?.value &&
      v.fields?.[3]?.value === prev?.[i]?.fields?.[3]?.value &&
      v.fields?.[4]?.value === prev?.[i]?.fields?.[4]?.value &&
      v.fields?.[5]?.value === prev?.[i]?.fields?.[5]?.value &&
      v.fields?.[6]?.value === prev?.[i]?.fields?.[6]?.value
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
  const [previousOMS, setPreviousOMS] = useState<
    complexRateFields[] | undefined
  >();

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
        let omsFields;
        switch (compFlag) {
          case "IU":
            omsFields = [] as complexRateFields[];
            break;
          case "AIF":
            omsFields = [] as complexRateFields[];
            break;
          default:
            omsFields = [] as RateFields[];
            break;
        }
        const watchOMS = objectPath.get(values, `${name}.rates`);
        for (const q of nonTotalQualifiers) {
          omsFields.push(watchOMS?.[q]?.[cleanedCategory]?.[0] ?? {});
        }

        let OMSValuesChanged: boolean;
        switch (compFlag) {
          case "IU":
            OMSValuesChanged = checkNewIUHHOmsValuesChanged(
              omsFields,
              previousOMS
            );
            break;
          case "AIF":
            OMSValuesChanged = checkNewAIFHHOmsValuesChanged(
              omsFields,
              previousOMS
            );
            break;
          default:
            OMSValuesChanged = checkNewOmsValuesChanged(omsFields, previousOMS);
            break;
        }
        if (
          type === "change" &&
          includedNames.includes(fieldName) &&
          OMSValuesChanged
        ) {
          let newFieldValue;
          switch (compFlag) {
            case "IU":
              newFieldValue = calculateIUHHOMSTotal({
                cleanedCategory,
                qualifiers,
                numberOfDecimals,
                rateMultiplicationValue,
                watchOMS,
              });
              break;
            case "AIF":
              newFieldValue = calculateAIFHHOMSTotal({
                cleanedCategory,
                qualifiers,
                numberOfDecimals,
                rateMultiplicationValue,
                watchOMS,
              });
              break;
            default:
              newFieldValue = calculateOMSTotal({
                cleanedCategory,
                qualifiers,
                numberOfDecimals,
                rateMultiplicationValue,
                watchOMS,
              });
              break;
          }
          setValue(totalFieldName, [newFieldValue]);
        }
        if (values) {
          const currentOMSFields = JSON.parse(JSON.stringify(omsFields));
          setPreviousOMS(currentOMSFields);
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
    compFlag,
    name,
    numberOfDecimals,
    qualifiers,
    rateMultiplicationValue,
    previousOMS,
    setPreviousOMS,
  ]);
};
