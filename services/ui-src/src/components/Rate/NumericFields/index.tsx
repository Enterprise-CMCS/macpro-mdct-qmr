import React from "react";
import * as CUI from "@chakra-ui/react";
import * as Inputs from "components/Inputs";
// import { InputWrapperProps } from "components/InputWrapper";

// interface NumericRateProps extends InputWrapperProps {

// }

export const NumericFields = () => {
  const [numeratorValue, setNumeratorValue] = React.useState("");
  const [denominatorValue, setDenominatorValue] = React.useState("");
  const [rateValue, setRateValue] = React.useState("");

  const setNumeratorRowValue = (value: string): void => {
    if (/^e?\+?-?\d*\.?\d{0,4}$/.test(value)) {
      setNumeratorValue(value);
    }
  };

  const setDenominatorRowValue = (value: string): void => {
    if (/^e?\+?-?\d*\.?\d{0,4}$/.test(value)) {
      setDenominatorValue(value);
    }
  };

  const setRateRowValue = (value: string): void => {
    if (/^e?\+?-?\d*\.?\d{0,4}$/.test(value)) {
      setRateValue(value);
    }
  };

  return (
    <CUI.Flex w="66%">
      <CUI.Box m={2}>
        <Inputs.NumberInput
          allowSymbols={true}
          value={numeratorValue}
          onChange={(e) => setNumeratorRowValue(e.target.value)}
          label="Numerator"
        />
      </CUI.Box>
      <CUI.Box m={2}>
        <Inputs.NumberInput
          allowSymbols={true}
          value={denominatorValue}
          onChange={(e) => setDenominatorRowValue(e.target.value)}
          label="Denominator"
        />
      </CUI.Box>
      <CUI.Box m={2}>
        <Inputs.NumberInput
          allowSymbols={true}
          value={rateValue}
          onChange={(e) => setRateRowValue(e.target.value)}
          label="Rate"
        />
      </CUI.Box>
    </CUI.Flex>
  );
};
