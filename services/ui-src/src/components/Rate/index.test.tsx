import { render } from "@testing-library/react";
import { Rate } from ".";

describe("Test the Rate component", () => {
  const rates = [
    {
      label: "test",
      denominator: "1",
      numerator: ".5",
      rate: "0",
    },
  ];

  test("Check that component renders and includes a label when passed optionally", () => {
    const { getByText } = render(<Rate rates={rates} updateRates={() => {}} />);

    expect(getByText(/test/i)).toBeVisible();
  });

  test("Check that number input labels get rendered correctly", () => {
    const { getByText } = render(<Rate rates={rates} updateRates={() => {}} />);

    expect(getByText(/denominator/i)).toBeVisible();
    expect(getByText(/numerator/i)).toBeVisible();
    expect(getByText(/rate/i)).toBeVisible();
  });
});
