import { screen } from "@testing-library/react";
import fireEvent from "@testing-library/user-event";
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

const TestComponent2 = () => {
  const rates = [
    {
      label: "test",
      denominator: "",
      numerator: "",
      rate: "",
      id: 1,
    },
  ];

  return <Rate rates={rates} name="test-component" readOnly={false} />;
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
    expect(screen.getAllByDisplayValue("1")).toHaveLength(3);
    expect(screen.getAllByDisplayValue("1")[0]).toBeInTheDocument();
  });

  test("Check that filling out text inputs changes rate calculation", async () => {
    const numeratorTextBox = await screen.findByLabelText("Numerator");
    const denominatorTextBox = await screen.findByLabelText("Denominator");
    const rateTextBox = await screen.findByLabelText("Rate");

    fireEvent.type(numeratorTextBox, "123");
    fireEvent.type(denominatorTextBox, "123");

    expect(rateTextBox).toHaveDisplayValue("1.0000");
  });

  test("Check that the rate text box is readonly", async () => {
    const rateTextBox = await screen.findByLabelText("Rate");

    fireEvent.type(rateTextBox, "4321");

    expect(rateTextBox).toHaveDisplayValue("1");
  });
});

describe("Test non-readonly rate component", () => {
  test("Check that the rate can be typed in when not readonly", () => {
    renderWithHookForm(<TestComponent2 />, {
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

    const rateTextBox = screen.getByLabelText("Rate");

    fireEvent.type(rateTextBox, "4321");

    expect(rateTextBox).toHaveDisplayValue("4321");
  });
});
