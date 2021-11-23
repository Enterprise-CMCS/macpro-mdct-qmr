import React, { useEffect } from "react";
import * as CUI from "@chakra-ui/react";
import * as Inputs from "components/Inputs";
import { NumericFields } from "components/Rate/NumericFields";
import { InputWrapperProps } from "components/InputWrapper";

interface RateProps extends InputWrapperProps {
  rateDataValue: any[];
  updateRateData: () => void;
}

export function Rate({ rateDataValue, ...rest }: RateProps): JSX.Element {
  const [rateDescriptionValue, setRateDescriptionValue] = React.useState("");
  const [numberOfRateGroups, setRateGroupAmount] = React.useState(1);

  useEffect(() => {
    rowsToGenerate();
  });

  const setRateDescriptionRow = (value: string): void => {
    setRateDescriptionValue(value);
  };

  const addNewRateRow = (): void => {
    setRateGroupAmount(numberOfRateGroups + 1);
  };

  const rowsToGenerate = (): any => {
    const rowsToReturn = [];

    for (let i = 0; i < numberOfRateGroups; i++) {
      rowsToReturn.push(<NumericFields key={numberOfRateGroups - i} />);
    }

    return rowsToReturn;
  };

  return (
    <CUI.Stack spacing="6">
      <Inputs.TextInput
        value={rateDescriptionValue}
        onChange={(e) => setRateDescriptionRow(e.target.value)}
        renderHelperTextAbove={true}
        {...rest}
      />
      {rowsToGenerate()}
      <CUI.Button
        onClick={addNewRateRow}
        w="25%"
        colorScheme="blue"
        variant="outline"
      >
        + Add Another
      </CUI.Button>
    </CUI.Stack>
  );
}
