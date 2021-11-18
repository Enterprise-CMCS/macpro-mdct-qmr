import React, { useEffect } from "react";
import * as CUI from "@chakra-ui/react";
import * as Inputs from "components/Inputs";
// import { InputWrapperProps } from "components/InputWrapper";

// interface RateProps extends InputWrapperProps {
//   }
// }

export function Rate(): JSX.Element {
  const [rateDescriptionValue, setRateDescriptionValue] = React.useState("");
  const [numeratorValue, setNumeratorValue] = React.useState("");
  const [denominatorValue, setDenominatorValue] = React.useState("");
  const [rateValue, setRateValue] = React.useState("");
  const [numberOfRateGroups, setRateGroupAmount] = React.useState(1);

  useEffect(() => {
    rowsToGenerate();
  });

  const setRateDescriptionRow = (value: string): void => {
    setRateDescriptionValue(value);
  };

  const setNumeratorRowValue = (value: string): void => {
    setNumeratorValue(value);
  };

  const setDenominatorRowValue = (value: string): void => {
    setDenominatorValue(value);
  };

  const setRateRowValue = (value: string): void => {
    setRateValue(value);
  };

  const addNewRateRow = (): void => {
    setRateGroupAmount(numberOfRateGroups + 1);
  };

  const rowsToGenerate = (): any => {
    const rowsToReturn = [];
    for (let i = 0; i < numberOfRateGroups; i++) {
      rowsToReturn.push(
        <CUI.Flex w="66%" key={i + 1}>
          <CUI.Box m={2}>
            <Inputs.NumberInput
              allowSymbols={true}
              value={numeratorValue}
              onChange={setNumeratorRowValue}
              label="Numerator"
            />
          </CUI.Box>
          <CUI.Box m={2}>
            <Inputs.NumberInput
              allowSymbols={true}
              value={denominatorValue}
              onChange={setDenominatorRowValue}
              label="Denominator"
            />
          </CUI.Box>
          <CUI.Box m={2}>
            <Inputs.NumberInput
              allowSymbols={true}
              value={rateValue}
              onChange={setRateRowValue}
              label="Rate"
            />
          </CUI.Box>
        </CUI.Flex>
      );
    }

    console.log(rowsToReturn);
    return rowsToReturn;
  };

  return (
    <CUI.Stack spacing="6">
      <Inputs.TextInput
        label="Desribe the rate:"
        value={rateDescriptionValue}
        onChange={(e) => setRateDescriptionRow(e.target.value)}
        renderHelperTextAbove={true}
        helperText="For example, specify the age groups and whether you are reporting on a certain indicator:"
        errorMessage="Text is too long"
      />
      {rowsToGenerate()}
      <CUI.Button
        onClick={addNewRateRow}
        w="25%"
        colorScheme="blue"
        variant="outline"
      >
        +Add Another
      </CUI.Button>
    </CUI.Stack>
  );
}
