import * as CUI from "@chakra-ui/react";
import * as Inputs from "components/Inputs";

export interface IRate {
  label?: string;
  numerator: string;
  denominator: string;
  rate: string;
}

type RateTypes = "numerator" | "denominator" | "rate";

interface Props {
  rates: IRate[];
  updateRates: React.Dispatch<React.SetStateAction<IRate[]>>;
}

export function Rate({ rates, updateRates }: Props) {
  const updateRate = (rateType: RateTypes, index: number, newValue: string) => {
    const newRates = [...rates];
    newRates[index][rateType] = newValue;
    updateRates(newRates);
  };

  return (
    <>
      {rates.map((rate, index) => (
        <CUI.Stack key={index}>
          {rate.label && <CUI.FormLabel m={2}>{rate.label}</CUI.FormLabel>}
          <CUI.Flex>
            <CUI.Box m={2}>
              <Inputs.NumberInput
                value={rate.numerator}
                onChange={(e) =>
                  /^\+?-?\d*\.?\d{0,4}$/.test(e.target.value)
                    ? updateRate("numerator", index, e.target.value)
                    : null
                }
                label="Numerator"
              />
            </CUI.Box>
            <CUI.Box m={2}>
              <Inputs.NumberInput
                value={rate.denominator}
                onChange={(e) =>
                  /^\+?-?\d*\.?\d{0,4}$/.test(e.target.value)
                    ? updateRate("denominator", index, e.target.value)
                    : null
                }
                label="Denominator"
              />
            </CUI.Box>
            <CUI.Box m={2}>
              <Inputs.NumberInput
                value={rate.rate}
                onChange={(e) =>
                  /^\+?-?\d*\.?\d{0,4}$/.test(e.target.value)
                    ? updateRate("rate", index, e.target.value)
                    : null
                }
                label="Rate"
              />
            </CUI.Box>
          </CUI.Flex>
        </CUI.Stack>
      ))}
    </>
  );
}
