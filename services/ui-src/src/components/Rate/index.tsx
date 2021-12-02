import * as CUI from "@chakra-ui/react";
// import * as Inputs from "components/Inputs";

export interface IRate {
  label?: string;
  numerator: string;
  denominator: string;
  rate: string;
  id: number;
}

// type RateTypes = "numerator" | "denominator" | "rate";

interface Props {
  rates: IRate[];
  updateRates: React.Dispatch<React.SetStateAction<IRate[]>>;
}
// , updateRates
export function Rate({ rates }: Props) {
  // const updateRate = (rateType: RateTypes, index: number, newValue: string) => {
  //   const newRates = [...rates];
  //   newRates[index][rateType] = newValue;
  //   updateRates(newRates);
  // };

  // const regex = /^-?\d*\.?\d{0,4}$/;

  return (
    <>
      {rates.map((rate) => (
        <CUI.Stack key={rate.id}>
          {rate.label && (
            <CUI.FormLabel fontWeight={700}>{rate.label}</CUI.FormLabel>
          )}
          <CUI.HStack spacing={2}>
            {/* <Inputs.NumberInput
              // value={rate.numerator}
              onChange={(e) =>
                regex.test(e.target.value)
                  ? updateRate("numerator", index, e.target.value)
                  : null
              }
              label="Numerator"
            />
            <Inputs.NumberInput
              // value={rate.denominator}
              onChange={(e) =>
                regex.test(e.target.value)
                  ? updateRate("denominator", index, e.target.value)
                  : null
              }
              label="Denominator"
            />
            <Inputs.NumberInput
              // value={rate.rate}
              onChange={(e) =>
                regex.test(e.target.value)
                  ? updateRate("rate", index, e.target.value)
                  : null
              }
              label="Rate"
            /> */}
          </CUI.HStack>
        </CUI.Stack>
      ))}
    </>
  );
}
