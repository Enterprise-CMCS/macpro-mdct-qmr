import React from "react";
import * as CUI from "@chakra-ui/react";
import * as Inputs from "components/Inputs";
// import { InputWrapperProps } from "components/InputWrapper";

// interface NumericRateProps extends InputWrapperProps {

// }

export interface IRateChild {
  numerator: string;
  denominator: string;
  rate: string;
  id: number;
}

export const RateChild = (
  numerator: string, 
  denominator: string, 
  rate: string, id: number, 
  setRateChildValues:(rateChildValues: IRateChild) => void) => {
  const [numeratorValue, setNumeratorValue] = React.useState("");
  const [denominatorValue, setDenominatorValue] = React.useState("");
  const [rateValue, setRateValue] = React.useState("");
  const updateRate = () => {
    setRateChildValues({numerator: numeratorValue, denominator: denominatorValue, rate: rateValue, id: id});
  }

  const setNumeratorRowValue = (value: string): void => {
    if (/^e?\+?-?\d*\.?\d{0,4}$/.test(value)) {
      setNumeratorValue(value);
      updateRate();
    }
  };

  const setDenominatorRowValue = (value: string): void => {
    if (/^e?\+?-?\d*\.?\d{0,4}$/.test(value)) {
      setDenominatorValue(value);
      updateRate();
    }
  };

  const setRateRowValue = (value: string): void => {
    if (/^e?\+?-?\d*\.?\d{0,4}$/.test(value)) {
      setRateValue(value);
      updateRate();
    }
  };

  return (
    <CUI.Flex w="66%">
      <CUI.Box m={2}>
        <Inputs.NumberInput
          allowSymbols={true}
          value={numerator}
          onChange={(e) => setNumeratorRowValue(e.target.value)}
          label="Numerator"
        />
      </CUI.Box>
      <CUI.Box m={2}>
        <Inputs.NumberInput
          allowSymbols={true}
          value={denominator}
          onChange={(e) => setDenominatorRowValue(e.target.value)}
          label="Denominator"
        />
      </CUI.Box>
      <CUI.Box m={2}>
        <Inputs.NumberInput
          allowSymbols={true}
          value={rate}
          onChange={(e) => setRateRowValue(e.target.value)}
          label="Rate"
        />
      </CUI.Box>
    </CUI.Flex>
  );
};
