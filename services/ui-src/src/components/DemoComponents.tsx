import React from "react";
import { TextArea } from "components/Inputs/TextArea";
import * as CUI from "@chakra-ui/react";
import { RadioButton } from "components/Inputs/RadioButton";

export default function DemoComponents(): JSX.Element {
  const [textAreaValue, setTextAreaValue] = React.useState("");
  const [radioButtonValue, setRadioButtonValue] = React.useState("");

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
        onChange={(value) => setRadioButtonValue(value)}
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
