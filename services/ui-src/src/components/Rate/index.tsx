import * as CUI from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";
import { allNumbers } from "utils/numberInputMasks";
export interface IRate {
  label?: string;
  id: number;
}

interface Props {
  rates: IRate[];
  name: string;
}

export const Rate = ({ rates, name }: Props) => {
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
    if (type === "rate") return;

    const prevRate = [...field.value];
    const editRate = { ...prevRate[index] };
    editRate[type] = newValue;

    console.log(editRate);

    if (parseInt(editRate.denominator) && editRate.numerator) {
      console.log("in here", editRate.numerator, editRate.denominator);
      editRate.rate = (editRate.numerator / editRate.denominator)
        .toFixed(4)
        .toString();
      console.log(editRate.rate);
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
              <CUI.Input
                value={field.value[index]?.numerator ?? ""}
                onChange={(e) => changeRate(index, "numerator", e.target.value)}
              />
              <CUI.Input
                value={field.value[index]?.denominator ?? ""}
                onChange={(e) =>
                  changeRate(index, "denominator", e.target.value)
                }
              />
              <CUI.Input
                value={field.value[index]?.rate ?? ""}
                onChange={(e) => changeRate(index, "rate", e.target.value)}
                readOnly
              />
            </CUI.HStack>
          </CUI.Stack>
        );
      })}
    </>
  );
};
