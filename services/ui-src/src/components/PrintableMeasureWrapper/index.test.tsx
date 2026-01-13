import { screen } from "@testing-library/react";
import { PrintableMeasureWrapper } from ".";
import { renderWithHookForm } from "utils";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { cloneElement } from "react";

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
const mockUseParam = useParams as jest.Mock;

const mockMeasure = cloneElement(<Box>mock measure</Box>);
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  cloneElement: jest.fn().mockReturnValue(mockMeasure),
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

    screen.debug();
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
  });
});
