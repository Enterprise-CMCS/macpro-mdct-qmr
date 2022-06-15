import * as CUI from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";
import {
  allNumbers,
  allPositiveIntegersWith8Digits,
  eightNumbersOneDecimal,
  rateThatAllowsOneDecimal,
} from "utils/numberInputMasks";
import * as QMR from "components";
import objectPath from "object-path";
import { useEffect, useLayoutEffect } from "react";

const fixRounding = (value: number, numbersAfterDecimal: number) => {
  return (
    Math.round((value + Number.EPSILON) * Math.pow(10, numbersAfterDecimal)) /
    Math.pow(10, numbersAfterDecimal)
  );
};

export const AABRateCalculation = (
  numerator: string,
  denominator: string,
  rateMultiplicationValue: number,
  numbersAfterDecimal: number
) => {
  const floatNumerator = parseFloat(numerator);
  const floatDenominator = parseFloat(denominator);
  const floatRate = 1 - floatNumerator / floatDenominator;
  const roundedRate = fixRounding(
    floatRate * rateMultiplicationValue,
    numbersAfterDecimal
  );
  return roundedRate.toFixed(numbersAfterDecimal);
};

export interface AABIRate {
  label?: string;
  id: number;
}

interface Props extends QMR.InputWrapperProps {
  rates: AABIRate[];
  name: string;
  readOnly?: boolean;
}

export const AABRate = ({ rates, name, readOnly = true, ...rest }: Props) => {
  const {
    control,
    formState: { errors },
    unregister,
  } = useFormContext();
  const rateMultiplicationValue = 100;

  const { field } = useController({
    name,
    control,
    defaultValue: [],
  });

  useEffect(() => {
    const prevRate = [...field.value];
    rates.forEach((rate, index) => {
      if (prevRate[index] === undefined) {
        prevRate[index] = {};
      }
      prevRate[index]["label"] = rate.label ?? undefined;
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
      prevRate[index] ??= {
        numerator: "",
        denominator: "",
        rate: "",
      };

      const regex = rateThatAllowsOneDecimal;

      prevRate[index].rate =
        regex.test(newValue) || newValue === ""
          ? newValue
          : prevRate[index].rate;

      field.onChange([...prevRate]);
      return;
    }

    if (
      parseInt(editRate.denominator) &&
      editRate.numerator &&
      parseFloat(editRate.numerator) <= parseFloat(editRate.denominator)
    ) {
      editRate.rate = AABRateCalculation(
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

    field.onChange([...prevRate]);
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
                {rate.label}
              </CUI.FormLabel>
            )}
            <CUI.HStack spacing={16}>
              <QMR.InputWrapper
                label={"Numerator"}
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
                  value={field.value[index]?.numerator ?? ""}
                  data-cy={`${name}.${index}.numerator`}
                  onChange={(e) =>
                    changeRate(index, "numerator", e.target.value)
                  }
                />
              </QMR.InputWrapper>
              <QMR.InputWrapper
                label={"Denominator"}
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
                  value={field.value[index]?.denominator ?? ""}
                  data-cy={`${name}.${index}.denominator`}
                  onChange={(e) =>
                    changeRate(index, "denominator", e.target.value)
                  }
                />
              </QMR.InputWrapper>
              <QMR.InputWrapper
                label={"Rate"}
                isInvalid={
                  !!objectPath.get(errors, `${name}.${index}.rate`)?.message
                }
                errorMessage={
                  objectPath.get(errors, `${name}.${index}.rate`)?.message
                }
                {...rest}
              >
                <CUI.Input
                  value={field.value[index]?.rate ?? ""}
                  data-cy={`${name}.${index}.rate`}
                  onChange={(e) => changeRate(index, "rate", e.target.value)}
                  readOnly={readOnly}
                />
              </QMR.InputWrapper>
            </CUI.HStack>
            {parseFloat(field.value[index]?.numerator) >
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
