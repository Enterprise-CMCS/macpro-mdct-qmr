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

export function BriansRate({ rates, updateRates }: Props) {
  const updateRate = (rateType: RateTypes, index: number, newValue: string) => {
    const newRates = [...rates];
    newRates[index][rateType] = newValue;
    updateRates(newRates);
  };

  return (
    <>
      {rates.map((rate, index) => (
        <CUI.Flex>
          {/* {label && <CUI.FormLabel>{label}</CUI.FormLabel>} */}
          <CUI.Box m={2}>
            <Inputs.NumberInput
              allowSymbols={true}
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
              allowSymbols={true}
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
              allowSymbols={true}
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
      ))}
    </>
  );
}
