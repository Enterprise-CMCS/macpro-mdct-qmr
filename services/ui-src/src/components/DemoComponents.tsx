import React from "react";
import { TextArea } from "components/Inputs/TextArea";
import * as CUI from "@chakra-ui/react";
import { RadioButton } from "components/Inputs/RadioButton";
import { TextInput } from "./Inputs/TextInput";

export default function DemoComponents(): JSX.Element {
  const [textAreaValue, setTextAreaValue] = React.useState("");
  const [radioButtonValue, setRadioButtonValue] = React.useState("");
  const [textInputValue, setTextInputValue] = React.useState("");
  const invalidFunc = (value: string) => {
    return !value;
  };

  return (
    <CUI.Container>
      <CUI.Heading size="md">Components</CUI.Heading>
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
      <TextInput
        label="Label for Text Input"
        value={textInputValue}
        onChange={(e) => setTextInputValue(e.target.value)}
        isInvalidFunc={(value) => value.length > 3}
        helperText="Your text can't exceed 3 characters"
        errorMessage="Text is too long"
      />
    </CUI.Container>
  );
}
