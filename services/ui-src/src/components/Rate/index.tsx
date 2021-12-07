import * as CUI from "@chakra-ui/react";
import * as Inputs from "components/Inputs";
import React from "react";
import { useFormContext } from "react-hook-form";
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

export const Rate = React.forwardRef<any, Props>(({ rates, name }, _ref) => {
  const { register } = useFormContext();
  return (
    <>
      {rates.map((rate, index) => (
        <CUI.Stack key={rate.id}>
          {rate.label && (
            <CUI.FormLabel fontWeight={700}>{rate.label}</CUI.FormLabel>
          )}
          <CUI.HStack spacing={2}>
            <Inputs.NumberInput
              {...register(`${name}.${index}.numerator`)}
              label="Numerator"
            />
            <Inputs.NumberInput
              {...register(`${name}.${index}.denominator`)}
              label="Denominator"
            />
            <Inputs.NumberInput
              {...register(`${name}.${index}.rate`)}
              label="Rate"
            />
          </CUI.HStack>
        </CUI.Stack>
      ))}
    </>
  );
});
