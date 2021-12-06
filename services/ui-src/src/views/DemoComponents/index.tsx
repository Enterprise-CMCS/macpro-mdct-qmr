import * as Inputs from "components/Inputs";
import * as QMR from "components/";
import * as CUI from "@chakra-ui/react";
import { Rate } from "components/Rate";
import { ProgressCircle } from "components/ProgressCircle";
import { MonthPicker } from "components/MonthPicker";
import { Upload } from "components/Upload";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useCustomRegister } from "hooks/useCustomRegister";
import { ContainedButton } from "components/ContainedButton";
import Joi from "joi";

const selectOptions = [
  { displayValue: "option1", value: "option1" },
  { displayValue: "option2", value: "option2" },
  { displayValue: "invalid", value: "invalid" },
];

export function DemoComponents(): JSX.Element {
  const methods = useForm({
    shouldUnregister: true,
    mode: "all",
  });

  return (
    <FormProvider {...methods}>
      <DemoComponentsForm />
    </FormProvider>
  );
}

const DemoComponentsForm = () => {
  const { register, handleSubmit } = useFormContext();
  const rates = [
    {
      denominator: "",
      numerator: "",
      rate: "",
      id: 1,
    },
  ];

  const ratesTwo = [
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
  ];

  const regex = /^-{0,1}\d*\.?\d{0,4}$/;

  const schema = Joi.object({
    demoTextInput: Joi.string().max(3).allow(""),
    demoCheckboxTextInput: Joi.string().allow(""),
    demoNumberInput2: Joi.string().pattern(new RegExp(regex)).allow(""),
    demoRate1: Joi.array().items(
      Joi.object({
        denominator: Joi.string().pattern(new RegExp(regex)).allow(""),
        numerator: Joi.string().pattern(new RegExp(regex)).allow(""),
        rate: Joi.string().pattern(new RegExp(regex)).allow(""),
      })
    ),
    demoRate2: Joi.array().items(
      Joi.object({
        denominator: Joi.string().pattern(new RegExp(regex)).allow(""),
        numerator: Joi.string().pattern(new RegExp(regex)).allow(""),
        rate: Joi.string().pattern(new RegExp(regex)).allow(""),
      })
    ),
    demoRateTextInput1: Joi.string().allow(""),
    demoRateTextInput2: Joi.string().allow(""),
    demoSelect: Joi.string().allow(""),
    demoTextArea: Joi.string().max(3000).allow(""),
    testCheckbox: Joi.array().allow(""),
    testUpload1: Joi.any(),
    testUpload2: Joi.any(),
    demoRadioButton: Joi.string().allow(""),
    demoNumberInput1: Joi.string().pattern(new RegExp(regex)).allow(""),
  });

  const validateData = (data: any) => {
    console.log(data);

    console.log(schema.validate(data));
  };

  return (
    <form onSubmit={handleSubmit((data) => validateData(data))}>
      <CUI.Container mb="6">
        <CUI.Stack spacing="4">
          <CUI.Heading size="md">Components</CUI.Heading>
          <CUI.Divider />
          <CUI.Heading size="sm" as="h3">
            Text Area
          </CUI.Heading>
          <Inputs.TextArea
            {...register("demoTextArea")}
            isInvalidFunc={(value) => String(value)?.length > 3000}
            placeholder="test"
            label="test text area"
            helperText="put in something here"
            errorMessage="Response cannot exceed 3000 characters"
          />
          <CUI.Divider />
          <CUI.Heading size="sm" as="h3">
            Radio Button
          </CUI.Heading>
          <Inputs.RadioButton
            {...useCustomRegister("demoRadioButton")}
            label="hello world"
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
            {...register("demoTextInput")}
            // isInvalidFunc={(value) => }
            // String(value).length > 3
            helperText="Your text can't exceed 3 characters"
            errorMessage="Text is too long"
          />
          <CUI.Divider />
          <CUI.Heading size="sm" as="h3">
            Select Input
          </CUI.Heading>
          <Inputs.Select
            {...useCustomRegister("demoSelect")}
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
            {...register("demoNumberInput1")}
            placeholder="123"
            label="This number input is a percent and allows decimals"
            helperText="Enter a number"
            displayPercent={true}
          />
          <Inputs.NumberInput
            {...register("demoNumberInput2")}
            placeholder="123"
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
            {...register("demoRateTextInput1")}
            isInvalidFunc={(value) => String(value).length > 3000}
          />
          <Rate rates={rates} {...register("demoRate1")} />
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
            {...register("demoRateTextInput2")}
            isInvalidFunc={(value) => String(value).length > 3000}
          />
          <Rate rates={ratesTwo} {...register("demoRate2")} />
          <CUI.Divider />
          <CUI.Heading size="sm" as="h3">
            Upload Control
          </CUI.Heading>
          <Upload
            label="Sample label for an upload control"
            {...useCustomRegister("testUpload1")}
          />
          <Upload
            maxSize={1000}
            label="Uploading a file here will cause an error. (Set max size to 1 kb)"
            {...useCustomRegister("testUpload2")}
          />
          <CUI.Divider />
          <CUI.Heading size="sm" as="h3">
            Checkbox
          </CUI.Heading>
          <Inputs.Checkbox
            {...useCustomRegister("testCheckbox")}
            options={[
              {
                displayValue: "Medicaid Management Information System (MMIS)",
                value: "Medicaid Management Information System (MMIS)",
              },
              {
                displayValue: "Other",
                value: "Other",
                children: [
                  <Inputs.TextInput
                    label="Describe the data source:"
                    key="other-describe-data"
                    {...register("demoCheckboxTextInput")}
                  />,
                ],
              },
            ]}
            formLabelProps={{ fontWeight: 700 }}
            label="What is the Adminstrative Data Source?"
          />
          <CUI.Divider />
          <CUI.Heading size="sm" as="h3">
            DatePicker
          </CUI.Heading>
          <CUI.Text size="sm">Normal Month Picker</CUI.Text>
          <MonthPicker
            onChange={(m, y) => {
              console.log(m, y);
            }}
          />
          <CUI.Text size="sm">Locked Year Month Picker</CUI.Text>
          <MonthPicker
            selectedMonth={3}
            selectedYear={2019}
            yearLocked={true}
            onChange={(m, y) => {
              console.log(m, y);
            }}
          />
          <CUI.Divider />
          <CUI.Heading size="sm" as="h3">
            Contained Buttons
          </CUI.Heading>

          <CUI.HStack>
            <ContainedButton
              disabledStatus={true}
              buttonText={"Submit Core Set"}
              buttonProps={{
                colorScheme: "blue",
                textTransform: "capitalize",
              }}
              onClick={() => console.log("contained button 1")}
            />
            <ContainedButton
              buttonText={"Add Core Set"}
              buttonProps={{
                colorScheme: "blue",
                textTransform: "capitalize",
                variant: "outline",
              }}
              icon="plus"
              onClick={() => console.log("contained button 2")}
            />
          </CUI.HStack>
          <CUI.HStack>
            <ContainedButton
              buttonText={"Add Child Core Core Set"}
              icon="plus"
              buttonProps={{
                colorScheme: "blue",
                textTransform: "capitalize",
                variant: "outline",
              }}
              onClick={() => console.log("contained button 3")}
            />
            <ContainedButton
              buttonText={"Complete Measure"}
              buttonProps={{
                colorScheme: "blue",
                textTransform: "capitalize",
              }}
              onClick={() => console.log("contained button 4")}
            />
          </CUI.HStack>
          <CUI.HStack>
            <ContainedButton
              buttonText={`Add Health Homes Core Set`}
              icon="plus"
              buttonProps={{
                variant: "outline",
                colorScheme: "blue",
                textTransform: "capitalize",
              }}
              onClick={() => console.log("contained button 8")}
            />
            <ContainedButton
              buttonText={"+ Add Another"}
              buttonProps={{
                variant: "outline",
                colorScheme: "blue",
                textTransform: "capitalize",
              }}
              onClick={() => console.log("contained button 5")}
            />
            <ContainedButton
              buttonText={"Print"}
              icon="print"
              buttonProps={{
                variant: "outline",
                colorScheme: "blue",
                textTransform: "capitalize",
              }}
              onClick={() => console.log("contained button 6")}
            />
          </CUI.HStack>
          <CUI.Divider />
          <CUI.Heading size="sm" as="h3">
            Contained Buttons With Helper Text
          </CUI.Heading>
          <CUI.HStack justifyContent="left">
            <ContainedButton
              buttonText={"+ Add Another"}
              buttonProps={{
                variant: "outline",
                colorScheme: "blue",
                textTransform: "capitalize",
              }}
              helperText={"Helper Text"}
              helperTextProps={{ fontSize: "sm", lineHeight: "1rem", mt: "1" }}
              onClick={() => console.log("contained button 7")}
            />
          </CUI.HStack>
        </CUI.Stack>
        <CUI.Divider mt={5} />
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
        <CUI.Divider />
        <CUI.Heading size="sm" as="h3">
          Progress Circle
        </CUI.Heading>
        <ProgressCircle
          currentProgress={5}
          maxValue={23}
          circularProgressProps={{
            color: "green.600",
            size: "8rem",
          }}
          circularProgressLabelProps={{
            fontSize: "1.5rem",
          }}
        />
      </CUI.Container>
      <button>Submit</button>
    </form>
  );
};
