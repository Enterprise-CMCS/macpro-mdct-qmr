import { useAgeGroupsFields } from "./ndrFields";
import { renderWithHookForm } from "utils";
import { usePerformanceMeasureContext } from "shared/commonQuestions/OptionalMeasureStrat/context";

jest.mock("shared/commonQuestions/OptionalMeasureStrat/context", () => ({
  ...jest.requireActual("shared/commonQuestions/OptionalMeasureStrat/context"),
  usePerformanceMeasureContext: jest.fn(),
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

let ageGroupsResult: any;

const AgeGroupsCheckboxesTest = ({ name }: { name: string }) => {
  ageGroupsResult = useAgeGroupsFields(name);
  return <div data-testid="age-groups-rendered">Ready</div>;
};

describe("Test ndrFields Components", () => {
  it("Test useAgeGroupsFields render", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue(mockValues);
    renderWithHookForm(<AgeGroupsCheckboxesTest name={"test"} />);
    expect(ageGroupsResult[0]).toBe(undefined);
  });
});
