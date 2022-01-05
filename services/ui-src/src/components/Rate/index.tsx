import * as CUI from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";
import { allNumbers } from "utils/numberInputMasks";
import * as QMR from "components";
export interface IRate {
  label?: string;
  id: number;
}

interface Props {
  rates: IRate[];
  name: string;
  readOnly?: boolean;
}

export const Rate = ({ rates, name, readOnly = true }: Props) => {
  const { control } = useFormContext();

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

    if (type === "rate" && !readOnly) {
      prevRate[index].rate = newValue;
      field.onChange([...prevRate]);
      return;
    }

    if (parseInt(editRate.denominator) && editRate.numerator) {
      editRate.rate = (editRate.numerator / editRate.denominator)
        .toFixed(4)
        .toString();
    }

    prevRate[index] = editRate;
    field.onChange([...prevRate]);
  };

  return (
    <>
      {rates.map((rate, index) => {
        return (
          <CUI.Stack key={rate.id} my={8}>
            {rate.label && (
              <CUI.FormLabel fontWeight={700}>{rate.label}</CUI.FormLabel>
            )}
            <CUI.HStack spacing={16}>
              <QMR.InputWrapper label="Numerator">
                <CUI.Input
                  value={field.value[index]?.numerator ?? ""}
                  onChange={(e) =>
                    changeRate(index, "numerator", e.target.value)
                  }
                />
              </QMR.InputWrapper>
              <QMR.InputWrapper label="Denominator">
                <CUI.Input
                  value={field.value[index]?.denominator ?? ""}
                  onChange={(e) =>
                    changeRate(index, "denominator", e.target.value)
                  }
                />
              </QMR.InputWrapper>
              <QMR.InputWrapper label="Rate">
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
