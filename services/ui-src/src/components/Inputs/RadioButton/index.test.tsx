import { render } from "@testing-library/react";
import * as QMR from "components";
import * as Inputs from "components/Inputs";
import { TestWrapper } from "components/TestWrapper";
import { useCustomRegister } from "hooks/useCustomRegister";
import { useForm, useFormContext } from "react-hook-form";

const DemoComponent = () => {
  const { setValue } = useForm();

  setValue("test-component", "Other");
  setValue("test-component-2", "testing");

  return (
    <TestWrapper>
      <RegisteredCheckbox />
    </TestWrapper>
  );
};

const RegisteredCheckbox = () => {
  const { register } = useFormContext();
  const options: QMR.RadioButtonOption[] = [
    {
      displayValue: "What is the Adminstrative Data Source?",
      value: "What is the Adminstrative Data Source?",
    },
    {
      displayValue: "Other",
      value: "Other",
      children: [
        <Inputs.TextInput
          label="Describe the data source:"
          key="test"
          formLabelProps={{
            fontWeight: "normal",
            fontSize: "normal",
          }}
          {...register("test-component-2")}
        />,
      ],
    },
  ];
  return (
    <QMR.RadioButton
      {...useCustomRegister("test-component")}
      label="test label"
      options={options}
    />
  );
};

describe("Test RadioButton", () => {
  test("Check that the Radio Button renders", () => {
    const { getByText } = render(<DemoComponent />);

    expect(getByText(/test label/i)).toBeInTheDocument();
  });

  it("Check the input(t)ed options render correctly", () => {
    const { getByText } = render(<DemoComponent />);

    expect(
      getByText(/What is the Adminstrative Data Source?/i)
    ).toBeInTheDocument();
    expect(getByText(/Other/i)).toBeInTheDocument();
  });
});
