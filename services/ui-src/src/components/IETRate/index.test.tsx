import { screen } from "@testing-library/react";
import * as CUI from "@chakra-ui/react";
import fireEvent from "@testing-library/user-event";
import { IETRate } from ".";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { getMeasureYear } from "../../utils/getMeasureYear";

const categories = [
  {
    label: "cat1: cat",
    text: "cat1: cat",
    id: "cat1-id",
  },
  {
    label: "cat1: Total",
    text: "cat1: Total",
    id: "cat1-total",
  },
];

const qualifiers = [
  {
    label: "qual1",
    text: "qual1",
    id: "qual1-id",
  },
  {
    label: "qual2",
    text: "qual2",
    id: "qual2-id",
  },
  {
    label: "Total",
    text: "Total",
    id: "Total",
  },
];

const TestComponent = () => {
  const rates = [
    {
      label: "test",
      category: "test",
      denominator: "",
      numerator: "",
      rate: "",
      id: 1,
      uid: "test",
    },
  ];

  return <IETRate rates={rates} name="test-component" />;
};

jest.mock("../../utils/getMeasureYear", () => ({
  getMeasureYear: jest.fn().mockReturnValue(2023),
}));

describe("Test the IETRate component", () => {
  beforeEach(() => {
    categories.forEach((cat) => {
      let rates: any[] = qualifiers?.map((qual, idx) => ({
        label: qual.label,
        category: cat.label,
        id: idx,
        uid: `${cat.id}.${qual.id}`,
      }));

      return renderWithHookForm(
        <CUI.Box key={cat.label}>
          <CUI.Text>{cat.label}</CUI.Text>
          <IETRate
            rates={rates}
            name="test-component"
            categoryName={cat.label}
          />
        </CUI.Box>,
        {
          defaultValues: {
            "test-component": [
              {
                numerator: "1",
                denominator: "1",
                rate: "1",
              },
              {
                numerator: "2",
                denominator: "2",
                rate: "2",
              },
            ],
          },
        }
      );
    });
  });

  it("Check that component renders and includes a label when passed optionally", () => {
    expect(screen.getAllByText(/qual1/i)[0]).toBeVisible();
  });

  it("Check that number input labels get rendered correctly", () => {
    const total = categories.length * qualifiers.length;
    expect(screen.getAllByLabelText(/denominator/).length).toEqual(total);
    expect(screen.getAllByLabelText(/numerator/).length).toEqual(total);
    expect(screen.getAllByLabelText(/rate/).length).toEqual(total);
  });

  it("Check that data pre-populates", () => {
    expect(screen.getAllByDisplayValue("1")).toHaveLength(6);
    expect(screen.getAllByDisplayValue("1")[0]).toBeInTheDocument();
    expect(screen.getAllByDisplayValue("2")).toHaveLength(6);
    expect(screen.getAllByDisplayValue("2")[0]).toBeInTheDocument();
  });

  it("Check that filling out text inputs changes rate calculation", async () => {
    const numeratorTextBox = screen.getAllByLabelText(/numerator/)[0];
    const denominatorTextBox = screen.getAllByLabelText(/denominator/)[0];
    const rateTextBox = screen.getAllByLabelText(/rate/)[0];

    fireEvent.type(numeratorTextBox, "123");
    fireEvent.type(denominatorTextBox, "123");

    expect(rateTextBox).toHaveDisplayValue("100.0");
  });

  it("Check that the rate text box is readonly", async () => {
    const rateTextBox = screen.getAllByLabelText(/rate/)[0];
    fireEvent.type(rateTextBox, "43");
  });
});

describe("Test non-readonly rate component", () => {
  beforeEach(() => {
    categories.forEach((cat) => {
      let rates: any[] = qualifiers?.map((qual, idx) => ({
        label: qual.label,
        category: cat.label,
        id: idx,
        uid: `${cat.id}.${qual.id}`,
        isTotal: cat.label.includes("Total"),
      }));

      return renderWithHookForm(
        <CUI.Box key={cat.label}>
          <CUI.Text>{cat.label}</CUI.Text>
          <IETRate rates={rates} name="test-component" readOnly={false} />
        </CUI.Box>
      );
    });
  });

  it("Check that the rate can be typed in when not readonly", () => {
    const rateTextBox = screen.getAllByLabelText(/rate/)[0];
    fireEvent.type(rateTextBox, "43");
    expect(rateTextBox).toHaveDisplayValue("43");
  });
});

const generateAllRates = () => {
  let allRates: any = {};
  categories.forEach((cat) => {
    let rate: any[] = [];
    qualifiers?.map((qual) => {
      rate.push({
        label: qual.label,
        category: cat.label,
        uid: `${cat.id}.${qual.id}`,
        numerator: "2",
        denominator: "3",
        rate: "66.7",
        isTotal: cat.label.includes("Total"),
      });
    });
    allRates[cat.id] = rate;
  });

  return allRates;
};

describe("Test the IETRate component when it includes a total NDR", () => {
  beforeEach(() => {
    const ndrSets = categories.map((cat) => {
      let rates: any[] = qualifiers?.map((qual, idx) => ({
        label: qual.label,
        category: cat.label,
        id: idx,
        uid: `${cat.id}.${qual.id}`,
        isTotal: cat.label.includes("Total"),
      }));

      return (
        <CUI.Box key={cat.label}>
          <CUI.Text>{cat.label}</CUI.Text>
          <IETRate
            rates={rates}
            name="test-component"
            readOnly={false}
            calcTotal={true}
            categoryName={cat.label}
            categories={categories}
          />
        </CUI.Box>
      );
    });

    return renderWithHookForm(ndrSets, {
      defaultValues: {
        PerformanceMeasure: {
          rates: generateAllRates(),
        },
        "test-component": [
          {
            numerator: "2",
            denominator: "3",
            rate: "66.7",
          },
          {
            numerator: "1",
            denominator: "4",
            rate: "25.0",
          },
        ],
      },
    });
  });

  it("Check that the components render and include their labels", () => {
    const total = categories.length * qualifiers.length;

    expect(screen.getAllByText("Numerator")).toHaveLength(total);
    expect(screen.getAllByText("Denominator")).toHaveLength(total);
    expect(screen.getAllByText("Rate")).toHaveLength(total);
  });

  it("Check that the component renders with the correct default values", () => {
    expect(screen.getAllByDisplayValue("2")).toHaveLength(2);
    expect(screen.getAllByDisplayValue("2")[0]).toBeInTheDocument();
    expect(screen.getAllByDisplayValue("3")).toHaveLength(2);
    expect(screen.getAllByDisplayValue("3")[0]).toBeInTheDocument();
    expect(screen.getAllByDisplayValue("66.7")).toHaveLength(2);
    expect(screen.getAllByDisplayValue("66.7")[0]).toBeInTheDocument();
  });

  it("Check that user input in a non-total field triggers total calculation", () => {
    const numeratorToChange = screen.getAllByLabelText(/numerator/i)[0];
    fireEvent.type(numeratorToChange, "1");

    const denominatorToChange = screen.getAllByLabelText(/denominator/i)[0];
    fireEvent.type(denominatorToChange, "5");

    const changedRate = screen.getAllByLabelText(/rate/i)[0];
    expect(changedRate).toHaveValue("20.0");
  });

  it("Check that if numerator > denominator, the calculated total rate should be empty", () => {
    const numeratorToChange = screen.getAllByLabelText(/numerator/i)[0];
    fireEvent.type(numeratorToChange, "3");

    const denominatorToChange = screen.getAllByLabelText(/denominator/i)[0];
    fireEvent.type(denominatorToChange, "1");

    const changedRate = screen.getAllByLabelText(/rate/i)[0];
    expect(changedRate).toHaveValue("");
  });

  const viewNDRs = () => {
    screen.getAllByLabelText(/rate/i).forEach((rate, index) => {
      const numberator = screen
        .getAllByLabelText(/numerator/i)
        [index].getAttribute("value");
      const denominator = screen
        .getAllByLabelText(/denominator/i)
        [index].getAttribute("value");

      console.log(
        index +
          ": N: " +
          numberator +
          ", D: " +
          denominator +
          ", R: " +
          rate.getAttribute("value")
      );
    });
  };

  const checkNDRs = (index: number, expectedValue: any) => {
    expect(screen.getAllByLabelText(/numerator/i)[index]).toHaveValue(
      expectedValue.numberator
    );
    expect(screen.getAllByLabelText(/denominator/i)[index]).toHaveValue(
      expectedValue.denominator
    );
    expect(screen.getAllByLabelText(/rate/i)[index]).toHaveValue(
      expectedValue.rate
    );
  };

  it("Check that user input triggers total calculation in qualifier total", () => {
    const numeratorToChange = screen.getAllByLabelText(/numerator/i)[0];
    fireEvent.type(numeratorToChange, "1");

    const expectedValue = {
      numerator: "2",
      denominator: "7",
      rate: "28.6",
    };

    checkNDRs(2, expectedValue);
  });

  it("Check that user input triggers total calculation in category total", () => {
    const numeratorToChange = screen.getAllByLabelText(/numerator/i)[0];
    fireEvent.type(numeratorToChange, "3");

    const denominatorToChange = screen.getAllByLabelText(/denominator/i)[0];
    fireEvent.type(denominatorToChange, "8");

    const numeratorToChange2 = screen.getAllByLabelText(/numerator/i)[1];
    fireEvent.type(numeratorToChange2, "1");

    const denominatorToChange2 = screen.getAllByLabelText(/denominator/i)[1];
    fireEvent.type(denominatorToChange2, "4");

    // viewNDRs();
  });
});

describe("Rates should have correct properties", () => {
  beforeEach(() => {
    renderWithHookForm(<TestComponent />);
  });

  it("Should have category property only on FFY 2023", () => {
    expect(getMeasureYear).toBeCalled();
  });
});
