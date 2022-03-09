import * as CUI from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";
import {
  allNumbers,
  sixteenNumbersFourDecimal,
  allPositiveIntegersWith10Digits,
} from "utils/numberInputMasks";
import * as QMR from "components";
import objectPath from "object-path";
import { IRate } from "components";
import { rateCalculation } from "components/Rate";

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
    defaultValue: rates,
  });

  // This is the basic structure of the NDR sets.
  // There are 4 rates, each is calculated by a combination of the other fields.
  const ndrForumlas = [
    {
      numerator: 1,
      denominator: 0,
      rateIndex: 2,
    },
    {
      numerator: 3,
      denominator: 0,
      rateIndex: 4,
    },
    {
      numerator: 1,
      denominator: 3,
      rateIndex: 5,
    },
    {
      numerator: 7,
      denominator: 6,
      rateIndex: 8,
    },
  ];

  const rateLocations = ndrForumlas.map((ndr) => ndr.rateIndex);

  const calculateRates = (prevRate: any, digitsAfterDecimal: number) => {
    ndrForumlas.forEach((ndr) => {
      if (
        prevRate[ndr.numerator]?.value &&
        prevRate[ndr.denominator]?.value &&
        !isNaN(parseInt(prevRate[ndr.numerator].value)) &&
        !isNaN(parseInt(prevRate[ndr.denominator].value))
      ) {
        prevRate[ndr.rateIndex]["value"] = rateCalculation(
          prevRate[ndr.numerator].value,
          prevRate[ndr.denominator].value,
          rateMultiplicationValue,
          digitsAfterDecimal
        );
      }
    });
  };

  const changeRate = (index: number, newValue: string) => {
    const isRate = rateLocations.includes(index);
    if (isRate && readOnly) return;
    if (!allNumbers.test(newValue)) return;

    const digitsAfterDecimal = 4;
    const prevRate = [...field.value];
    const editRate = { ...prevRate[index] };

    let validValue;

    if (isRate && (validValue = sixteenNumbersFourDecimal.test(newValue))) {
      editRate["value"] = validValue ? newValue : editRate["value"];
    } else if (
      !isRate &&
      (validValue = allPositiveIntegersWith10Digits.test(newValue))
    ) {
      editRate["value"] = validValue ? newValue : editRate["value"];
    }

    prevRate[index] = {
      label: rates[index].label,
      ...editRate,
    };

    if (!isRate) {
      calculateRates(prevRate, digitsAfterDecimal);
    }
    field.onChange([...prevRate]);
  };

  const generateInputs = (rate: IRate, index: number) => {
    const colorString = index % 2 === 0 ? "#FFF" : "#f5f5f5";
    return (
      <>
        <QMR.InputWrapper
          label={rate.label}
          isInvalid={
            !!objectPath.get(errors, `${name}.${index}.value`)?.message
          }
          errorMessage={
            objectPath.get(errors, `${name}.${index}.value`)?.message
          }
          formControlProps={{
            backgroundColor: colorString,
            padding: "14px",
          }}
          {...rest}
        >
          {rateLocations.includes(index) && readOnly ? (
            <CUI.Text>{field.value[index].value}</CUI.Text>
          ) : (
            <CUI.Input
              value={field.value[index]?.value ?? ""}
              data-cy={`${name}.${index}.value`}
              bgColor={"#FFF"}
              onChange={(e) => changeRate(index, e.target.value)}
            />
          )}
        </QMR.InputWrapper>
      </>
    );
  };

  return (
    // TODO: Are we throwing an error for num > denom? This is not in ticket.
    <>
      <CUI.Stack my={8} direction="row">
        {rates.slice(0, 6).map((rate, index) => {
          return generateInputs(rate, index);
        })}
      </CUI.Stack>
      <CUI.Divider />
      <CUI.Stack my={8} direction="row">
        {rates.slice(6).map((rate, index) => {
          index += 6;
          return generateInputs(rate, index);
        })}
      </CUI.Stack>
    </>
  );
};
