//NOTE: This component is used for reporting year 2023 and above
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Types from "measures/2023/shared/CommonQuestions/types";

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

interface Props extends QMR.InputWrapperProps {
  rates: IRate[];
  testRates?: [IRate[]];
  name: string;
  readOnly?: boolean;
  allowMultiple?: boolean;
  rateMultiplicationValue?: number;
  categoryName?: string;
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
  //Using a watch to get all the rate changes as we need rates from all the categories to calculate the total
  //the current system only looks at rates in the qualifier level of the current category
  const { watch } = useFormContext<Types.DefaultFormData>();
  const allRates = watch().PerformanceMeasure
    ?.rates as Types.PerformanceMeasureRate;

  /*
  On component render, verify that all NDRs have a label, uid and isTotal value.
  This is required for accurate data representation in DB and to calculateTotalsByCategory().
  */
  useEffect(() => {
    const prevRate = [...field.value];
    rates.forEach((rate, index) => {
      if (prevRate[index] === undefined) {
        prevRate[index] = {};
      }
      prevRate[index]["label"] = rate.label ?? undefined;
      prevRate[index]["uid"] = rate.uid ?? undefined;
      //human readable text for Mathematica
      prevRate[index]["category"] = categoryName ?? undefined;
      prevRate[index]["isTotal"] = rate.isTotal;
      prevRate[index]["numerator"] = (rate as any)?.["numerator"]!;
      prevRate[index]["denominator"] = (rate as any)?.["denominator"]!;
      prevRate[index]["rate"] = (rate as any)?.["rate"]!;
    });
    field.onChange([...prevRate]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const changeRate = (
    index: number,
    type: "numerator" | "denominator" | "rate",
    newValue: string
  ) => {
    const digitsAfterDecimal = 1;
    if (!allNumbers.test(newValue)) return;
    if (type === "rate" && readOnly) return;
    const prevRate = [...field.value];
    const editRate = { ...prevRate[index] };
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
        label: rates[index].label,
        ...editRate,
      };
      field.onChange([...prevRate]);
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
      label: rates[index].label,
      ...editRate,
    };

    test(prevRate);

    field.onChange([...prevRate]);
  };

  const test = (rates: any[]) => {
    const categoryType = categoryName?.split(":")[0];
    const ratesByCat = Object.values(allRates)
      .flat()
      .filter((rate: any) => rate?.category?.includes(categoryType!));
    rates?.forEach((rate) => {
      let ratesByQual = ratesByCat.filter((catRate) =>
        catRate?.label?.includes(rate.label!)
      );
      ratesByQual = ratesByQual.map(
        (qualRate) =>
          rates.find((rate) => rate.uid === qualRate?.uid) ?? qualRate
      );
      const summedRates = sumRates(ratesByQual);
      testRates?.forEach((testRate, idx) => {
        testRate.forEach((tRate, t_idx) => {
          const find = summedRates.find(
            (sumRate) => sumRate["uid"] === tRate.uid
          );
          if(find){
            testRates[idx][t_idx] = find;
          }
        });
      });
    });
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
    rates.push({ ...total, ...totalRate });
    return rates;
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
                  !!objectPath.get(errors, `${name}.${index}.numerator`)
                    ?.message
                }
                errorMessage={
                  objectPath.get(errors, `${name}.${index}.numerator`)?.message
                }
                {...rest}
              >
                <CUI.Input
                  type="text"
                  aria-label={`${name}.${index}.numerator`}
                  value={field.value[index]?.numerator ?? ""}
                  data-cy={`${name}.${index}.numerator`}
                  onChange={(e) =>
                    changeRate(index, "numerator", e.target.value)
                  }
                />
              </QMR.InputWrapper>
              <QMR.InputWrapper
                label={customDenominatorLabel || "Denominator"}
                isInvalid={
                  !!objectPath.get(errors, `${name}.${index}.denominator`)
                    ?.message
                }
                errorMessage={
                  objectPath.get(errors, `${name}.${index}.denominator`)
                    ?.message
                }
                {...rest}
              >
                <CUI.Input
                  aria-label={`${name}.${index}.denominator`}
                  value={field.value[index]?.denominator ?? ""}
                  type="text"
                  data-cy={`${name}.${index}.denominator`}
                  onChange={(e) =>
                    changeRate(index, "denominator", e.target.value)
                  }
                />
              </QMR.InputWrapper>
              <QMR.InputWrapper
                label={customRateLabel || "Rate"}
                isInvalid={
                  !!objectPath.get(errors, `${name}.${index}.rate`)?.message
                }
                errorMessage={
                  objectPath.get(errors, `${name}.${index}.rate`)?.message
                }
                {...rest}
              >
                <CUI.Input
                  aria-label={`${name}.${index}.rate`}
                  value={field.value[index]?.rate ?? ""}
                  type="text"
                  data-cy={`${name}.${index}.rate`}
                  onChange={(e) => changeRate(index, "rate", e.target.value)}
                  readOnly={readOnly}
                />
              </QMR.InputWrapper>
            </CUI.HStack>
            {!allowNumeratorGreaterThanDenominator &&
              parseFloat(field.value[index]?.numerator) >
                parseFloat(field.value[index]?.denominator) && (
                <QMR.Notification
                  alertTitle="Rate Error"
                  alertDescription={`Numerator: ${field.value[index]?.numerator} cannot be greater than Denominator: ${field.value[index]?.denominator}`}
                  alertStatus="warning"
                />
              )}
          </CUI.Stack>
        );
      })}
    </>
  );
};
