import { screen } from "@testing-library/react";
import fireEvent from "@testing-library/user-event";
import { Rate } from ".";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import userEvent from "@testing-library/user-event";

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

const TestTotalComponent = () => {
  const rates = [
    {
      label: "test1",
      denominator: "",
      numerator: "",
      rate: "",
      id: 1,
    },
    {
      label: "test2",
      denominator: "",
      numerator: "",
      rate: "",
      id: 2,
    },
    {
      label: "total",
      denominator: "",
      numerator: "",
      rate: "",
      id: 3,
      isTotal: true,
    },
  ];

  return <Rate rates={rates} name="test-total-component" readOnly={false} />;
};

describe.only("Test the total Rate component", () => {
  beforeEach(() => {
    renderWithHookForm(<TestTotalComponent />, {
      defaultValues: {
        "test-total-component": [
          {
            numerator: "1",
            denominator: "1",
            rate: "1",
          },
          {
            numerator: "2",
            denominator: "2",
            rate: "1",
          },
        ],
      },
    });
  });

  test("Check that the components render and include their labels", () => {
    expect(screen.getByText(/test1/i)).toBeVisible();
    expect(screen.getByText(/test2/i)).toBeVisible();
    expect(screen.getByText(/total/i)).toBeVisible();
  });

  test("Check numerators for expected default values", () => {
    expect(screen.getAllByLabelText(/numerator/i)[0]).toHaveValue("1");
    expect(screen.getAllByLabelText(/numerator/i)[1]).toHaveValue("2");
    expect(screen.getAllByLabelText(/numerator/i)[2]).toHaveValue("");
  });

  test("Check denominators for expected default values", () => {
    expect(screen.getAllByLabelText(/denominator/i)[0]).toHaveValue("1");
    expect(screen.getAllByLabelText(/denominator/i)[1]).toHaveValue("2");
    expect(screen.getAllByLabelText(/denominator/i)[2]).toHaveValue("");
  });

  test("Check that numerator total is calculated correctly", () => {
    const numerator1 = screen.getAllByLabelText(/numerator/i)[0];
    const numerator2 = screen.getAllByLabelText(/numerator/i)[1];

    const numeratorTotal = screen.getAllByLabelText(/numerator/i)[2];
    const denominatorTotal = screen.getAllByLabelText(/denominator/i)[2];

    // Change the numerator from 1 to 5
    userEvent.type(numerator1, "5");
    expect(numerator1).toHaveValue("5");
    // Expect the rate to add the numerator (5) and denominator (2)
    expect(numeratorTotal).toHaveValue("7");
    expect(denominatorTotal).toHaveValue("3");

    userEvent.type(numerator2, "5");
    expect(numerator2).toHaveValue("5");
    expect(numeratorTotal).toHaveValue("10");
  });
});

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

    expect(rateTextBox).toHaveDisplayValue("100.0");
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

    fireEvent.type(rateTextBox, "43");

    expect(rateTextBox).toHaveDisplayValue("43");
  });
});
