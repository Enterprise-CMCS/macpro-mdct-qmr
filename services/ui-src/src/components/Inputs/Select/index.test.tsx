import { screen } from "@testing-library/react";
import * as QMR from "components";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";

const TestComponent = () => {
  const selectOptions = [
    { displayValue: "option1", value: "option1" },
    { displayValue: "option2", value: "option2" },
    { displayValue: "invalid", value: "invalid" },
  ];

  return (
    <QMR.Select
      name="test-component"
      options={selectOptions}
      label="test label"
      helperText="helper"
      errorMessage="there is an error"
    />
  );
};

describe("Test for Select Component", () => {
  beforeEach(() => {
    renderWithHookForm(<TestComponent />, {
      defaultValues: {
        "test-component": "option1",
      },
    });
  });

  it("Renders properly", () => {
    expect(screen.getByLabelText(/test label/i)).toBeDefined();
  });

  it("Pre-populates with data", () => {
    const selectElement =
      screen.getByLabelText<HTMLSelectElement>("test label");
    expect(selectElement.value).toEqual("option1");
  });

  it("renders helper text correctly", () => {
    expect(screen.getByText("helper")).toBeVisible();
  });
});
