import fireEvent from "@testing-library/user-event";
import { MeasurementSpecification } from "./MeasurementSpecification";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { screen } from "@testing-library/react";
import SharedContext from "shared/SharedContext";
import commonQuestionsLabel2024 from "labels/2024/commonQuestionsLabel";
import commonQuestionsLabel2023 from "labels/2023/commonQuestionsLabel";

describe("MeasurementSpecification component", () => {
  it("renders the component", async () => {
    renderWithHookForm(
      <SharedContext.Provider value={commonQuestionsLabel2024}>
        <MeasurementSpecification type="CMS" />
      </SharedContext.Provider>
    );

    expect(screen.getByText("Measurement Specification")).toBeInTheDocument();

    expect(
      screen.getByText("Centers for Medicare & Medicaid Services (CMS)")
    ).toBeInTheDocument();

    expect(screen.getByText("Other")).toBeInTheDocument();

    const otherRadio = await screen.getByLabelText("Other");
    fireEvent.click(otherRadio);

    const textArea = await screen.findByLabelText(
      "Describe the specifications that were used to calculate the measure and explain how they deviated from Core Set specifications:"
    );

    expect(textArea).toBeInTheDocument();

    const testText = "This is test text for TextArea";
    fireEvent.type(textArea, testText);
    expect(textArea).toHaveDisplayValue(testText);
  });

  //only for 2021 - 2023
  it("renders the upload", async () => {
    renderWithHookForm(
      <SharedContext.Provider value={commonQuestionsLabel2023}>
        <MeasurementSpecification type="CMS" />
      </SharedContext.Provider>
    );
    expect(screen.getByText("Measurement Specification")).toBeInTheDocument();

    expect(
      screen.getByText("Centers for Medicare & Medicaid Services (CMS)")
    ).toBeInTheDocument();

    expect(screen.getByText("Other")).toBeInTheDocument();

    const otherRadio = await screen.getByLabelText("Other");
    fireEvent.click(otherRadio);

    const textArea = await screen.findByLabelText(
      "Describe the specifications that were used to calculate the measure and explain how they deviated from Core Set specifications:"
    );

    expect(textArea).toBeInTheDocument();

    const testText = "This is test text for TextArea";
    fireEvent.type(textArea, testText);
    expect(textArea).toHaveDisplayValue(testText);
    expect(
      screen.getByText(
        "If you need additional space to describe your state's methodology, please attach further documentation below."
      )
    ).toBeInTheDocument();
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
    it(`renders ${spec} specification type correctly`, async () => {
      renderWithHookForm(
        <SharedContext.Provider value={commonQuestionsLabel2024}>
          <MeasurementSpecification type={specifications[spec].propType.type} />
        </SharedContext.Provider>
      );
      expect(
        screen.getByText(specifications[spec].displayValue)
      ).toBeInTheDocument();
    });
  }
});
