import { screen } from "@testing-library/react";
import { Rate } from ".";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";

const TestComponent = () => {
  const rates = [
    {
      label: "test",
      denominator: "",
      numerator: "",
      rate: "",
      id: 1,
    },
  ];

  return <Rate rates={rates} name="test-component" />;
};

describe("Test the Rate component", () => {
  beforeEach(() => {
    renderWithHookForm(<TestComponent />, {
      defaultValues: {
        "test-component": [
          {
            numerator: "1",
            denominator: "1",
            rate: "1",
          },
        ],
      },
    });
  });

  test("Check that component renders and includes a label when passed optionally", () => {
    expect(screen.getByText(/test/i)).toBeVisible();
  });

  test("Check that number input labels get rendered correctly", () => {
    expect(screen.getByLabelText(/denominator/i)).toBeVisible();
    expect(screen.getByLabelText(/numerator/i)).toBeVisible();
    expect(screen.getByLabelText(/rate/i)).toBeVisible();
  });

  test("Check that data pre-populates", () => {
    expect(screen.getAllByDisplayValue("1")).toHaveLength(2);
    expect(screen.getAllByDisplayValue("1")[0]).toBeInTheDocument();
  });
});
