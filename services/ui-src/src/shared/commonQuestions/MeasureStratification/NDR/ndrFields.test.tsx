import { screen } from "@testing-library/react";
import { renderWithHookForm } from "utils";
import { useAgeGroupsFields, useRenderOPMCheckboxOptions } from "./ndrFields";
import { usePerformanceMeasureContext } from "shared/commonQuestions/OptionalMeasureStrat/context";
import userEvent from "@testing-library/user-event";

const mockValues = {
  OPM: [],
  componentFlag: "DEFAULT",
  categories: [{ id: "cat-1", label: "cat 1", text: "cat 1" }],
  qualifiers: [{ id: "qual-1", label: "qual 1", text: "qual 1" }],
  performanceMeasureArray: [
    [
      {
        uid: "cat-1.qual-1",
        label: "qual 1",
        rate: "33.3",
        numerator: "2",
        denominator: "3",
      },
    ],
  ],
};

const OPM = [
  {
    rate: [
      {
        denominator: "3",
        numerator: "2",
        rate: "66.7",
      },
    ],
    description: "mock-rate",
  },
];

jest.mock("shared/commonQuestions/OptionalMeasureStrat/context", () => ({
  ...jest.requireActual("shared/commonQuestions/OptionalMeasureStrat/context"),
  usePerformanceMeasureContext: jest.fn(),
}));

const RenderAgeGroupsCheckboxes = ({ name }: { name: string }) => {
  const ageGroupsResult = useAgeGroupsFields(name);
  return <div>{ageGroupsResult}</div>;
};

const RenderOPMCheckboxOptions = ({ name }: { name: string }) => {
  let opmCheckboxOptions = useRenderOPMCheckboxOptions(name);
  return <div>{opmCheckboxOptions}</div>;
};

describe("Test ndrFields Components", () => {
  it("Test useAgeGroupsFields render", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue(mockValues);
    renderWithHookForm(<RenderAgeGroupsCheckboxes name={"test"} />);
    expect(screen.getByText("cat 1")).toBeInTheDocument();
    expect(screen.getByText("qual 1")).toBeInTheDocument();

    const textboxIds = ["numerator", "denominator", "rate"];

    textboxIds.forEach((id) => {
      const textbox = screen.getByRole("textbox", {
        name: `test.rates.cat-1.qual-1.0.${id}`,
      });
      expect(textbox).toBeInTheDocument();
      userEvent.type(textbox, "2");
      const expectedValue = id === "rate" ? "100.0" : "2";
      expect(textbox).toHaveValue(expectedValue);
    });
  });

  it("Test useRenderOPMCheckboxOptions render", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      ...mockValues,
      OPM,
    });
    renderWithHookForm(<RenderOPMCheckboxOptions name={"mock-checkbox"} />);
    expect(screen.getByText("mock-rate")).toBeInTheDocument();

    const textboxIds = ["numerator", "denominator", "rate"];

    textboxIds.forEach((id) => {
      const textbox = screen.getByRole("textbox", {
        name: `mock-checkbox.rates.OPM.OPM_mockrate.0.${id}`,
      });
      expect(textbox).toBeInTheDocument();
      userEvent.type(textbox, "2");
      const expectedValue = id === "rate" ? "100.0" : "2";
      expect(textbox).toHaveValue(expectedValue);
    });
  });
});
