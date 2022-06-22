import { screen } from "@testing-library/react";
import fireEvent from "@testing-library/user-event";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { AIFHHRate } from ".";
import { usePathParams } from "hooks/api/usePathParams";

jest.mock("hooks/api/usePathParams");
const mockUsePathParams = usePathParams as jest.Mock;

// Example input fields
export const qualifiers = [
  "Number of Enrollee Months",
  "Number of Short-Term Admissions",
  "Short-Term Admissions per 1,000 Enrollee Months",
  "Number of Medium-Term Admissions",
  "Medium-Term Admissions per 1,000 Enrollee Months",
  "Number of Long-Term Admissions",
  "Long-Term Admissions per 1,000 Enrollee Months",
];

const ndrFormulas = [
  // Short-Term Admissions per 1,000 Enrollee Months
  {
    numerator: 1,
    denominator: 0,
    rate: 2,
    mult: 1000,
  },
  // Medium-Term Admissions per 1,000 Enrollee Months
  {
    numerator: 3,
    denominator: 0,
    rate: 4,
    mult: 1000,
  },
  // Long-Term Admissions per 1,000 Enrollee Months
  {
    numerator: 5,
    denominator: 0,
    rate: 6,
    mult: 1000,
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
      coreSet: "HHCS_18-0006",
      measureId: "AIF-HH",
    });
    renderWithHookForm(
      <AIFHHRate rates={rates} name="test-component" readOnly={false} />
    );
  });

  test("Check that component renders and includes correct labels", () => {
    qualifiers.forEach((qual) => {
      expect(screen.getAllByText(qual)[0]).toBeVisible();
    });
  });

  test("Check that given some input, the component calculates rates correctly (rate editable)", () => {
    const expectedValues = [
      { num: "42", denom: "84", rate: "500.0" },
      { num: "42", denom: "84", rate: "500.0" },
      { num: "42", denom: "84", rate: "500.0" },
      { num: "42", denom: "84", rate: "500.0" },
    ];

    ndrFormulas.forEach((ndr, i) => {
      const numerator = screen.getAllByLabelText(qualifiers[ndr.numerator])[0];
      const denominator = screen.getAllByLabelText(
        qualifiers[ndr.denominator]
      )[0];
      const rate = screen.getAllByLabelText(qualifiers[ndr.rate])[0];

      fireEvent.type(numerator, "42");
      fireEvent.type(denominator, "84");

      expect(numerator).toHaveDisplayValue([expectedValues[i].num]);
      expect(denominator).toHaveDisplayValue([expectedValues[i].denom]);
      expect(rate).toHaveDisplayValue([expectedValues[i].rate]);
    });
  });
});
