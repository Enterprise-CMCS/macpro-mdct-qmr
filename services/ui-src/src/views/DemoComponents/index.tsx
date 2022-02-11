import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useCustomRegister } from "hooks/useCustomRegister";
import React, { useEffect, useMemo, useState } from "react";
import { Notification } from "components/Notification";
import { MultiSelect, ICheckbox } from "components/MultiSelect";
import { Divider } from "@chakra-ui/react";
import {
  allIntegers,
  integersWithMaxDecimalPlaces,
} from "utils/numberInputMasks";

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
  const register = useCustomRegister();
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  console.log("errors", errors);
  const [progressCircleValue, setProgressCircle] = React.useState(5);
  const [showSuccessAlert, setSuccessAlert] = React.useState(false);
  const [showWarningAlert, setWarningAlert] = React.useState(false);
  const [showInfoAlert, setInfoAlert] = React.useState(false);
  const [showErrorAlert, setErrorAlert] = React.useState(false);

  const { handleSubmit } = useFormContext();
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

  const [removableOptions, setRemovableOptions] = useState<
    QMR.CheckboxOption[]
  >([
    {
      value: `Option ${0}`,
      displayValue: `Option ${0}`,
      children: [<CUI.Text key="check3">Example Child</CUI.Text>],
      removable: true,
      onDelete: () => {
        console.log(`Deleting checkbox option ${0}`);
      },
    },
  ]);

  const addAnotherOption = () => {
    setRemovableOptions((oldArray) => [
      ...oldArray,
      {
        value: `Option ${oldArray.length}`,
        displayValue: `Option ${oldArray.length}`,
        children: [<CUI.Text key="check3">Example Child</CUI.Text>],
        removable: true,
        onDelete: () => {
          console.log(`Deleting checkbox option ${oldArray.length}`);
        },
      },
    ]);
  };

  const KebabMenuItems: QMR.IKebabMenuItem[] = [
    { itemText: "Edit", handleSelect: () => console.log("Edit") },
  ];

  const multiSelectList = useMemo<ICheckbox[]>(
    () => [
      {
        label: "AMM-AD - Antidepressant Medication Management",
        value: "AMM-AD",
        isVisible: true,
      },
      {
        label: "AMR-AD - Asthma Medication Ratio: Ages 19 to 64",
        value: "AMR-AD",
        isVisible: true,
      },
      {
        label: "BCS-AD - Breast Cancer Screening",
        value: "BCS-AD",
        isVisible: true,
      },
      {
        label: "CBP-AD - Controlling High Blood Pressue",
        value: "CBP-AD",
        isVisible: true,
      },
      {
        label: "CCP-AD - Contraceptive Care Postpartum Women Ages 21 - 44",
        value: "CCP-AD",
        isVisible: true,
      },
    ],
    []
  );
  useEffect(() => {
    setValue("demoMultiSelectList", ["AMM-AD", "BCS-AD"]);
  }, [setValue]);
  return (
    <QMR.StateLayout
      breadcrumbItems={[{ path: `/components`, name: "Demo Components" }]}
    >
      <form onSubmit={handleSubmit((data: any) => console.log(data))}>
        <CUI.Container mb="6">
          <CUI.Stack spacing="4">
            <CUI.Heading size="md">Components</CUI.Heading>
            <CUI.Divider />
            <CUI.Heading size="sm" as="h3">
              Text Area
            </CUI.Heading>
            <QMR.TextArea
              {...register("demoTextArea")}
              placeholder="test"
              label="test text area"
              helperText="put in something here"
              renderHelperTextAbove
            />
            <CUI.Divider />
            <CUI.Heading size="sm" as="h3">
              Radio Button
            </CUI.Heading>
            <QMR.RadioButton
              {...register("demoRadioButton")}
              label="hello world"
              options={[
                { displayValue: "test1", value: "test1" },
                { displayValue: "test2", value: "test2" },
              ]}
            />
            <CUI.Divider />
            <CUI.Heading size="sm" as="h3">
              Delete Wrapper
            </CUI.Heading>
            <QMR.DeleteWrapper allowDeletion>
              <CUI.Text>Test Deletion Text object</CUI.Text>
            </QMR.DeleteWrapper>
            <QMR.DeleteWrapper allowDeletion>
              <CUI.Text>
                LargeText Test: Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Lacus luctus accumsan tortor posuere ac.
                Facilisis volutpat est velit egestas dui id ornare. Mollis nunc
                sed id semper risus in. Lectus quam id leo in vitae. Sit amet
                mauris commodo quis imperdiet massa tincidunt nunc. Mi tempus
                imperdiet nulla malesuada. Mi bibendum neque egestas congue
                quisque egestas. Scelerisque fermentum dui faucibus in. Ac
                tortor dignissim convallis aenean et. Arcu ac tortor dignissim
                convallis aenean et tortor at risus. Sit amet mauris commodo
                quis imperdiet massa tincidunt nunc.
              </CUI.Text>
            </QMR.DeleteWrapper>
            <QMR.DeleteWrapper allowDeletion>
              <CUI.Text>Multiple Text Object tester</CUI.Text>
              <CUI.Text>Multiple Text Object tester</CUI.Text>
              <CUI.Text>Multiple Text Object tester</CUI.Text>
            </QMR.DeleteWrapper>
            <QMR.DeleteWrapper allowDeletion>
              <QMR.DateRange {...register("demoDate3")} />
            </QMR.DeleteWrapper>
            <QMR.DeleteWrapper allowDeletion>
              <QMR.RadioButton
                {...register("demoRadioButton")}
                label="hello world"
                options={[
                  { displayValue: "test1", value: "test1" },
                  { displayValue: "test2", value: "test2" },
                ]}
              />
            </QMR.DeleteWrapper>
            <CUI.Divider />
            <CUI.Heading size="sm" as="h3">
              Delete Wrapper CheckBox/Radio Options
            </CUI.Heading>
            <QMR.Checkbox
              {...register("testCheckboxDeleteWrapper")}
              options={removableOptions}
              label="checkbox"
            />
            <QMR.RadioButton
              {...register("testRadioButtonDeleteWrapper")}
              options={removableOptions}
              label="radio button"
            />
            <CUI.Text>
              This button will add one object to both of the above components
              which share an array
            </CUI.Text>
            <QMR.ContainedButton
              buttonText={"+ Add Another"}
              buttonProps={{
                variant: "outline",
                colorScheme: "blue",
                textTransform: "capitalize",
              }}
              onClick={() => {
                addAnotherOption();
              }}
            />
            <CUI.Divider />
            <CUI.Heading size="sm" as="h3">
              Text Input
            </CUI.Heading>
            <QMR.TextInput
              label="Label for Text Input"
              {...register("demoTextInput")}
              helperText="Your text can't exceed 3 characters"
              errorMessage="Text is too long"
            />
            <CUI.Divider />
            <CUI.Heading size="sm" as="h3">
              Select Input
            </CUI.Heading>
            <QMR.Select
              {...register("demoSelect")}
              placeholder="Select option"
              options={selectOptions}
              helperText="pick something please"
              label="this is a select (drop down) input"
            />
            <CUI.Divider />
            <CUI.Heading size="sm" as="h3">
              Number Input With Mask
            </CUI.Heading>
            <QMR.NumberInput
              {...register("demoNumberInput1")}
              placeholder="123"
              label="This number input is a percent and allows decimals"
              helperText="Enter a number"
              mask={integersWithMaxDecimalPlaces(4)}
              displayPercent={true}
            />
            <QMR.NumberInput
              {...register("demoNumberInput2")}
              placeholder="123"
              label="This number input only allows integers"
              helperText="Enter a number"
              mask={allIntegers}
            />
            <CUI.Divider />
            <CUI.Heading size="sm" as="h3">
              Rate
            </CUI.Heading>
            <QMR.TextInput
              renderHelperTextAbove
              label="Describe the rate:"
              helperText="For example, specify the age groups and whether you are reporting on a certain indicator:"
              errorMessage="Text is too long"
              formLabelProps={{ fontWeight: 600 }}
              {...register("demoRateTextInput1")}
            />
            <QMR.Rate rates={rates} {...register("demoRate1")} />
            <CUI.Divider />
            <CUI.Heading size="sm" as="h3">
              Rate With Multiple Numerator/Denominator/Rate
            </CUI.Heading>
            <QMR.TextInput
              renderHelperTextAbove
              label="Describe the rate:"
              helperText="For example, specify the age groups and whether you are reporting on a certain indicator:"
              errorMessage="Text is too long"
              formLabelProps={{ fontWeight: 700 }}
              {...register("demoRateTextInput2")}
            />
            <QMR.Rate rates={ratesTwo} {...register("demoRate2")} />
            <CUI.Divider />
            <CUI.Heading size="sm" as="h3">
              Upload Control
            </CUI.Heading>
            <QMR.Upload
              label="Sample label for an upload control"
              {...register("testUpload1")}
            />
            <QMR.Upload
              maxSize={1000}
              label="Uploading a file here will cause an error. (Set max size to 1 kb)"
              {...register("testUpload2")}
            />
            <CUI.Divider />
            <CUI.Heading size="sm" as="h3">
              Checkbox
            </CUI.Heading>
            <QMR.Checkbox
              {...register("testCheckbox")}
              options={[
                {
                  displayValue: "Medicaid Management Information System (MMIS)",
                  value: "Medicaid Management Information System (MMIS)",
                },
                {
                  displayValue: "Other",
                  value: "Other",
                  children: [
                    <QMR.TextInput
                      label="Describe the data source:"
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
            <QMR.DateRange {...register("dateRange1")} />
            <CUI.Divider />
            <CUI.Heading size="sm" as="h3">
              Contained Buttons
            </CUI.Heading>

            <CUI.HStack>
              <QMR.ContainedButton
                disabledStatus={true}
                buttonText={"Submit Core Set"}
                buttonProps={{
                  colorScheme: "blue",
                  textTransform: "capitalize",
                }}
                onClick={() => console.log("contained button 1")}
              />
              <QMR.ContainedButton
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
              <QMR.ContainedButton
                buttonText={"Add Child Core Set"}
                icon="plus"
                buttonProps={{
                  colorScheme: "blue",
                  textTransform: "capitalize",
                  variant: "outline",
                }}
                onClick={() => console.log("contained button 3")}
              />
              <QMR.ContainedButton
                buttonText={"Complete Measure"}
                buttonProps={{
                  bg: "blue.600",
                  colorScheme: "blue",
                  textTransform: "capitalize",
                }}
                onClick={() => console.log("contained button 4")}
              />
            </CUI.HStack>
            <CUI.HStack>
              <QMR.ContainedButton
                buttonText={`Add Health Home Core Set`}
                icon="plus"
                buttonProps={{
                  variant: "outline",
                  colorScheme: "blue",
                  textTransform: "capitalize",
                }}
                onClick={() => console.log("contained button 8")}
              />
              <QMR.ContainedButton
                buttonText={"+ Add Another"}
                buttonProps={{
                  variant: "outline",
                  colorScheme: "blue",
                  textTransform: "capitalize",
                }}
                onClick={() => console.log("contained button 5")}
              />
              <QMR.ContainedButton
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
              <QMR.ContainedButton
                buttonText={"+ Add Another"}
                buttonProps={{
                  variant: "outline",
                  colorScheme: "blue",
                  textTransform: "capitalize",
                }}
                helperText={"Helper Text"}
                helperTextProps={{
                  fontSize: "sm",
                  lineHeight: "1rem",
                  mt: "1",
                }}
                onClick={() => console.log("contained button 7")}
              />
            </CUI.HStack>
            <CUI.Divider />
            <CUI.Heading size="sm" as="h3">
              Kebab Menu
            </CUI.Heading>
            <CUI.Box m={3}>
              <QMR.KebabMenu menuItems={KebabMenuItems} />
            </CUI.Box>
          </CUI.Stack>
          <CUI.Divider mt={5} />
        </CUI.Container>
        <CUI.Container maxW="7xl">
          <CUI.Heading size="sm" as="h3">
            Core Sets Table
          </CUI.Heading>
          <QMR.Table
            data={QMR.exampleCoreSetData}
            columns={QMR.coreSetColumns}
          />
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
          <CUI.HStack>
            <QMR.ProgressCircle
              currentProgress={progressCircleValue}
              maxValue={23}
              circularProgressProps={{
                color: "green.600",
                size: "8rem",
              }}
              circularProgressLabelProps={{
                fontSize: "1.5rem",
              }}
            />
            <QMR.ContainedButton
              buttonText={`Decrease Counter`}
              buttonProps={{
                variant: "outline",
                colorScheme: "blue",
                textTransform: "capitalize",
              }}
              onClick={() => setProgressCircle(progressCircleValue - 1 || 1)}
            />

            <QMR.ContainedButton
              buttonText={`Increase Counter`}
              icon="plus"
              buttonProps={{
                bg: "blue.600",
                colorScheme: "blue",
                textTransform: "capitalize",
              }}
              onClick={() => {
                let valueToDisplay = 23;
                if (progressCircleValue + 1 < 23) {
                  valueToDisplay = progressCircleValue + 1;
                }

                setProgressCircle(valueToDisplay);
              }}
            />
          </CUI.HStack>
          <CUI.Divider />
          <CUI.Heading size="sm" as="h3">
            Notification/Alert
          </CUI.Heading>
          <CUI.VStack p={4}>
            {showSuccessAlert && (
              <Notification
                alertStatus="success"
                alertTitle="New Core Sets Created"
                alertDescription="The new core sets were successfully created and are ready for reporting"
                close={() => setSuccessAlert(false)}
              />
            )}
            {showWarningAlert && (
              <Notification
                alertStatus="warning"
                alertTitle="New Core Sets Are Needed"
                alertDescription="The new core sets are needed for reporting"
                close={() => setWarningAlert(false)}
              />
            )}
            {showInfoAlert && (
              <Notification
                alertStatus="info"
                alertTitle="New Core Sets Are Avaliable"
                alertDescription="The new core sets are avaliable"
                close={() => setInfoAlert(false)}
              />
            )}
            {showErrorAlert && (
              <Notification
                alertStatus="error"
                alertTitle="New Core Sets Created"
                alertDescription="The new core sets were not created"
                close={() => setErrorAlert(false)}
              />
            )}
            <CUI.HStack>
              <QMR.ContainedButton
                disabledStatus={showSuccessAlert}
                buttonText={`Show Success Alert`}
                buttonProps={{
                  bg: "green.600",
                  colorScheme: "green",
                  textTransform: "capitalize",
                }}
                onClick={() => setSuccessAlert(true)}
              />
              <QMR.ContainedButton
                disabledStatus={showWarningAlert}
                buttonText={`Show Warning Alert`}
                buttonProps={{
                  colorScheme: "yellow",
                  textTransform: "capitalize",
                }}
                onClick={() => setWarningAlert(true)}
              />
              <QMR.ContainedButton
                disabledStatus={showInfoAlert}
                buttonText={`Show Info Alert`}
                buttonProps={{
                  bg: "blue.600",
                  colorScheme: "blue",
                  textTransform: "capitalize",
                }}
                onClick={() => setInfoAlert(true)}
              />
              <QMR.ContainedButton
                disabledStatus={showErrorAlert}
                buttonText={`Show Error Alert`}
                buttonProps={{
                  bg: "red.600",
                  colorScheme: "red",
                  textTransform: "capitalize",
                }}
                onClick={() => setErrorAlert(true)}
              />
            </CUI.HStack>
            <Divider />
            <CUI.Heading size="sm" as="h3">
              Multiselect Checkboxes
            </CUI.Heading>
            <MultiSelect
              multiSelectList={multiSelectList}
              {...register("demoMultiSelectList")}
            />
          </CUI.VStack>
        </CUI.Container>
        <QMR.ContainedButton
          buttonText={`Submit`}
          buttonProps={{
            type: "submit",
            bg: "blue.600",
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
        />
      </form>
    </QMR.StateLayout>
  );
};
