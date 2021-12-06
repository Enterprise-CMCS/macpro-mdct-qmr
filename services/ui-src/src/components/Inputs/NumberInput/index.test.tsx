import { render } from "@testing-library/react";
import { NumberInput } from "components/Inputs/NumberInput";
import { TestWrapper } from "components/TestWrapper";
import { useFormContext } from "react-hook-form";

const TestComponent = ({
  renderPercent = false,
}: {
  renderPercent?: boolean;
}) => {
  const { register, setValue } = useFormContext();
  setValue("test-component", "1234");

  return (
    <TestWrapper>
      <NumberInput
        label="label"
        helperText="helper"
        isInvalid
        displayPercent={renderPercent}
        {...register("test-component")}
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
