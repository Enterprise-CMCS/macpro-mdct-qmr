//NOTE: This component is used for reporting year 2023 and above
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

type FieldType = "numerator" | "denominator" | "rate";

interface Props extends QMR.InputWrapperProps {
  rates: IRate[];
  testRates?: [IRate[]];
  name: string;
  readOnly?: boolean;
  allowMultiple?: boolean;
  rateMultiplicationValue?: number;
  categoryName?: string;
  category?: LabelData;
  categories?: LabelData[];
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
  testRates,
  name,
  allowMultiple = false,
  readOnly = true,
  rateMultiplicationValue = 100,
  categoryName,
  category,
  categories,
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
  /*
  On component render, verify that all NDRs have a label, uid and isTotal value.
  This is required for accurate data representation in DB and to calculateTotalsByCategory().
  */
  useEffect(() => {
    const values = field.value;
    values[catID] = values[catID] ?? [];
    rates.forEach((rate, idx) => {
      values[catID][idx] = values[catID][idx] ?? {};
      values[catID][idx]["label"] = rate.label ?? undefined;
      values[catID][idx]["uid"] = rate.uid ?? undefined;
      //human readable text for Mathematica
      values[catID][idx]["category"] = categoryName ?? undefined;
      values[catID][idx]["isTotal"] = rate.isTotal;
    });
    field.onChange(values);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isValid = (type: FieldType, newValue: string) => {
    const validations = [allNumbers];
    switch (type) {
      case "numerator":
      case "denominator":
        validations.push(allPositiveIntegersWith8Digits);
        break;
      case "rate":
        const regex = allowMultiple
          ? rateThatAllowsFourDecimals
          : rateThatAllowsOneDecimal;
        validations.push(eightNumbersOneDecimal, regex);
        break;
    }
    return validations.every((valid) => valid?.test(newValue));
  };

  const changeRate = (index: number, type: FieldType, newValue: string) => {
    const digitsAfterDecimal = 1;
    if (type === "rate" && readOnly) return;

    let allRates = field.value;
    const prevRate = allRates[catID];

    if (isValid(type, newValue)) {
      const editRate = prevRate[index];
      editRate[type] = newValue;

      if (type === "rate" && !readOnly)
        newValue = !editRate.numerator || !editRate.denominator ? "" : newValue;
      else if (type === "numerator" || type === "denominator") {
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
        } else if (!editRate.numerator || !editRate.denominator)
          editRate.rate = "";
      }

      prevRate[index] = {
        label: rates[index].label,
        ...editRate,
      };
      allRates[catID] = prevRate;
      allRates = test(prevRate[index], allRates);
      field.onChange(allRates);
    }
  };

  const test = (rate: any, allRates: AnyObject) => {
    const categoryType = categoryName?.split(":")[0];
    const ratesByCat = Object.values(allRates)
      .flat()
      .filter((rate) => rate?.category?.includes(categoryType!));

    let ratesByQual = ratesByCat.filter((catRate) =>
      catRate?.label?.includes(rate.label!)
    );

    const totalRate = sumRates(ratesByQual);
    const totalCat = totalRate["uid"].split(".")[0];

    allRates[totalCat].forEach((qual: any) => {
      if (qual.uid === totalRate["uid"]) {
        qual.numerator = totalRate.numerator;
        qual.denominator = totalRate.denominator;
        qual.rate = totalRate.rate;
      }
    });
    return allRates;
  };

  const calculate = (rates: any[]) => {
    let numeratorSum: any = null;
    let denominatorSum: any = null;
    let total = { numerator: "", denominator: "", rate: "" };

    //calculate the total numerator & denominator
    rates.forEach((rate) => {
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
                  aria-label={`${name}.${index}.numerator`}
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
                  aria-label={`${name}.${index}.denominator`}
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
                  aria-label={`${name}.${index}.rate`}
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
