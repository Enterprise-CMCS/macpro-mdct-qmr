import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { NDRSetsAccordion } from "./ndrSets";
import { usePerformanceMeasureContext } from "shared/commonQuestions/OptionalMeasureStrat/context";

usePerformanceMeasureContext;
jest.mock("shared/commonQuestions/OptionalMeasureStrat/context", () => ({
  ...jest.requireActual("shared/commonQuestions/OptionalMeasureStrat/context"),
  usePerformanceMeasureContext: jest.fn(),
}));

jest.mock("./ndrFields", () => ({
  ...jest.requireActual("./ndrFields"),
  useAgeGroupsFields: () => {
    return [];
  },
  useRenderOPMCheckboxOptions: () => {
    return [];
  },
}));

describe("Test NDRSets component", () => {
  it("Test Default NDRSet", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      OPM: false,
      componentFlag: "DEFAULT",
    });
    renderWithHookForm(<NDRSetsAccordion name={""} />);
  });
  it("Test AIF NDRSet", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      OPM: false,
      componentFlag: "AIF",
    });
    renderWithHookForm(<NDRSetsAccordion name={""} />);
  });
  it("Test IU NDRSet", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      OPM: false,
      componentFlag: "IU",
    });
    renderWithHookForm(<NDRSetsAccordion name={""} />);
  });
  it("Test PCR NDRSet", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      OPM: false,
      componentFlag: "PCR",
      qualifiers: [],
    });
    renderWithHookForm(<NDRSetsAccordion name={""} />);
  });
  it("Test Other Performance Measure NDRSet", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      OPM: true,
      componentFlag: "DEFAULT",
    });
    renderWithHookForm(<NDRSetsAccordion name={""} />);
  });
});
