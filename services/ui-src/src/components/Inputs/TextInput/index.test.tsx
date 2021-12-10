import { screen } from "@testing-library/react";
import { TextInput } from "components";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";

describe("Test for TextInput Component", () => {
  it("Renders properly", () => {
    renderWithHookForm(<TextInput name="test-component" label="label" />);

    expect(screen.getByLabelText(/label/i)).toBeInTheDocument();
  });

  it("Pre-populates with data", () => {
    renderWithHookForm(<TextInput name="test-component" />, {
      defaultValues: {
        "test-component": "testing",
      },
    });
    expect(screen.getByDisplayValue("testing")).toBeInTheDocument();
  });

  it("renders label and helper text correctly", () => {
    renderWithHookForm(
      <TextInput label="label" helperText="helper" name="test-component" />
    );

    expect(screen.getByText("label")).toBeInTheDocument();
    expect(screen.getByText("helper")).toBeInTheDocument();
  });
});
