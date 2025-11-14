import { screen } from "@testing-library/react";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { NDRSets } from "./ndrSets";
import { usePerformanceMeasureContext } from "../context";

jest.mock("utils", () => ({
  ...jest.requireActual("utils"),
  isLegacyLabel: () => {
    return true;
  },
  getLabelText: () => {
    return { "qual 1": "qual 1" };
  },
}));

jest.mock("../context", () => ({
  ...jest.requireActual("../context"),
  usePerformanceMeasureContext: jest.fn(),
}));

jest.mock("./ndrCheckboxes", () => ({
  ...jest.requireActual("./ndrCheckboxes"),
  useRenderOPMCheckboxOptions: () => {
    return [];
  },
}));

const mockValues = {
  OPM: false,
  componentFlag: "DEFAULT",
  categories: [{ id: "cat-1", label: "cat 1", text: "cat 1" }],
  qualifiers: [{ id: "qual-1", label: "qual 1", text: "qual 1" }],
  performanceMeasureArray: [
    [
      {
        label: "qual 1",
        rate: "33.3",
        numerator: "2",
        denominator: "3",
      },
    ],
  ],
};

describe("Test NDRSets component", () => {
  it("Test Default NDRSet render", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue(mockValues);

    const sets = <NDRSets name={"rateData"} />;
    renderWithHookForm(sets);

    expect(screen.getByText("qual 1")).toBeVisible();
  });
  it("Test AIF NDRSet render", () => {
    mockValues.componentFlag = "AIF";
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue(mockValues);
    renderWithHookForm(<NDRSets name={""} />);
  });
  it("Test IU NDRSet render", () => {
    mockValues.componentFlag = "IU";
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue(mockValues);
    renderWithHookForm(<NDRSets name={""} />);
  });
  it("Test PCR NDRSet render", () => {
    mockValues.componentFlag = "PCR";
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue(mockValues);
    renderWithHookForm(<NDRSets name={""} />);
  });
  it("Test Other Performance Measure NDRSet render", () => {
    mockValues.OPM = true;
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue(mockValues);
    renderWithHookForm(<NDRSets name={""} />);
  });
});
