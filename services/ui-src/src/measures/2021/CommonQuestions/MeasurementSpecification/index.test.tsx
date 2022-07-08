import { MeasurementSpecification } from ".";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { screen } from "@testing-library/react";

describe("MeasurementSpecification component", () => {
  it("renders the component", async () => {
    renderWithHookForm(<MeasurementSpecification type="CMS" />);

    expect(screen.getByText("Measurement Specification")).toBeInTheDocument();

    expect(
      screen.getByText("Centers for Medicare & Medicaid Services (CMS)")
    ).toBeInTheDocument();

    expect(screen.getByText("Other")).toBeInTheDocument();
  });
});

interface Props {
  type:
    | "ADA-DQA"
    | "AHRQ"
    | "AHRQ-NCQA"
    | "CDC"
    | "CMS"
    | "HEDIS"
    | "HRSA"
    | "JOINT"
    | "NCQA"
    | "OHSU"
    | "OPA"
    | "PQA";
}

const specifications: {
  [name: string]: { propType: Props; displayValue: string };
} = {
  "ADA-DQA": {
    propType: { type: "ADA-DQA" },
    displayValue:
      "American Dental Association/Dental Quality Alliance (ADA/DQA)",
  },
  AHRQ: {
    propType: { type: "AHRQ" },
    displayValue: "Agency for Healthcare Research and Quality (AHRQ)",
  },
  "AHRQ-NCQA": {
    propType: { type: "AHRQ-NCQA" },
    displayValue:
      "Agency for Healthcare Research and Quality (AHRQ) (survey instrument) and National Committee for Quality Assurance (survey administrative protocol)",
  },
  CDC: {
    propType: { type: "CDC" },
    displayValue: "Centers for Disease Contol and Prevention (CDC)",
  },
  CMS: {
    propType: { type: "CMS" },
    displayValue: "Centers for Medicare & Medicaid Services (CMS)",
  },
  HEDIS: {
    propType: { type: "HEDIS" },
    displayValue:
      "National Committee for Quality Assurance (NCQA)/Healthcare Effectiveness Data and Information Set (HEDIS)",
  },
  HRSA: {
    propType: { type: "HRSA" },
    displayValue: "Health Resources and Services Administration (HRSA)",
  },
  JOINT: {
    propType: { type: "JOINT" },
    displayValue: "The Joint Commission",
  },
  NCQA: {
    propType: { type: "NCQA" },
    displayValue: "National Committee for Quality Assurance (NCQA)",
  },
  OHSU: {
    propType: { type: "OHSU" },
    displayValue: "Oregon Health and Science University (OHSU)",
  },
  OPA: {
    propType: { type: "OPA" },
    displayValue: "HHS Office of Population Affairs (OPA)",
  },
  PQA: {
    propType: { type: "PQA" },
    displayValue: "Pharmacy Quality Alliance (PQA)",
  },
};

describe("all specification types", () => {
  for (const spec in specifications) {
    it(`renders ${spec} specification type correctly`, () => {
      renderWithHookForm(
        <MeasurementSpecification type={specifications[spec].propType.type} />
      );
      expect(
        screen.getByText(specifications[spec].displayValue)
      ).toBeInTheDocument();
    });
  }
});
