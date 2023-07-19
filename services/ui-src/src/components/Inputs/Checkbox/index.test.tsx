import { screen } from "@testing-library/react";
import * as QMR from "components";
import * as Inputs from "components/Inputs";
import { useCustomRegister } from "hooks/useCustomRegister";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";

const TestComponent = () => {
  const register = useCustomRegister();

  return (
    <QMR.Checkbox
      name="test-component"
      options={[
        {
          displayValue: "What is the Adminstrative Data Source?",
          value: "What is the Adminstrative Data Source?",
        },
        {
          displayValue: "Other",
          value: "Other",
          children: [
            <Inputs.TextInput
              label="Describe the data source (state-specific comment):"
              formLabelProps={{
                fontWeight: "normal",
                fontSize: "normal",
              }}
              {...register("test-component-2")}
            />,
          ],
        },
      ]}
    />
  );
};

describe("Test Checkbox", () => {
  beforeEach(() => {
    renderWithHookForm(<TestComponent />, {
      defaultValues: {
        "test-component": ["Other"],
      },
    });
  });

  test("Check that the Checkbox renders", () => {
    expect(
      screen.getByText(/What is the Adminstrative Data Source?/i)
    ).toBeInTheDocument();
  });

  test("Check the input(t)ed options render correctly", () => {
    expect(screen.getByText(/Other/i)).toBeInTheDocument();
  });

  test("Check that other is selected", () => {
    expect(screen.getAllByRole("checkbox")[1]).toBeChecked();
  });
});
