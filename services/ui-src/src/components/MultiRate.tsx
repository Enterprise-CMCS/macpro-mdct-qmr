import * as CUI from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";
import {
  allNumbers,
  eightNumbersOneDecimal,
  // rateThatAllowsFourDecimals,
  // rateThatAllowsOneDecimal,
  // allPositiveIntegersWith8Digits,
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
    type: "numerator" | "denominator" | "rate" | "value",
    newValue: string
  ) => {
    if (!allNumbers.test(newValue)) return;
    if (type === "rate" && readOnly) return;

    const prevRate = [...field.value];
    const editRate = { ...prevRate[index] };
    // TODO: Change input validator to match measure spec
    const validEditRate = eightNumbersOneDecimal.test(newValue); // 16 digits? 4 decimals?

    if (type !== "rate") {
      editRate[type] = validEditRate ? newValue : editRate[type];
    }

    prevRate[index] = {
      label: rates[index].label,
      ...editRate,
    };
    field.onChange([...prevRate]);
  };

  return (
    <>
      <CUI.Stack my={8} direction="row">
        {rates.slice(0, 5).map((rate, index) => {
          return (
            <QMR.InputWrapper
              label={rate.label}
              isInvalid={
                !!objectPath.get(errors, `${name}.${index}.value`)?.message
              }
              errorMessage={
                objectPath.get(errors, `${name}.${index}.value`)?.message
              }
              {...rest}
            >
              <CUI.Input
                value={field.value[index]?.value ?? ""}
                data-cy={`${name}.${index}.value`}
                onChange={(e) => changeRate(index, "value", e.target.value)}
              />
            </QMR.InputWrapper>
          );
        })}
      </CUI.Stack>
      <CUI.Stack my={8} direction="row">
        {rates.slice(6).map((rate, index) => {
          return (
            <QMR.InputWrapper
              label={rate.label}
              isInvalid={
                !!objectPath.get(errors, `${name}.${index + 5}.value`)?.message
              }
              errorMessage={
                objectPath.get(errors, `${name}.${index + 5}.value`)?.message
              }
              {...rest}
            >
              <CUI.Input
                value={field.value[index + 5]?.value ?? ""}
                data-cy={`${name}.${index + 5}.value`}
                onChange={(e) => changeRate(index + 5, "value", e.target.value)}
              />
            </QMR.InputWrapper>
          );
        })}
      </CUI.Stack>
    </>
    // <CUI.Stack my={8} direction="row">
    //   {rates.map((rate, index) => {
    //     return (
    //       <>

    //         {parseFloat(field.value[index]?.numerator) >
    //           parseFloat(field.value[index]?.denominator) && (
    //           <QMR.Notification
    //             alertTitle="Rate Error"
    //             alertDescription={`Numerator: ${field.value[index]?.numerator} cannot be greater than Denominator: ${field.value[index]?.denominator}`}
    //             alertStatus="warning"
    //           />
    //         )}
    //       </>
    //     );
    //   })}
    // </CUI.Stack>
  );
};
