import { screen } from "@testing-library/react";
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
    label: "cat1: no-cat",
    text: "cat1: no-cat",
    id: "no-cat1-id",
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

const emptyValues = {
  numerator: "",
  denominator: "",
  rate: "",
};

const intialValues = {
  numerator: "2",
  denominator: "3",
  rate: "66.7",
};

const generateRates = (values: any) => {
  let rates: any = {};
  categories.forEach((cat) => {
    let rate: any[] = [];
    qualifiers?.map((qual) => {
      rate.push({
        label: qual.label,
        category: cat.label,
        uid: `${cat.id}.${qual.id}`,
        numerator: values.numerator,
        denominator: values.denominator,
        rate: values.rate,
      });
    });
    rates[cat.id] = rate;
  });

  let allRates: any = {};
  allRates["PerformanceMeasure"] = {
    rates: rates,
  };

  return allRates;
};

const checkNDRs = (index: number, expectedValue: any) => {
  expect(screen.getAllByLabelText(/Numerator/i)[index]).toHaveValue(
    expectedValue.numberator
  );
  expect(screen.getAllByLabelText(/Denominator/i)[index]).toHaveValue(
    expectedValue.denominator
  );
  expect(screen.getAllByLabelText(/Rate/i)[index]).toHaveValue(
    expectedValue.rate
  );
};

jest.mock("../../utils/getMeasureYear", () => ({
  getMeasureYear: jest.fn().mockReturnValue(2023),
}));

const IETRateComponent = (readOnly: boolean, defaultValues: any) => {
  const ndrSets = categories.map((cat) => {
    let rates: any[] = qualifiers?.map((qual, idx) => ({
      label: qual.label,
      category: cat.label,
      id: idx,
      uid: `${cat.id}.${qual.id}`,
    }));

    return (
      <IETRate
        rates={rates}
        key={`PerformanceMeasure.rates`}
        name={`PerformanceMeasure.rates`}
        readOnly={readOnly}
        calcTotal={true}
        categoryName={cat.label}
        category={cat}
        categories={categories}
        qualifiers={qualifiers}
      />
    );
  });

  return renderWithHookForm(ndrSets, { defaultValues: defaultValues });
};

describe("Test the IETRate component", () => {
  beforeEach(() => {
    const defaultValues = generateRates(intialValues);
    IETRateComponent(true, defaultValues);
  });

  it("Check that component renders and includes a label when passed optionally", () => {
    expect(screen.getAllByText(/qual1/i)[0]).toBeVisible();
  });

  it("Check that number input labels get rendered correctly", () => {
    const total = categories.length * qualifiers.length;
    expect(screen.getAllByLabelText(/Denominator/).length).toEqual(total);
    expect(screen.getAllByLabelText(/Numerator/).length).toEqual(total);
    expect(screen.getAllByLabelText(/Rate/).length).toEqual(total);
  });

  it("Check that data pre-populates", () => {
    const total = categories.length * qualifiers.length;
    expect(screen.getAllByDisplayValue(intialValues.numerator)).toHaveLength(
      total
    );
    expect(
      screen.getAllByDisplayValue(intialValues.numerator)[0]
    ).toBeInTheDocument();
    expect(screen.getAllByDisplayValue(intialValues.denominator)).toHaveLength(
      total
    );
    expect(
      screen.getAllByDisplayValue(intialValues.denominator)[0]
    ).toBeInTheDocument();
  });

  it("Check that filling out text inputs changes rate calculation", async () => {
    const numeratorTextBox = screen.getAllByLabelText(/Numerator/)[0];
    const denominatorTextBox = screen.getAllByLabelText(/Denominator/)[0];
    const rateTextBox = screen.getAllByLabelText(/Rate/)[0];

    fireEvent.type(numeratorTextBox, "123");
    fireEvent.type(denominatorTextBox, "123");
    expect(rateTextBox).toHaveDisplayValue("100.0");
  });

  it("Check that the rate text box is readonly", async () => {
    const rateTextBox = screen.getAllByLabelText(/Rate/)[0];
    fireEvent.type(rateTextBox, "43");
    expect(rateTextBox).toHaveDisplayValue(intialValues.rate);
  });
});

describe("Test non-readonly rate component", () => {
  beforeEach(() => {
    const defaultValues = generateRates(intialValues);
    IETRateComponent(false, defaultValues);
  });

  it("Check that the rate can be typed in when not readonly", () => {
    const rateTextBox = screen.getAllByLabelText(/Rate/)[0];
    fireEvent.type(rateTextBox, "43");
    expect(rateTextBox).toHaveDisplayValue("43");
  });
});

describe("Test the IETRate component when it includes a total NDR", () => {
  beforeEach(() => {
    const defaultValues = generateRates(intialValues);
    IETRateComponent(false, defaultValues);
  });

  it("Check that the components render and include their labels", () => {
    const total = categories.length * qualifiers.length;

    expect(screen.getAllByText("Numerator")).toHaveLength(total);
    expect(screen.getAllByText("Denominator")).toHaveLength(total);
    expect(screen.getAllByText("Rate")).toHaveLength(total);
  });

  it("Check that the component renders with the correct default values", () => {
    const total = categories.length * qualifiers.length;
    expect(screen.getAllByDisplayValue("2")).toHaveLength(total);
    expect(screen.getAllByDisplayValue("2")[0]).toBeInTheDocument();
    expect(screen.getAllByDisplayValue("3")).toHaveLength(total);
    expect(screen.getAllByDisplayValue("3")[0]).toBeInTheDocument();
    expect(screen.getAllByDisplayValue("66.7")).toHaveLength(total);
    expect(screen.getAllByDisplayValue("66.7")[0]).toBeInTheDocument();
  });

  it("Check that user input in a non-total field triggers total calculation", () => {
    const numeratorToChange = screen.getAllByLabelText(/Numerator/i)[0];
    fireEvent.type(numeratorToChange, "1");

    const denominatorToChange = screen.getAllByLabelText(/Denominator/i)[0];
    fireEvent.type(denominatorToChange, "5");

    const changedRate = screen.getAllByLabelText(/Rate/i)[0];
    expect(changedRate).toHaveValue("20.0");
  });

  it("Check that if numerator > denominator, the calculated total rate should be empty", () => {
    const numeratorToChange = screen.getAllByLabelText(/Numerator/i)[0];
    fireEvent.type(numeratorToChange, "3");

    const denominatorToChange = screen.getAllByLabelText(/Denominator/i)[0];
    fireEvent.type(denominatorToChange, "1");

    const changedRate = screen.getAllByLabelText(/Rate/i)[0];
    expect(changedRate).toHaveValue("");
  });

  it("Check that user input triggers total calculation in qualifier total", () => {
    const numeratorToChange = screen.getAllByLabelText(/Numerator/i)[0];
    fireEvent.type(numeratorToChange, "1");

    const expectedValue = {
      numerator: "3",
      denominator: "6",
      rate: "50.0",
    };

    checkNDRs(2, expectedValue);
  });

  it("Check that user input triggers total calculation in category total", () => {
    const numeratorToChange = screen.getAllByLabelText(/Numerator/i)[0];
    fireEvent.type(numeratorToChange, "3");

    const denominatorToChange = screen.getAllByLabelText(/Denominator/i)[0];
    fireEvent.type(denominatorToChange, "8");

    const nextCatIndex = qualifiers.length;

    const numeratorToChange2 =
      screen.getAllByLabelText(/Numerator/i)[nextCatIndex];
    fireEvent.type(numeratorToChange2, "1");

    const denominatorToChange2 =
      screen.getAllByLabelText(/Denominator/i)[nextCatIndex];
    fireEvent.type(denominatorToChange2, "4");

    const expectedValue = {
      numerator: "4",
      denominator: "12",
      rate: "33.3",
    };

    const totalCatIndex = qualifiers.length * (categories.length - 1);
    checkNDRs(totalCatIndex, expectedValue);
  });

  it("Check total category qualifer sum can be overwritten by user input", () => {
    const denominatorToChange2 = screen.getAllByLabelText(/Denominator/i)[7];
    fireEvent.type(denominatorToChange2, "5");

    const expectedValue = {
      numerator: "4",
      denominator: "8",
      rate: "50.0",
    };

    const totalCatIndex = qualifiers.length * categories.length - 1;
    checkNDRs(totalCatIndex, expectedValue);
  });
});

describe("Rates should have correct properties", () => {
  beforeEach(() => {
    const defaultValues = generateRates(intialValues);
    IETRateComponent(false, defaultValues);
  });

  it("Should have category property only on FFY 2023", () => {
    expect(getMeasureYear).toBeCalled();
  });
});

describe("Test empty rates in component", () => {
  beforeEach(() => {
    const defaultValues = generateRates(emptyValues);
    IETRateComponent(false, defaultValues);
  });

  it("Total should be empty when only 1 field is entered", () => {
    const denominatorToChange = screen.getAllByLabelText(/Denominator/i)[0];
    fireEvent.type(denominatorToChange, "8");

    const numeratorToChange = screen.getAllByLabelText(/Numerator/i)[0];
    fireEvent.type(numeratorToChange, "");

    const changedRate = screen.getAllByLabelText(/Rate/i)[0];
    expect(changedRate).toHaveValue("");
  });

  it("Rate should calculate to 0.0 if numerator is zero", () => {
    const denominatorToChange = screen.getAllByLabelText(/Denominator/i)[0];
    fireEvent.type(denominatorToChange, "8");

    const numeratorToChange = screen.getAllByLabelText(/Numerator/i)[0];
    fireEvent.type(numeratorToChange, "0");

    const changedRate = screen.getAllByLabelText(/Rate/i)[0];
    expect(changedRate).toHaveValue("0.0");
  });
});
