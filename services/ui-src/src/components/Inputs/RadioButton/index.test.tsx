import { screen } from "@testing-library/react";
import * as QMR from "components";
import * as Inputs from "components/Inputs";
import { useCustomRegister } from "hooks/useCustomRegister";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";

const TestComponent = () => {
  const register = useCustomRegister();

  return (
    <QMR.RadioButton
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
              label={
                <>
                  Describe the data source (
                  <em>
                    text in this field is included in publicly-reported
                    state-specific comments
                  </em>
                  ):
                </>
              }
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

const TestComponent2 = () => {
  const register = useCustomRegister();

  return (
    <QMR.RadioButton
      name="test-component"
      valueAsArray
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
              label={
                <>
                  Describe the data source (
                  <em>
                    text in this field is included in publicly-reported
                    state-specific comments
                  </em>
                  ):
                </>
              }
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

describe("Test RadioButton", () => {
  describe("Regualar RadioButton", () => {
    beforeEach(() => {
      renderWithHookForm(<TestComponent />, {
        defaultValues: {
          "test-component": "Other",
        },
      });
    });

    test("Check that the RadioButton renders", () => {
      expect(
        screen.getByText(/What is the Adminstrative Data Source?/i)
      ).toBeInTheDocument();
    });

    test("Check the input(t)ed options render correctly", () => {
      expect(screen.getByText(/Other/i)).toBeInTheDocument();
    });

    test("Check that other is selected", () => {
      expect(screen.getAllByRole("radio")[1]).toBeChecked();
    });
  });

  describe("ValueAsArray", () => {
    test("Should save value as array", () => {
      const comp = renderWithHookForm(<TestComponent2 />, {
        defaultValues: { "test-component": ["Other"] },
      });
      expect(comp.getByText(/Other/i)).toBeInTheDocument();
      expect(comp.getAllByRole("radio")[1]).toBeChecked();
    });
  });
});
