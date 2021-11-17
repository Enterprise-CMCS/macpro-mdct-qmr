import React from "react";
import * as CUI from "@chakra-ui/react";
import * as Inputs from "components/Inputs";
// import { InputWrapperProps } from "components/InputWrapper";


// interface RateProps extends InputWrapperProps {
//   }
// }

export function Rate(): JSX.Element {
  const [rateDescriptionValue, setRateDescriptionValue] = React.useState("");
  const [numeratorValue, setNumeratorValue] = React.useState([]);
  const [denominatorValue, setDenominatorValue] = React.useState([]);
  const [rateValue, setRateValue] = React.useState([]);
  const [numberOfRateGroups, setRateGroupAmount] = React.useState(1);

  return (
    <>
      <CUI.Stack spacing="4">
        <Inputs.TextInput
          label="Desribe the rate:"
          value={rateDescriptionValue}
          onChange={(e) => setRateDescriptionValue(e.target.value)}
          renderHelperTextAbove={true}
          isInvalidFunc={(value) => String(value).length > 3}
          helperText="For example, specify the age groups and whether you are reporting on a certain indicator:"
          errorMessage="Text is too long"
            />
      </CUI.Stack>
        <CUI.Flex>
        <CUI.Box w="23%" m={[1, 1]}>
        <Inputs.NumberInput 
            placeholder="123"
            value={numeratorValue}
            onChange={(e) => setNumeratorValue(e.target.value)}
            label="Numerator"
            helperText="Enter a number"
            />
        </CUI.Box>
        <CUI.Box w="23%" m={[1, 1]}>
          <Inputs.NumberInput 
            value={denominatorValue}
            onChange={(e) => setDenominatorValue(e.target.value)}
            label="Denominator"
            />
        </CUI.Box>
        <CUI.Box w="23%" m={[1, 1]}>
          <Inputs.NumberInput 
            value={rateValue}
            onChange={(e) => setRateValue(e.target.value)}
            label="Rate"
            />
        </CUI.Box>

        </CUI.Flex>
        </>
  );
}
