import { TotalNDRSets } from "./totalNDRSets";
import { renderWithHookForm } from "utils";

jest.mock("../context", () => ({
  ...jest.requireActual("../context"),
  usePerformanceMeasureContext: () => {
    return {
      OPM: false,
      componentFlag: "PCR",
      qualifiers: [
        { id: "mock-id", label: "qual 1" },
        { id: "mock-total", label: "Total" },
      ],
      categories: [],
    };
  },
}));

describe("Test TotalNDRSets component", () => {
  it("Test TotalNDRSets Render", () => {
    renderWithHookForm(<TotalNDRSets componentFlag="DEFAULT" name="" />);
  });
});
