//NOTE: This component is only being called from reporting year 2023 and above
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";

import { useController, useFormContext } from "react-hook-form";
import objectPath from "object-path";
import { useEffect, useLayoutEffect } from "react";
import { LabelData, getLabelText } from "utils";
import { IRate } from "components";
import { defaultRateCalculation } from "utils/rateFormulas";
import {
  allNumbers,
  eightNumbersOneDecimal,
  rateThatAllowsFourDecimals,
  rateThatAllowsOneDecimal,
  allPositiveIntegersWith8Digits,
} from "utils";
import { AnyObject } from "types";

interface Props extends QMR.InputWrapperProps {
  rates: IRate[];
  name: string;
  readOnly?: boolean;
  allowMultiple?: boolean;
  rateMultiplicationValue?: number;
  categoryName?: string;
  category?: LabelData; //this and categoryName will be combined in the performance measure refactor
  categories?: LabelData[];
  qualifiers?: LabelData[];
  customMask?: RegExp;
  calcTotal?: boolean;
  allowNumeratorGreaterThanDenominator?: boolean;
  customDenominatorLabel?: string;
  customNumeratorLabel?: string;
  customRateLabel?: string;
  rateCalc?: RateFormula;
}

export const IETRate = ({
  rates,
  name,
  allowMultiple = false,
  readOnly = true,
  rateMultiplicationValue = 100,
  categoryName,
  category,
  categories,
  qualifiers,
  customMask,
  calcTotal,
  allowNumeratorGreaterThanDenominator,
  customDenominatorLabel,
  customNumeratorLabel,
  customRateLabel,
  rateCalc = defaultRateCalculation,
  ...rest
}: Props) => {
  const {
    control,
    formState: { errors },
    unregister,
  } = useFormContext();
  const labelText = getLabelText();
  const { field } = useController({
    name,
    control,
    defaultValue: [],
  });
  const catID = category?.id ?? "singleCategory";

  //every time data is inputted into the field, it rerenderers the whole performance measure component
  const rebuildFields = () => {
    //the length of field.value need sto be the same as category length
    //if not, it needs to be rebuilt again
    if (Object.keys(field.value).length < categories!.length) {
      const values = field.value;
      categories?.forEach((cat) => {
        values[cat.id] = values[cat.id] ?? [];
        qualifiers!.forEach((qual, idx) => {
          values[cat.id][idx] = values[cat.id][idx] ?? {};
          values[cat.id][idx]["label"] = qual.label ?? undefined;
          values[cat.id][idx]["uid"] = `${cat.id}.${qual.id}`;
          //human readable text for Mathematica
          values[cat.id][idx]["category"] = cat.label ?? undefined;
          values[cat.id][idx]["isTotal"] =
            cat.label?.toLowerCase().includes("total") ||
            qual.id.toLowerCase().includes("total");
        });
      });
      return values;
    }
    return field.value;
  };

  const changeRate = (
    index: number,
    type: "numerator" | "denominator" | "rate",
    newValue: string
  ) => {
    const digitsAfterDecimal = 1;
    if (!allNumbers.test(newValue)) return;
    if (type === "rate" && readOnly) return;

    let fieldRates = rebuildFields();
    const prevRate = fieldRates[catID];
    const editRate = { ...prevRate?.[index] };
    const validEditRate = eightNumbersOneDecimal.test(newValue);
    if (
      (type === "numerator" || type === "denominator") &&
      allPositiveIntegersWith8Digits.test(newValue)
    ) {
      editRate[type] = validEditRate ? newValue : editRate[type];
    }

    if (type === "rate" && !readOnly) {
      const regex = allowMultiple
        ? rateThatAllowsFourDecimals
        : rateThatAllowsOneDecimal;

      editRate[type] =
        regex.test(newValue) || newValue === "" || customMask?.test(newValue)
          ? newValue
          : editRate[type];

      prevRate[index] = {
        label: fieldRates[catID][index].label,
        ...editRate,
      };
      fieldRates[catID] = prevRate;
      field.onChange({ ...fieldRates });
      return;
    }

    if (
      editRate.denominator &&
      editRate.numerator &&
      (parseFloat(editRate.numerator) <= parseFloat(editRate.denominator) ||
        allowNumeratorGreaterThanDenominator)
    ) {
      editRate.rate = rateCalc(
        editRate.numerator,
        editRate.denominator,
        rateMultiplicationValue,
        digitsAfterDecimal
      );
    } else if (editRate.rate) {
      editRate.rate = "";
    }
    prevRate[index] = {
      label: fieldRates[catID][index].label,
      ...editRate,
    };
    fieldRates[catID] = prevRate;
    fieldRates = test(prevRate[index], fieldRates);

    field.onChange(fieldRates);
  };

  const test = (qualifierRate: any, fieldRates: AnyObject) => {
    const categoryType = categoryName?.split(":")[0];
    const ratesByCat = Object.values(fieldRates)
      .flat()
      .filter((rate) => rate?.category?.includes(categoryType!));

    let qualifierRates = ratesByCat.filter((categoryRate) =>
      categoryRate?.label?.includes(qualifierRate.label!)
    );

    const totalRate = sumRates(qualifierRates);
    const categoryId = totalRate["uid"].split(".")[0];

    fieldRates[categoryId].forEach((qual: any) => {
      if (qual.uid === totalRate["uid"]) {
        qual.numerator = totalRate.numerator;
        qual.denominator = totalRate.denominator;
        qual.rate = totalRate.rate;
      }
    });
    return fieldRates;
  };

  const calculate = (fieldRates: any[]) => {
    let numeratorSum: any = null;
    let denominatorSum: any = null;
    let total = { numerator: "", denominator: "", rate: "" };

    //calculate the total numerator & denominator
    fieldRates.forEach((rate) => {
      if (rate["rate"]) {
        numeratorSum += rate?.numerator ? parseFloat(rate.numerator) : 0;
        denominatorSum += rate?.denominator ? parseFloat(rate.denominator) : 0;
      }
    });

    total.numerator = numeratorSum?.toString() ?? "";
    total.denominator = denominatorSum?.toString() ?? "";

    if (numeratorSum !== null && denominatorSum !== null) {
      total.rate =
        numeratorSum !== 0
          ? rateCalc(
              numeratorSum.toString(),
              denominatorSum.toString(),
              rateMultiplicationValue,
              1
            )
          : "0";
    }
    return total;
  };

  const sumRates = (rates: any[]) => {
    const totalRateIndex = rates.findIndex((rate) => rate.isTotal);
    let totalRate = rates.splice(totalRateIndex, 1).flat()[0];
    const total = calculate(rates);
    return { ...totalRate, ...total };
  };

  useEffect(
    () => () => {
      unregister(name);
    },
    [unregister, name]
  );

  useLayoutEffect(() => {
    field.onChange(field.value);

    return () => {
      field.onChange([]);
    };
    // purposefully ignoring field to stop infinite rerender
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <>
      {rates.map((rate, index) => {
        return (
          <CUI.Stack key={rate.id} mt={4} mb={8}>
            {rate.label && (
              <CUI.FormLabel fontWeight={700} data-cy={rate.label}>
                {labelText[rate.label] ?? rate.label}
              </CUI.FormLabel>
            )}
            <CUI.HStack spacing={16}>
              <QMR.InputWrapper
                label={customNumeratorLabel || "Numerator"}
                isInvalid={
                  !!objectPath.get(
                    errors,
                    `${name}.${catID}.${index}.numerator`
                  )?.message
                }
                errorMessage={
                  objectPath.get(errors, `${name}.${catID}.${index}.numerator`)
                    ?.message
                }
                {...rest}
              >
                <CUI.Input
                  type="text"
                  aria-label={`${name}.${catID}.${index}.numerator`}
                  value={field.value[catID]?.[index]?.numerator ?? ""}
                  data-cy={`${name}.${catID}.${index}.numerator`}
                  onChange={(e) =>
                    changeRate(index, "numerator", e.target.value)
                  }
                />
              </QMR.InputWrapper>
              <QMR.InputWrapper
                label={customDenominatorLabel || "Denominator"}
                isInvalid={
                  !!objectPath.get(
                    errors,
                    `${name}.${catID}.${index}.denominator`
                  )?.message
                }
                errorMessage={
                  objectPath.get(
                    errors,
                    `${name}.${catID}.${index}.denominator`
                  )?.message
                }
                {...rest}
              >
                <CUI.Input
                  aria-label={`${name}.${catID}.${index}.denominator`}
                  value={field.value[catID]?.[index]?.denominator ?? ""}
                  type="text"
                  data-cy={`${name}.${catID}.${index}.denominator`}
                  onChange={(e) =>
                    changeRate(index, "denominator", e.target.value)
                  }
                />
              </QMR.InputWrapper>
              <QMR.InputWrapper
                label={customRateLabel || "Rate"}
                isInvalid={
                  !!objectPath.get(errors, `${name}.${catID}.${index}.rate`)
                    ?.message
                }
                errorMessage={
                  objectPath.get(errors, `${name}.${catID}.${index}.rate`)
                    ?.message
                }
                {...rest}
              >
                <CUI.Input
                  aria-label={`${name}.${catID}.${index}.rate`}
                  value={field.value[catID]?.[index]?.rate ?? ""}
                  type="text"
                  data-cy={`${name}.${catID}.${index}.rate`}
                  onChange={(e) => changeRate(index, "rate", e.target.value)}
                  readOnly={readOnly}
                />
              </QMR.InputWrapper>
            </CUI.HStack>
            {!allowNumeratorGreaterThanDenominator &&
              parseFloat(field.value[catID]?.[index]?.numerator) >
                parseFloat(field.value[catID]?.[index]?.denominator) && (
                <QMR.Notification
                  alertTitle="Rate Error"
                  alertDescription={`Numerator: ${field.value[catID]?.[index]?.numerator} cannot be greater than Denominator: ${field.value[catID]?.[index]?.denominator}`}
                  alertStatus="warning"
                />
              )}
          </CUI.Stack>
        );
      })}
    </>
  );
};
