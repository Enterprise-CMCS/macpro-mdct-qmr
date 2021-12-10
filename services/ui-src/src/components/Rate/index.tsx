import * as CUI from "@chakra-ui/react";
import * as Inputs from "components/Inputs";
import { Control } from "react-hook-form";
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
  control?: Control<any, object>;
}

export const Rate = ({ rates, name }: Props) => {
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
            <Inputs.NumberInput name={`${name}.${index}.rate`} label="Rate" />
          </CUI.HStack>
        </CUI.Stack>
      ))}
    </>
  );
};
