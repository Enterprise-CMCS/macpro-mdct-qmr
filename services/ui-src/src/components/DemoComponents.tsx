import React from "react";
import * as Inputs from "components/Inputs";
import * as CUI from "@chakra-ui/react";
import { Rate } from "components/Rate/Rate";

const selectOptions = [
  { displayValue: "option1", value: "option1" },
  { displayValue: "option2", value: "option2" },
  { displayValue: "invalid", value: "invalid" },
];

export default function DemoComponents(): JSX.Element {
  const [textAreaValue, setTextAreaValue] = React.useState("");
  const [radioButtonValue, setRadioButtonValue] = React.useState("");
  const [textInputValue, setTextInputValue] = React.useState("");
  const [selectInputValue, setInputValue] = React.useState("");

  return (
    <CUI.Container mb="6">
      <CUI.Stack spacing="4">
        <CUI.Heading size="md">Components</CUI.Heading>
        <CUI.Divider />
        <CUI.Heading size="sm" as="h3">
          Text Area
        </CUI.Heading>
        <Inputs.TextArea
          isInvalidFunc={(value) => String(value).length > 3000}
          placeholder="test"
          value={textAreaValue}
          onChange={(e) => setTextAreaValue(e.target.value)}
          label="test text area"
          helperText="put in something here"
          errorMessage="Text must be less that 3000 characters"
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
        <Rate />
      </CUI.Stack>
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
        </CUI.Stack>
      </form>
    </CUI.Container>
  );
}
