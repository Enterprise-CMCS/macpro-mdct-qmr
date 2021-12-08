import { render } from "@testing-library/react";
import * as QMR from "components";
import { TestWrapper } from "components/TestWrapper";
import { useCustomRegister } from "hooks/useCustomRegister";

const DemoComponent = () => {
  return (
    <TestWrapper>
      <Select />
    </TestWrapper>
  );
};

const Select = () => {
  const selectOptions = [
    { displayValue: "option1", value: "option1" },
    { displayValue: "option2", value: "option2" },
    { displayValue: "invalid", value: "invalid" },
  ];

  return (
    <QMR.Select
      {...useCustomRegister("test-component")}
      options={selectOptions}
      label="test label"
      helperText="helper"
      errorMessage="there is an error"
    />
  );
};

describe("Test for Select Component", () => {
  it("Renders properly", () => {
    const { getByLabelText } = render(<DemoComponent />);

    expect(getByLabelText(/test label/i)).toBeDefined();
  });

  it("renders helper text correctly", () => {
    const { getByText } = render(<DemoComponent />);

    expect(getByText("helper")).toBeVisible();
  });
});
