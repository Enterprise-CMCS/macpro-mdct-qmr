import { screen } from "@testing-library/react";
import fireEvent from "@testing-library/user-event";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { ComplexRate } from "../ComplexRate";
import { usePathParams } from "hooks/api/usePathParams";

jest.mock("hooks/api/usePathParams");
const mockUsePathParams = usePathParams as jest.Mock;

// Example input fields
export const aifhhQualifiers = [
  "Number of Enrollee Months",
  "Number of Short-Term Admissions",
  "Short-Term Admissions per 1,000 Enrollee Months",
  "Number of Medium-Term Admissions",
  "Medium-Term Admissions per 1,000 Enrollee Months",
  "Number of Long-Term Admissions",
  "Long-Term Admissions per 1,000 Enrollee Months",
];

const aifhhNdrFormulas = [
  // Short-Term Admissions per 1,000 Enrollee Months
  {
    num: 1,
    denom: 0,
    rate: 2,
    mult: 1000,
  },
  // Medium-Term Admissions per 1,000 Enrollee Months
  {
    num: 3,
    denom: 0,
    rate: 4,
    mult: 1000,
  },
  // Long-Term Admissions per 1,000 Enrollee Months
  {
    num: 5,
    denom: 0,
    rate: 6,
    mult: 1000,
  },
];

const aifhhRates = aifhhQualifiers.map((item, idx) => ({
  label: item,
  id: idx,
}));

describe("Test the AIFHHRate component when readOnly is false", () => {
  beforeEach(() => {
    mockUsePathParams.mockReturnValue({
      state: "DC",
      year: "2021",
      coreSet: "HHCS_18-0006",
      measureId: "AIF-HH",
    });
    renderWithHookForm(
      <ComplexRate
        rates={aifhhRates}
        name="test-component"
        readOnly={false}
        inputFieldNames={aifhhQualifiers}
        measureName="AIFHH"
        ndrFormulas={aifhhNdrFormulas}
      />
    );
  });

  test("Check that AIFHHRATE component renders and includes correct labels", () => {
    aifhhQualifiers.forEach((qual) => {
      expect(screen.getAllByText(qual)[0]).toBeVisible();
    });
  });

  test("Check that given some input, the AIFHHRATE component calculates rates correctly (rate editable)", () => {
    const expectedValues = [
      { num: "42", denom: "84", rate: "500.0" },
      { num: "42", denom: "84", rate: "500.0" },
      { num: "42", denom: "84", rate: "500.0" },
      { num: "42", denom: "84", rate: "500.0" },
    ];

    aifhhNdrFormulas.forEach((ndr, i) => {
      const numerator = screen.getAllByLabelText(aifhhQualifiers[ndr.num])[0];
      const denominator = screen.getAllByLabelText(
        aifhhQualifiers[ndr.denom]
      )[0];
      const rate = screen.getAllByLabelText(aifhhQualifiers[ndr.rate])[0];

      fireEvent.type(numerator, "42");
      fireEvent.type(denominator, "84");

      expect(numerator).toHaveDisplayValue([expectedValues[i].num]);
      expect(denominator).toHaveDisplayValue([expectedValues[i].denom]);
      expect(rate).toHaveDisplayValue([expectedValues[i].rate]);
    });
  });
});

const iuhhQualifiers = [
  "Number of Enrollee Months",
  "Discharges",
  "Discharges per 1,000 Enrollee Months",
  "Days",
  "Days per 1,000 Enrollee Months",
  "Average Length of Stay",
];

// Rate structure by index in row
const iuhhNdrFormulas = [
  // Discharges per 1,000 Enrollee Months
  {
    num: 1,
    denom: 0,
    rate: 2,
    mult: 1000,
  },
  // Days per 1,000 Enrollee Months
  {
    num: 3,
    denom: 0,
    rate: 4,
    mult: 1000,
  },
  // Average Length of Stay
  {
    num: 3,
    denom: 1,
    rate: 5,
    mult: 1,
  },
];

describe("Test the IUHHRate component when readOnly is false", () => {
  beforeEach(() => {
    mockUsePathParams.mockReturnValue({
      state: "DC",
      year: "2021",
      coreSet: "HHCS_18-0006",
      measureId: "IU-HH",
    });
    renderWithHookForm(
      <ComplexRate
        rates={aifhhRates}
        name="test-component"
        readOnly={false}
        categoryName="test-category"
        inputFieldNames={iuhhQualifiers}
        measureName="IUHH"
        ndrFormulas={iuhhNdrFormulas}
      />
    );
  });

  test("Check that IUHHRate component renders and includes correct labels", () => {
    iuhhQualifiers.forEach((qual) => {
      expect(screen.getAllByText(qual)[0]).toBeVisible();
    });
  });

  test("Check that given some input, the IUHHRate component calculates rates correctly (rate editable)", () => {
    const expectedValues = [
      { num: "42", denom: "84", rate: "500.0" },
      { num: "42", denom: "84", rate: "500.0" },
      { num: "42", denom: "84", rate: "0.5" },
    ];

    iuhhNdrFormulas.forEach((ndr, i) => {
      const numerator = screen.getAllByLabelText(iuhhQualifiers[ndr.num])[0];
      const denominator = screen.getAllByLabelText(
        iuhhQualifiers[ndr.denom]
      )[0];
      const rate = screen.getAllByLabelText(iuhhQualifiers[ndr.rate])[0];

      fireEvent.type(numerator, "42");
      fireEvent.type(denominator, "84");

      expect(numerator).toHaveDisplayValue([expectedValues[i].num]);
      expect(denominator).toHaveDisplayValue([expectedValues[i].denom]);
      expect(rate).toHaveDisplayValue([expectedValues[i].rate]);
    });
  });
});
