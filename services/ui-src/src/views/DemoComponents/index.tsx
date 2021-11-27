import React from "react";
import * as Inputs from "components/Inputs";
import * as QMR from "components/";
import * as CUI from "@chakra-ui/react";
import { Rate, IRate } from "components/Rate";

const selectOptions = [
  { displayValue: "option1", value: "option1" },
  { displayValue: "option2", value: "option2" },
  { displayValue: "invalid", value: "invalid" },
];

export function DemoComponents(): JSX.Element {
  const [numberInputValue2, setNumberInputValue2] = React.useState("");
  const [textAreaValue, setTextAreaValue] = React.useState("");
  const [radioButtonValue, setRadioButtonValue] = React.useState("");
  const [textInputValue, setTextInputValue] = React.useState("");
  const [selectInputValue, setInputValue] = React.useState("");
  const [numberInputValue, setNumberInputValue] = React.useState("");
  const [rateDescriptionValue, setRateDescriptionValue] = React.useState("");
  const [rates, setRates] = React.useState<IRate[]>([
    {
      denominator: "",
      numerator: "",
      rate: "",
      id: 1,
    },
  ]);

  const [rateDescriptionValueTwo, setRateDescriptionValueTwo] =
    React.useState("");
  const [ratesTwo, setRatesTwo] = React.useState<IRate[]>([
    {
      label: "Test Label For Section",
      denominator: "",
      numerator: "",
      rate: "",
      id: 1,
    },
    {
      label: "Another Test Label",
      denominator: "",
      numerator: "",
      rate: "",
      id: 3,
    },
    {
      label: "Last Test Label",
      denominator: "",
      numerator: "",
      rate: "",
      id: 5,
    },
  ]);

  return (
    <>
      <CUI.Container mb="6">
        <form>
          <CUI.Stack spacing="4">
            <CUI.Heading size="md">Components</CUI.Heading>
            <CUI.Divider />
            <CUI.Heading size="sm" as="h3">
              Text Area
            </CUI.Heading>
            <Inputs.TextArea
              isInvalidFunc={(value) => String(value)?.length > 3000}
              placeholder="test"
              value={textAreaValue}
              onChange={(e) => setTextAreaValue(e.target.value)}
              label="test text area"
              helperText="put in something here"
              errorMessage="Response cannot exceed 3000 characters"
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
            <CUI.Divider />
            <CUI.Heading size="sm" as="h3">
              Rate
            </CUI.Heading>
            <Inputs.TextInput
              renderHelperTextAbove
              label="Describe the rate:"
              helperText="For example, specify the age groups and whether you are reporting on a certain indicator:"
              errorMessage="Text is too long"
              formLabelProps={{ fontWeight: 600 }}
              value={rateDescriptionValue}
              onChange={(e) => setRateDescriptionValue(e.target.value)}
              isInvalidFunc={(value) => String(value).length > 3000}
            />
            <Rate rates={rates} updateRates={setRates} />
            <CUI.Divider />
            <CUI.Heading size="sm" as="h3">
              Rate With Multiple Numerator/Denominator/Rate
            </CUI.Heading>
            <Inputs.TextInput
              renderHelperTextAbove
              label="Describe the rate:"
              helperText="For example, specify the age groups and whether you are reporting on a certain indicator:"
              errorMessage="Text is too long"
              formLabelProps={{ fontWeight: 700 }}
              value={rateDescriptionValueTwo}
              onChange={(e) => setRateDescriptionValueTwo(e.target.value)}
              isInvalidFunc={(value) => String(value).length > 3000}
            />
            <Rate rates={ratesTwo} updateRates={setRatesTwo} />
          </CUI.Stack>
        </form>
      </CUI.Container>
      <CUI.Container maxW="7xl" overflowX="scroll">
        <CUI.Heading size="sm" as="h3">
          Core Sets Table
        </CUI.Heading>
        <QMR.Table data={QMR.exampleCoreSetData} columns={QMR.coreSetColumns} />
        <CUI.Heading size="sm" as="h3">
          Measures Table
        </CUI.Heading>
        <QMR.Table
          data={QMR.exampleMeasuresData}
          columns={QMR.measuresColumns}
        />
      </CUI.Container>
    </>
  );
}
