import { render } from "@testing-library/react";
import { TextArea } from "components";
import { TestWrapper } from "components/TestWrapper";
import { useForm } from "react-hook-form";

const TestComponent = () => {
  const { register, setValue } = useForm();
  setValue("test-component", "test");

  return (
    <TestWrapper>
      <TextArea
        label="label"
        helperText="helper"
        {...register("test-component")}
      />
    </TestWrapper>
  );
};

describe("Test the TextArea component", () => {
  test("Check that component renders", () => {
    const screen = render(<TestComponent />);

    expect(screen.getByDisplayValue("test")).toBeInTheDocument();
  });

  test("Check that label and helper texts get rendered correctly", () => {
    const { getByText } = render(<TestComponent />);

    expect(getByText("label")).toBeInTheDocument();
    expect(getByText("helper")).toBeInTheDocument();
  });
});
