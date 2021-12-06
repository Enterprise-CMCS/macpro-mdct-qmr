import { render } from "@testing-library/react";
import { Rate } from ".";
import { TestWrapper } from "components/TestWrapper";
import { useForm } from "react-hook-form";

const TestComponent = () => {
  const { register } = useForm();
  const rates = [
    {
      denominator: "",
      numerator: "",
      rate: "",
      id: 1,
    },
  ];

  return (
    <TestWrapper>
      <Rate rates={rates} {...register("test-component")} />
    </TestWrapper>
  );
};

describe("Test the Rate component", () => {
  test("Check that component renders and includes a label when passed optionally", () => {
    const screen = render(<TestComponent />);

    expect(screen.getByDisplayValue(/test/i)).toBeVisible();
  });

  test("Check that number input labels get rendered correctly", () => {
    const screen = render(<TestComponent />);

    expect(screen.getByDisplayValue(/denominator/i)).toBeVisible();
    expect(screen.getByDisplayValue(/numerator/i)).toBeVisible();
    expect(screen.getByDisplayValue(/rate/i)).toBeVisible();
  });
});
