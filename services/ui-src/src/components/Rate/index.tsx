import * as CUI from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";
import { allNumbers } from "utils/numberInputMasks";
import * as QMR from "components";
import objectPath from "object-path";
import { useEffect } from "react";
export interface IRate {
  label?: string;
  id: number;
}

interface Props extends QMR.InputWrapperProps {
  rates: IRate[];
  name: string;
  readOnly?: boolean;
  defaultNumDenValue?: number;
}

interface RateValue {
  numerator?: string;
  denominator?: string;
  rate?: string;
}

export const Rate = ({
  rates,
  name,
  readOnly = true,
  defaultNumDenValue,
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
    editRate[type] = newValue;

    if (type === "rate" && !readOnly && prevRate[index]?.rate !== undefined) {
      prevRate[index].rate = newValue;
      field.onChange([...prevRate]);
      return;
    }

    if (parseInt(editRate.denominator) && editRate.numerator) {
      editRate.rate = ((editRate.numerator / editRate.denominator) * 100)
        .toFixed(4)
        .toString();
    } else if (editRate.rate) {
      editRate.rate = "";
    }

    prevRate[index] = editRate;
    field.onChange([...prevRate]);
  };

  useEffect(() => {
    const newValues: (RateValue | undefined)[] = [];
    rates.forEach((item, index) => {
      if (
        !field.value[index]?.numerator &&
        !field.value[index]?.denominator &&
        defaultNumDenValue !== undefined
      ) {
        newValues[item.id] = {
          numerator: `${defaultNumDenValue}`,
          denominator: `${defaultNumDenValue}`,
          rate: `${defaultNumDenValue}`,
        };
      } else if (
        field.value[index]?.numerator ||
        field.value[index]?.denominator
      ) {
        newValues.push({
          numerator: field.value[index]?.numerator ?? "",
          denominator: field.value[index]?.denominator ?? "",
          rate: field.value[index]?.rate ?? "",
        });
      } else {
        newValues.push(undefined);
      }
    });
    field.onChange([...newValues]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultNumDenValue, rates]);

  return (
    <>
      {rates.map((rate, index) => {
        return (
          <CUI.Stack key={rate.id} my={8}>
            {rate.label && (
              <CUI.FormLabel fontWeight={700}>{rate.label}</CUI.FormLabel>
            )}
            <CUI.HStack spacing={16}>
              <QMR.InputWrapper
                label="Numerator"
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
                  onChange={(e) =>
                    changeRate(index, "numerator", e.target.value)
                  }
                />
              </QMR.InputWrapper>
              <QMR.InputWrapper
                label="Denominator"
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
                  onChange={(e) =>
                    changeRate(index, "denominator", e.target.value)
                  }
                />
              </QMR.InputWrapper>
              <QMR.InputWrapper
                label="Rate"
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
                  onChange={(e) => changeRate(index, "rate", e.target.value)}
                  readOnly={readOnly}
                />
              </QMR.InputWrapper>
            </CUI.HStack>
          </CUI.Stack>
        );
      })}
    </>
  );
};
