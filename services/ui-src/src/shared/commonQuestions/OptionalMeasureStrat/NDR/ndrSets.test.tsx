import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { NDRSets } from "./ndrSets";
import { usePerformanceMeasureContext } from "../context";

jest.mock("../context", () => ({
  ...jest.requireActual("../context"),
  usePerformanceMeasureContext: jest.fn(),
}));

jest.mock("./ndrCheckboxes", () => ({
  ...jest.requireActual("./ndrCheckboxes"),
  useAgeGroupsCheckboxes: () => {
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
    renderWithHookForm(<NDRSets name={""} />);
  });
  it("Test AIF NDRSet", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      OPM: false,
      componentFlag: "AIF",
    });
    renderWithHookForm(<NDRSets name={""} />);
  });
  it("Test IU NDRSet", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      OPM: false,
      componentFlag: "IU",
    });
    renderWithHookForm(<NDRSets name={""} />);
  });
  it("Test PCR NDRSet", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      OPM: false,
      componentFlag: "PCR",
      qualifiers: [],
    });
    renderWithHookForm(<NDRSets name={""} />);
  });
  it("Test Other Performance Measure NDRSet", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      OPM: true,
      componentFlag: "DEFAULT",
    });
    renderWithHookForm(<NDRSets name={""} />);
  });
});
