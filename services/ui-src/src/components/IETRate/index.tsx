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
import { RateFormula } from "utils/rateFormulas/rateFormulas";

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

  /*
   * Every time a user enters data into the field, it rerenderers the whole performance measure component, meaning the fields values are removed
   * We have to rebuild the data structures each time if the data hasn't been saved.
   */
  const rebuildFields = () => {
    //field.value is how we access saved data and if its empty, we need to rebuild the fields from scratch
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
            qual.id.toLowerCase() === "total";
        });
      });
      return values;
    }
    return { ...field.value };
  };

  const changeRate = (
    index: number,
    type: "numerator" | "denominator" | "rate",
    newValue: string
  ) => {
    const digitsAfterDecimal = 1;
    if (!allNumbers.test(newValue)) return;
    if (type === "rate" && readOnly) return;

    let fieldRates = { ...rebuildFields() };
    const prevRate = [...fieldRates[catID]];
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
      fieldRates[catID] = [...prevRate];
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
      label: fieldRates[catID]?.[index]?.label,
      ...editRate,
    };
    fieldRates[catID] = [...prevRate];

    //if the field change is in a total category, we want to only sum that one to avoid double calculations
    if (categoryName?.toLowerCase()?.includes("total")) {
      fieldRates = categoryTotalSum(categoryName, fieldRates);
    } else {
      //sum of qualifiers, total categories with that qualifer, and the total of the total categories with that qualifier
      fieldRates = sumOfTotals(prevRate[index], fieldRates);
    }
    field.onChange({ ...fieldRates });
  };

  const categoryTotalSum = (category: string, fieldRates: AnyObject) => {
    const name = category?.split(":")[0];
    const totalCategory = Object.values(fieldRates)
      .flat()
      .find(
        (rate) =>
          rate.category.includes(name) &&
          rate.category.toLowerCase().includes("total")
      );

    const totalCategoryId = totalCategory.uid.split(".")[0];
    if (totalCategoryId) {
      return {
        ...updateValueInObject(
          [sum([...fieldRates[totalCategoryId]], true)],
          fieldRates
        ),
      };
    }
    return fieldRates;
  };

  const sumOfTotals = (qualifierRate: AnyObject, fieldRates: AnyObject) => {
    const categoryType: string = categoryName!.split(":")[0];

    const ratesByCat = Object.values(fieldRates)
      .flat()
      .filter((rate) => rate?.category?.includes(categoryType!));

    //the rates of the qualifiers of each category in category type
    let ratesOfQualifier = ratesByCat.filter(
      (categoryRate) => categoryRate?.label === qualifierRate.label!
    );

    //the rates of the qualifiers in this category
    let ratesOfCategory = ratesByCat.filter(
      (categoryRate) =>
        categoryRate?.uid.split(".")[0] === qualifierRate.uid.split(".")[0]
    );
    //add the sum back to the rates object
    const totalOfRates = [
      sum([...ratesOfQualifier])!,
      sum([...ratesOfCategory]),
    ];
    fieldRates = updateValueInObject(totalOfRates, fieldRates);
    fieldRates = updateValueInObject([sum([...ratesOfCategory])], fieldRates);

    //once we've updated the values for qualifers with total and total category with that qualifier, we now have to calculate the total of the total in the category
    fieldRates = categoryTotalSum(categoryType, fieldRates);
    return fieldRates;
  };

  const updateValueInObject = (newValues: AnyObject[], object: AnyObject) => {
    for (const [key, value] of Object.entries(object)) {
      value.forEach((item: AnyObject, idx: number) => {
        const foundValue = newValues?.find(
          (newValue) => newValue?.uid === item?.uid
        );
        if (foundValue) {
          object[key][idx] = { ...item, ...foundValue };
        }
      });
    }
    return object;
  };

  const calculate = (fieldRates: AnyObject[]) => {
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

  const sum = (rates: AnyObject[], checkById?: boolean) => {
    const totalRateIndex = rates.findIndex((rate) =>
      checkById
        ? rate?.uid.toLowerCase().includes(".total") && rate.isTotal
        : rate.isTotal
    );
    if (totalRateIndex > -1) {
      let totalRate = rates.splice(totalRateIndex, 1).flat()[0];
      const total = calculate(rates);
      return { ...totalRate, ...total };
    }
    return {};
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
        const key = `${name}.${catID}.${index}`;
        const fieldKey = field.value[catID]?.[index];
        return (
          <CUI.Stack key={rate.uid} mt={4} mb={8}>
            {rate.label && (
              <CUI.FormLabel fontWeight={700} data-cy={rate.label}>
                {labelText[rate.label] ?? rate.label}
              </CUI.FormLabel>
            )}
            <CUI.Stack spacing={16} direction={{ base: "column", md: "row" }}>
              <QMR.InputWrapper
                label={customNumeratorLabel || "Numerator"}
                isInvalid={
                  !!objectPath.get(errors, `${key}.numerator`)?.message
                }
                errorMessage={
                  objectPath.get(errors, `${key}.numerator`)?.message
                }
                {...rest}
              >
                <CUI.Input
                  type="text"
                  aria-label={`${key}.numerator`}
                  value={fieldKey?.numerator ?? ""}
                  data-cy={`${key}.numerator`}
                  onChange={(e) =>
                    changeRate(index, "numerator", e.target.value)
                  }
                />
              </QMR.InputWrapper>
              <QMR.InputWrapper
                label={customDenominatorLabel || "Denominator"}
                isInvalid={
                  !!objectPath.get(errors, `${key}.denominator`)?.message
                }
                errorMessage={
                  objectPath.get(errors, `${key}.denominator`)?.message
                }
                {...rest}
              >
                <CUI.Input
                  aria-label={`${key}.denominator`}
                  value={fieldKey?.denominator ?? ""}
                  type="text"
                  data-cy={`${key}.denominator`}
                  onChange={(e) =>
                    changeRate(index, "denominator", e.target.value)
                  }
                />
              </QMR.InputWrapper>
              <QMR.InputWrapper
                label={customRateLabel || "Rate"}
                isInvalid={!!objectPath.get(errors, `${key}.rate`)?.message}
                errorMessage={objectPath.get(errors, `${key}.rate`)?.message}
                {...rest}
              >
                <CUI.Input
                  aria-label={`${key}.rate`}
                  value={fieldKey?.rate ?? ""}
                  type="text"
                  data-cy={`${key}.rate`}
                  onChange={(e) => changeRate(index, "rate", e.target.value)}
                  readOnly={readOnly}
                />
              </QMR.InputWrapper>
            </CUI.Stack>
            {!allowNumeratorGreaterThanDenominator &&
              parseFloat(fieldKey?.numerator) >
                parseFloat(fieldKey?.denominator) && (
                <QMR.Notification
                  alertTitle="Rate Error"
                  alertDescription={`Numerator: ${fieldKey?.numerator} cannot be greater than Denominator: ${fieldKey?.denominator}`}
                  alertStatus="warning"
                />
              )}
          </CUI.Stack>
        );
      })}
    </>
  );
};
