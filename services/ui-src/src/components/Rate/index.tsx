import * as CUI from "@chakra-ui/react";
import * as Inputs from "components/Inputs";
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

export const Rate = ({ rates, name }: Props) => {
  const { watch } = useFormContext();
  const watchRateArray = watch(name);

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
            <CUI.Stack>
              <CUI.FormLabel>{"Rate"}</CUI.FormLabel>
              <CUI.Text>
                {watchRateArray &&
                watchRateArray[index] &&
                watchRateArray[index].numerator &&
                watchRateArray[index].denominator
                  ? watchRateArray[index].numerator /
                    watchRateArray[index].denominator
                  : 0}
              </CUI.Text>
            </CUI.Stack>
          </CUI.HStack>
        </CUI.Stack>
      ))}
    </>
  );
};
