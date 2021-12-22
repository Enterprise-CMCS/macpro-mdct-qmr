import * as CUI from "@chakra-ui/react";
import * as Inputs from "components/Inputs";
import { useFormContext, useController } from "react-hook-form";
export interface IRate {
  label?: string;
  numerator: string;
  denominator: string;
  rate: string;
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
  });
  // , watch
  // const watchRateArray = watch('name')

  return (
    <>
      {rates.map((rate, index) => (
        <CUI.Stack key={rate.id}>
          {rate.label && (
            <CUI.FormLabel fontWeight={700}>{rate.label}</CUI.FormLabel>
          )}
          <CUI.HStack spacing={2}>
            <Inputs.NumberInput
              name={`${name}.${index}.numerator`}
              label="Numerator"
            />
            <Inputs.NumberInput
              name={`${name}.${index}.denominator`}
              label="Denominator"
            />
            <CUI.Text label="Rate">
              {(field.value[index]?.numerator &&
                field.value[index]?.denominator &&
                4) ||
                0}
            </CUI.Text>
          </CUI.HStack>
        </CUI.Stack>
      ))}
    </>
  );
};
