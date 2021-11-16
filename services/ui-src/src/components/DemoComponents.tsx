import React from "react";
import { TextArea } from "components/Inputs/TextArea";
import * as CUI from "@chakra-ui/react";
import { RadioButton } from "components/Inputs/RadioButton";
import { NumberInput } from "components/Inputs/NumberInput";

export default function DemoComponents(): JSX.Element {
  const [numberInputValue, setNumberInputValue] = React.useState("");
  const [textAreaValue, setTextAreaValue] = React.useState("");
  const [radioButtonValue, setRadioButtonValue] = React.useState("");

  const invalidFunc = (value: string) => {
    return !value;
  };

  const numberInvalidFunc = (value: string) => {
    var validNumber = new RegExp(/^\d*(\.\d+)?$/);
    return !validNumber.test(value)
  }


  return (
    <CUI.Container>
      <CUI.Heading size="md">Components</CUI.Heading>
      <NumberInput
        isInvalidFunc={numberInvalidFunc}
        placeholder="123"
        value={numberInputValue}
        onChange={(e) => setNumberInputValue(e.target.value)}
        label="Number Input Question Here"
        helperText="Enter a number"
      />
      <TextArea
        isInvalidFunc={invalidFunc}
        placeholder="test"
        value={textAreaValue}
        onChange={(e) => setTextAreaValue(e.target.value)}
        label="test text area"
        helperText="put in something here"
      />
      <RadioButton
        label="hello world"
        onChange={setRadioButtonValue}
        value={radioButtonValue}
        errorMessage=""
        options={[
          { displayValue: "test1", value: "test1" },
          { displayValue: "test2", value: "test2" },
        ]}
      />
      {radioButtonValue}
    </CUI.Container>
  );
}
