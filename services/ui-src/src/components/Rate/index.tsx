import * as CUI from "@chakra-ui/react";
import * as Inputs from "components/Inputs";
import { useController, useFormContext } from "react-hook-form";
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

interface SingleProps {
  name: string;
  label?: string;
}

export const SinglePreCalcRate = ({ name, label }: SingleProps) => {
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
  });

  return (
    <CUI.Stack key={`${name}.singleRate`}>
      {label && <CUI.FormLabel fontWeight={700}>{label}</CUI.FormLabel>}
      <CUI.HStack spacing={2}>
        <Inputs.NumberInput name={`${name}.numerator`} label="Numerator" />
        <Inputs.NumberInput name={`${name}.denominator`} label="Denominator" />
        <CUI.Stack>
          <CUI.FormLabel>{"Rate"}</CUI.FormLabel>
          <CUI.Text>
            {field.value?.numerator && field.value?.denominator
              ? field.value.numerator / field.value.denominator
              : "0.0"}
          </CUI.Text>
        </CUI.Stack>
      </CUI.HStack>
    </CUI.Stack>
  );
};
