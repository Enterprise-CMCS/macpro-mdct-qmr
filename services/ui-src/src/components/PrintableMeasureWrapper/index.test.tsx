import { screen } from "@testing-library/react";
import { PrintableMeasureWrapper } from ".";
import { renderWithHookForm } from "utils";
import { useParams } from "react-router-dom";
import { getMeasureYear } from "utils/getMeasureYear";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useForm: jest.fn().mockReturnValue({
    formState: {
      isDirty: false,
    },
    reset: () => {},
  }),
  useParams: jest.fn(),
}));
jest.mock("utils/getMeasureYear", () => ({
  getMeasureYear: jest.fn(),
}));
const mockUseParam = useParams as jest.Mock;
const mockGetMeasureYear = getMeasureYear as jest.Mock;

const mockMeasure = <div>mock measure</div>;
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  cloneElement: (el: any) => el,
}));

const mockMeasureData = {
  createdAt: 1768251268539,
  compoundKey: "MA2026CCSM",
  measure: "AAB-CH",
  year: 2026,
  lastAltered: 1768251268539,
  state: "MA",
  coreSet: "CCSM",
  status: "incomplete",
  autoCompleted: false,
  measureType: "Mandatory",
  lastAlteredBy: "ghost",
};

describe("Test PrintableMeasureWrapper Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetMeasureYear.mockReturnValue(2026);
  });

  it("PrintableMeasureWrapper renders", () => {
    mockUseParam.mockReturnValue({ coreSetId: "CCSM", state: "MA" });
    renderWithHookForm(
      <PrintableMeasureWrapper
        measure={mockMeasure}
        name={"AAB-CH"}
        year={"2026"}
        measureId={"AAB-CH"}
        measureData={mockMeasureData}
      ></PrintableMeasureWrapper>
    );

    expect(screen.getByText("mock measure")).toBeVisible();
  });

  it("PrintableMeasureWrapper does not render when params are undefined", () => {
    mockUseParam.mockReturnValue({});
    renderWithHookForm(
      <PrintableMeasureWrapper
        measure={mockMeasure}
        name={"AAB-CH"}
        year={"2026"}
        measureId={"AAB-CH"}
        measureData={mockMeasureData}
      ></PrintableMeasureWrapper>
    );

    expect(screen.queryByText("mock measure")).not.toBeInTheDocument();
  });

  it("renders stratification reminder when required for the core set", () => {
    mockUseParam.mockReturnValue({ coreSetId: "CCSM", state: "MA" });
    renderWithHookForm(
      <PrintableMeasureWrapper
        measure={mockMeasure}
        name={"AAB-CH"}
        year={"2026"}
        measureId={"AAB-CH"}
        measureData={{
          ...mockMeasureData,
          stratificationRequired: ["CCSM"],
        }}
      ></PrintableMeasureWrapper>
    );

    expect(
      screen.getByText("Reminder: Measure Stratification Required")
    ).toBeInTheDocument();
  });

  it("does not render stratification reminder before 2026", () => {
    mockGetMeasureYear.mockReturnValue(2025);
    mockUseParam.mockReturnValue({ coreSetId: "CCSM", state: "MA" });
    renderWithHookForm(
      <PrintableMeasureWrapper
        measure={mockMeasure}
        name={"AAB-CH"}
        year={"2025"}
        measureId={"AAB-CH"}
        measureData={{
          ...mockMeasureData,
          year: 2025,
          stratificationRequired: ["CCSM"],
        }}
      ></PrintableMeasureWrapper>
    );

    expect(
      screen.queryByText("Reminder: Measure Stratification Required")
    ).not.toBeInTheDocument();
  });
});
