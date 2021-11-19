import React from "react";
import * as Inputs from "components/Inputs";
import * as CUI from "@chakra-ui/react";

const selectOptions = [
  { displayValue: "option1", value: "option1" },
  { displayValue: "option2", value: "option2" },
  { displayValue: "invalid", value: "invalid" },
];

export default function DemoComponents(): JSX.Element {
  const [numberInputValue, setNumberInputValue] = React.useState("");
  const [numberInputValue2, setNumberInputValue2] = React.useState("");
  const [textAreaValue, setTextAreaValue] = React.useState("");
  const [radioButtonValue, setRadioButtonValue] = React.useState("");
  const [textInputValue, setTextInputValue] = React.useState("");
  const [selectInputValue, setInputValue] = React.useState("");

  return (
    <CUI.Container mb="6">
      <form>
        <CUI.Stack spacing="4">
          <CUI.Heading size="md">Components</CUI.Heading>
          <CUI.Divider />
          <CUI.Heading size="sm" as="h3">
            Text Area
          </CUI.Heading>
          <Inputs.TextArea
            isInvalidFunc={(value) => !value}
            placeholder="test"
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
            label="test text area"
            helperText="put in something here"
          />
          <CUI.Divider />
          <CUI.Heading size="sm" as="h3">
            Radio Button
          </CUI.Heading>
          <Inputs.RadioButton
            label="hello world"
            onChange={setRadioButtonValue}
            value={radioButtonValue}
            errorMessage=""
            options={[
              { displayValue: "test1", value: "test1" },
              { displayValue: "test2", value: "test2" },
            ]}
          />
          <CUI.Divider />
          <CUI.Heading size="sm" as="h3">
            Text Input
          </CUI.Heading>
          <Inputs.TextInput
            label="Label for Text Input"
            value={textInputValue}
            onChange={(e) => setTextInputValue(e.target.value)}
            isInvalidFunc={(value) => String(value).length > 3}
            helperText="Your text can't exceed 3 characters"
            errorMessage="Text is too long"
          />
          <CUI.Divider />
          <CUI.Heading size="sm" as="h3">
            Select Input
          </CUI.Heading>
          <Inputs.Select
            value={selectInputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Select option"
            options={selectOptions}
            helperText="pick something please"
            label="this is a select (drop down) input"
            isInvalidFunc={(v) => v === "invalid"}
          />
          <CUI.Divider />
          <CUI.Heading size="sm" as="h3">
            Number Input With Mask
          </CUI.Heading>
          <Inputs.NumberInput
            placeholder="123"
            value={numberInputValue}
            onChange={(e) =>
              /^-{0,1}\d*\.?\d{0,4}$/.test(e.target.value)
                ? setNumberInputValue(e.target.value)
                : null
            }
            label="This number input is a percent and allows decimals"
            helperText="Enter a number"
            displayPercent={true}
          />
          <Inputs.NumberInput
            placeholder="123"
            value={numberInputValue2}
            onChange={(e) =>
              /^-{0,1}\d*$/.test(e.target.value)
                ? setNumberInputValue2(e.target.value)
                : null
            }
            label="This number input only allows integers"
            helperText="Enter a number"
          />
        </CUI.Stack>
      </form>
    </CUI.Container>
  );
}
