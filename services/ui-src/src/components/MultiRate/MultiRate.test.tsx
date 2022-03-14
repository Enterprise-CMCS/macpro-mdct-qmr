import { screen } from "@testing-library/react";
import fireEvent from "@testing-library/user-event";

import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";

import { MultiRate } from "./MultiRate";

// Example input fields
const qualifiers = [
  "Count of Index Hospital Stays",
  "Count of Observed 30-Day Readmissions",
  "Observed Readmission Rate",
  "Count of Expected 30-Day Readmissinos",
  "Expected Readmission Rate",
  "O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)",
  "Count of Beneficiaries in Medicaid Population",
  "Number of Outliers",
  "Outlier Rate (Number of Outliers/Count of Beneficiaries in Medicaid Population) x 1,000",
];

// This is the basic structure of the NDR sets in MultiRate.
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
    renderWithHookForm(
      <MultiRate rates={rates} name="test-component" readOnly={false} />
    );
  });

  test("Check that component renders and includes correct labels", () => {
    qualifiers.forEach((qual) => {
      expect(screen.getByText(qual)).toBeVisible();
    });
  });

  test("Check that given some input, the component calculates rates correctly (rate editable)", () => {
    ndrForumlas.forEach((ndr) => {
      const numerator = screen.getByLabelText(qualifiers[ndr.numerator]);
      const denominator = screen.getByLabelText(qualifiers[ndr.denominator]);
      const rate = screen.getByLabelText(qualifiers[ndr.rate]);

      fireEvent.type(numerator, "42");
      fireEvent.type(denominator, "84");

      expect(numerator).toHaveDisplayValue("42");
      expect(denominator).toHaveDisplayValue("84");
      expect(rate).toHaveDisplayValue("50.0000");
    });
  });

  test("Check that when readOnly is true the user can modify the rate", () => {
    // Rate should be editable
    ndrForumlas.forEach((ndr) => {
      const rate = screen.getByLabelText(qualifiers[ndr.rate]);
      fireEvent.type(rate, "42");
      expect(rate).toHaveDisplayValue("42");
    });
  });

  test("Check that 'Rate Error' is thrown when numerator is greater than denominator", () => {
    const testInput = [
      { num: "2", denom: "1" },
      { num: "2", denom: "1" },
      { num: "3", denom: "2" },
      { num: "2", denom: "1" },
    ];
    const expectedNumOfErrors = [1, 2, 3, 4];

    ndrForumlas.forEach((ndr, i) => {
      const numerator = screen.getByLabelText(qualifiers[ndr.numerator]);
      const denominator = screen.getByLabelText(qualifiers[ndr.denominator]);

      fireEvent.type(denominator, testInput[i].denom);
      fireEvent.type(numerator, testInput[i].num);

      // Per ndrForumlas, the field at index 1 is used in 2
      expect(screen.getAllByText("Rate Error").length).toBe(
        expectedNumOfErrors[i]
      );
    });
  });
});

describe("Test the Rate component when readOnly is true", () => {
  beforeEach(() => {
    renderWithHookForm(
      <MultiRate rates={rates} name="test-component" readOnly={true} />
    );
  });

  test("Check that component renders and includes correct labels", () => {
    qualifiers.forEach((qual) => {
      expect(screen.getByText(qual)).toBeVisible();
    });
  });

  test("Check that given some input, the component calculates rates correctly (rate not editable)", () => {
    ndrForumlas.forEach((ndr) => {
      const numerator = screen.getByLabelText(qualifiers[ndr.numerator]);
      const denominator = screen.getByLabelText(qualifiers[ndr.denominator]);
      const rate = screen.getByText(qualifiers[ndr.rate]).nextSibling;

      fireEvent.type(numerator, "42");
      fireEvent.type(denominator, "84");

      expect(numerator).toHaveDisplayValue("42");
      expect(denominator).toHaveDisplayValue("84");
      expect(rate?.textContent).toEqual("50.0000");
    });
  });

  test("Check that when readOnly is true the user cannot modify the rate", () => {
    // Rate should not have an input field
    ndrForumlas.forEach((ndr) => {
      const rate = screen.getByText(qualifiers[ndr.rate]).nextSibling;
      expect(rate?.nodeName).toBe("P");
    });
  });
});
