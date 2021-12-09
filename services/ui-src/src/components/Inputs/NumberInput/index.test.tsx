import { render } from "@testing-library/react";
import { NumberInput } from "components/Inputs/NumberInput";
import { TestWrapper } from "components/TestWrapper";
import { useForm } from "react-hook-form";
import { useCustomRegister } from "hooks/useCustomRegister";

const TestComponent = ({
  renderPercent = false,
}: {
  renderPercent?: boolean;
}) => {
  const { setValue } = useForm();
  setValue("test-component", "1234");

  return (
    <TestWrapper>
      <NumberInput
        label="label"
        helperText="helper"
        displayPercent={renderPercent}
        {...useCustomRegister("test-component")}
      />
    </TestWrapper>
  );
};

describe("Test the NumberInput component", () => {
  test("Check that component renders", () => {
    const screen = render(<TestComponent />);
    expect(screen.getByDisplayValue("1234")).toBeVisible();
  });

  test("Check that label and helper texts get rendered correctly", () => {
    const { getByText } = render(<TestComponent />);

    expect(getByText("label")).toBeVisible();
    expect(getByText("helper")).toBeVisible();
  });

  test("Check that percent symbol is rendered correctly", () => {
    const { getByText } = render(<TestComponent renderPercent={true} />);
    expect(getByText("%")).toBeVisible();
  });
});
