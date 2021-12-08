import { render } from "@testing-library/react";
import { TextInput } from "components";
import { TestWrapper } from "components/TestWrapper";
import { useForm } from "react-hook-form";

const TestComponent = () => {
  const { register, setValue } = useForm();
  setValue("test-component", "test");

  return (
    <TestWrapper>
      <TextInput
        label="label"
        helperText="helper"
        {...register("test-component")}
      />
    </TestWrapper>
  );
};

describe("Test for TextInput Component", () => {
  it("Renders properly", () => {
    const { getByLabelText } = render(<TestComponent />);

    expect(getByLabelText(/label/i)).toBeInTheDocument();
  });

  it("renders label and helper text correctly", () => {
    const { getByText } = render(<TestComponent />);

    expect(getByText("label")).toBeInTheDocument();
    expect(getByText("helper")).toBeInTheDocument();
  });
});
