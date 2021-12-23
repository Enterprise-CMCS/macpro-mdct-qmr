import * as CUI from "@chakra-ui/react";
import * as Inputs from "components/Inputs";
import { useFormContext } from "react-hook-form";
export interface IRate {
  label?: string;
  id: number;
}

interface Props {
  rates: IRate[];
  name: string;
}

export const Rate = ({ rates, name }: Props) => {
  const { watch, setValue, getValues } = useFormContext();
  const watchRateArray = watch(name);
  return (
    <>
      {rates.map((rate, index) => {
        const s =
          watchRateArray &&
          watchRateArray[index] &&
          watchRateArray[index].numerator &&
          watchRateArray[index].denominator
            ? watchRateArray[index].numerator /
              watchRateArray[index].denominator
            : 0;
        const currentValue = getValues(`${name}.${index}.rate`);
        if (currentValue !== s.toString()) {
          setValue(`${name}.${index}.rate`, s.toString());
        }
        return (
          <CUI.Stack key={rate.id} my={8}>
            {rate.label && (
              <CUI.FormLabel fontWeight={700}>{rate.label}</CUI.FormLabel>
            )}
            <CUI.HStack spacing={16}>
              <Inputs.NumberInput
                name={`${name}.${index}.numerator`}
                label="Numerator"
              />
              <Inputs.NumberInput
                name={`${name}.${index}.denominator`}
                label="Denominator"
              />
              <Inputs.NumberInput name={`${name}.${index}.rate`} label="Rate" />
            </CUI.HStack>
          </CUI.Stack>
        );
      })}
    </>
  );
};
