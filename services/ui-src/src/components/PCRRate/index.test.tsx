import { screen } from "@testing-library/react";
import fireEvent from "@testing-library/user-event";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { PCRRate } from ".";
import { usePathParams } from "hooks/api/usePathParams";

jest.mock("hooks/api/usePathParams");
const mockUsePathParams = usePathParams as jest.Mock;

// Example input fields
const qualifiers = [
  "Count of Index Hospital Stays",
  "Count of Observed 30-Day Readmissions",
  "Observed Readmission Rate",
  "Count of Expected 30-Day Readmissions",
  "Expected Readmission Rate",
  "O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)",
  "Count of Beneficiaries in Medicaid Population",
  "Number of Outliers",
  "Outlier Rate (Number of Outliers/Count of Beneficiaries in Medicaid Population) x 1,000",
];

// This is the basic structure of the NDR sets in PCRRate.
// There are 4 rates, each is calculated by a combination of the other fields.
const ndrForumlas = [
  {
    numerator: 1,
    denominator: 0,
    rate: 2,
  },
  {
    numerator: 3,
    denominator: 0,
    rate: 4,
  },
  {
    numerator: 1,
    denominator: 3,
    rate: 5,
  },
  {
    numerator: 7,
    denominator: 6,
    rate: 8,
  },
];

const rates = qualifiers.map((item, idx) => ({
  label: item,
  id: idx,
}));

describe("Test the Rate component when readOnly is false", () => {
  beforeEach(() => {
    mockUsePathParams.mockReturnValue({
      state: "DC",
      year: "2021",
      coreSet: "ACS",
      measureId: "PCR-AD",
    });
    renderWithHookForm(
      <PCRRate rates={rates} name="test-component" readOnly={false} />
    );
  });

  test("Check that component renders and includes correct labels", () => {
    qualifiers.forEach((qual) => {
      expect(screen.getByText(qual)).toBeVisible();
    });
  });

  test("Check that given some input, the component calculates rates correctly (rate editable)", () => {
    const expectedValues = [
      { num: "42", denom: "84", rate: "50.0000" },
      { num: "42", denom: "84", rate: "50.0000" },
      { num: "42", denom: "84", rate: "0.5000" },
      { num: "42", denom: "84", rate: "500.0" },
    ];

    ndrForumlas.forEach((ndr, i) => {
      const numerator = screen.getByLabelText(qualifiers[ndr.numerator]);
      const denominator = screen.getByLabelText(qualifiers[ndr.denominator]);
      const rate = screen.getByLabelText(qualifiers[ndr.rateIndex]);

      fireEvent.type(numerator, "42");
      fireEvent.type(denominator, "84");

      expect(numerator).toHaveDisplayValue(expectedValues[i].num);
      expect(denominator).toHaveDisplayValue(expectedValues[i].denom);
      expect(rate).toHaveDisplayValue(expectedValues[i].rate);
    });
  });

  test("Check that when readOnly is true the user can modify the rate", () => {
    // Rate should be editable
    ndrForumlas.forEach((ndr) => {
      const rate = screen.getByLabelText(qualifiers[ndr.rateIndex]);
      fireEvent.type(rate, "42");
      expect(rate).toHaveDisplayValue("42");
    });
  });
});

describe("Test the Rate component when readOnly is true", () => {
  beforeEach(() => {
    mockUsePathParams.mockReturnValue({
      state: "DC",
      year: "2021",
      coreSet: "ACS",
      measureId: "PCR-AD",
    });
    renderWithHookForm(
      <PCRRate rates={rates} name="test-component" readOnly={true} />
    );
  });

  test("Check that component renders and includes correct labels", () => {
    qualifiers.forEach((qual) => {
      expect(screen.getByText(qual)).toBeVisible();
    });
  });

  test("Check that given some input, the component calculates rates correctly (rate not editable)", () => {
    const expectedValues = [
      { num: "42", denom: "84", rate: "50.0000" },
      { num: "42", denom: "84", rate: "50.0000" },
      { num: "42", denom: "84", rate: "0.5000" },
      { num: "42", denom: "84", rate: "500.0" },
    ];

    ndrForumlas.forEach((ndr, i) => {
      const numerator = screen.getByLabelText(qualifiers[ndr.numerator]);
      const denominator = screen.getByLabelText(qualifiers[ndr.denominator]);
      const rate = screen.getByText(qualifiers[ndr.rateIndex]).nextSibling;

      fireEvent.type(numerator, "42");
      fireEvent.type(denominator, "84");

      expect(numerator).toHaveDisplayValue(expectedValues[i].num);
      expect(denominator).toHaveDisplayValue(expectedValues[i].denom);
      expect(rate?.textContent).toEqual(expectedValues[i].rate);
    });
  });

  test("Check that when readOnly is true the user cannot modify the rate", () => {
    // Rate should not have an input field
    ndrForumlas.forEach((ndr) => {
      const rate = screen.getByText(qualifiers[ndr.rateIndex]).nextSibling;
      expect(rate?.nodeName).toBe("P");
    });
  });
});

describe("Test the component for PCR-HH specific conditions", () => {
  beforeEach(() => {
    mockUsePathParams.mockReturnValue({
      state: "DC",
      year: "2021",
      coreSet: "HHCS",
      measureId: "PCR-HH",
    });
    renderWithHookForm(
      <PCRRate rates={rates} name="test-component" readOnly={false} />
    );
  });

  test("(PCR-HH) Check that given some input, the component calculates rates correctly", () => {
    const expectedValues = [
      { num: "42", denom: "84", rate: "50.0000" },
      { num: "42", denom: "84", rate: "50.0000" },
      { num: "42", denom: "84", rate: "0.5000" },
      { num: "42", denom: "84", rate: "500.0" },
    ];

    ndrForumlas.forEach((ndr, i) => {
      const numerator = screen.getByLabelText(qualifiers[ndr.numerator]);
      const denominator = screen.getByLabelText(qualifiers[ndr.denominator]);
      const rate = screen.getByLabelText(qualifiers[ndr.rateIndex]);

      fireEvent.type(numerator, "42");
      fireEvent.type(denominator, "84");

      expect(numerator).toHaveDisplayValue(expectedValues[i].num);
      expect(denominator).toHaveDisplayValue(expectedValues[i].denom);
      expect(rate).toHaveDisplayValue(expectedValues[i].rate);
    });
  });
});
