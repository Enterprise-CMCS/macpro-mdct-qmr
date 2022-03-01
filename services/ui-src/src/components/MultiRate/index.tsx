import * as CUI from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";
import {
  allNumbers,
  eightNumbersOneDecimal,
  rateThatAllowsFourDecimals,
  rateThatAllowsOneDecimal,
  allPositiveIntegersWith8Digits,
} from "utils/numberInputMasks";
import * as QMR from "components";
import objectPath from "object-path";
import { IRate } from "components";

interface Props extends QMR.InputWrapperProps {
  rates: IRate[];
  name: string;
  readOnly?: boolean;
  allowMultiple?: boolean;
  rateMultiplicationValue?: number;
  customMask?: RegExp;
}

export const MultiRate = ({
  rates,
  name,
  allowMultiple = false,
  readOnly = true,
  rateMultiplicationValue = 100,
  customMask,
  ...rest
}: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({
    name,
    control,
    defaultValue: [],
  });

  const changeRate = (
    index: number,
    type: "numerator" | "denominator" | "rate",
    newValue: string
  ) => {
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

      const regex = allowMultiple
        ? rateThatAllowsFourDecimals
        : rateThatAllowsOneDecimal;

      prevRate[index].rate =
        regex.test(newValue) || newValue === "" || customMask?.test(newValue)
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
      editRate.rate = (
        (editRate.numerator / editRate.denominator) *
        rateMultiplicationValue
      )
        .toFixed(1)
        .toString();
    } else if (editRate.rate) {
      editRate.rate = "";
    }

    prevRate[index] = editRate;
    field.onChange([...prevRate]);
  };

  return (
    <CUI.Stack my={8} direction="row">
      {rates.map((rate, index) => {
        return (
          <>
            <QMR.InputWrapper
              label={rate.label}
              isInvalid={
                !!objectPath.get(errors, `${name}.${index}.numerator`)?.message
              }
              errorMessage={
                objectPath.get(errors, `${name}.${index}.numerator`)?.message
              }
              {...rest}
            >
              <CUI.Input
                value={field.value[index]?.numerator ?? ""}
                data-cy={`${name}.${index}.numerator`}
                onChange={(e) => changeRate(index, "numerator", e.target.value)}
              />
            </QMR.InputWrapper>
            {parseFloat(field.value[index]?.numerator) >
              parseFloat(field.value[index]?.denominator) && (
              <QMR.Notification
                alertTitle="Rate Error"
                alertDescription={`Numerator: ${field.value[index]?.numerator} cannot be greater than Denominator: ${field.value[index]?.denominator}`}
                alertStatus="warning"
              />
            )}
          </>
        );
      })}
    </CUI.Stack>
  );
};
