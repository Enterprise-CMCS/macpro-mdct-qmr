import { ExportAll } from "./index";
import { render, screen } from "@testing-library/react";
import { PrintableMeasureWrapper } from "components";
import { useGetMeasures } from "hooks/api";
import { QualifierData } from "../../measures/2025";

jest.mock("hooks/api", () => ({
  useGetMeasures: jest.fn(),
}));
const mockedGetMeasures = useGetMeasures as jest.MockedFunction<
  typeof useGetMeasures
>;

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: jest.fn().mockReturnValue({
    state: "CO",
    year: "2025",
    coreSetId: "ACS",
  }),
}));

jest.mock("components", () => ({
  ...jest.requireActual("components"),
  PrintableMeasureWrapper: jest.fn(),
}));
const mockMeasureWrapper = PrintableMeasureWrapper as jest.Mock;
mockMeasureWrapper.mockImplementation((props) => {
  const stringifiableProps = { ...props, measure: undefined };
  return <div className="pmw">{JSON.stringify(stringifiableProps)}</div>;
});

describe("ExportAll", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render measure components inside a wrapper", () => {
    const mockCsqData = {
      measure: "CSQ",
      year: "2025",
      description: "mockCsqDescription",
    };
    const mockAabData = {
      measure: "AAB-AD",
      year: "2025",
      description: "mockAabDescription",
    };
    const mockBcsData = {
      measure: "BCS-AD",
      year: "2025",
      description: "mockBcsDescription",
    };
    const mockMeasureData = {
      isLoading: false,
      data: { Items: [mockCsqData, mockAabData, mockBcsData] },
    } as ReturnType<typeof useGetMeasures>;
    mockedGetMeasures.mockReturnValue(mockMeasureData);

    render(<ExportAll />);

    expect(mockMeasureWrapper).toHaveBeenCalledWith(
      {
        measure: expect.anything(),
        measureData: mockCsqData,
        measureId: "CSQ",
        name: "mockCsqDescription",
        year: "2025",
        defaultData: QualifierData,
        spaName: undefined,
      },
      expect.any(Object)
    );

    expect(mockMeasureWrapper).toHaveBeenCalledWith(
      {
        measure: expect.anything(),
        measureData: mockAabData,
        measureId: "AAB-AD",
        name: "mockAabDescription",
        year: "2025",
        defaultData: undefined,
        spaName: undefined,
      },
      expect.any(Object)
    );

    expect(mockMeasureWrapper).toHaveBeenCalledWith(
      {
        measure: expect.anything(),
        measureData: mockBcsData,
        measureId: "BCS-AD",
        name: "mockBcsDescription",
        year: "2025",
        defaultData: undefined,
        spaName: undefined,
      },
      expect.any(Object)
    );
  });

  it("should sort measures: CSQ first, then alphabetically", () => {
    const mockMeasureData = {
      isLoading: false,
      data: {
        Items: [
          {
            measure: "BCS-AD",
            year: "2025",
          },
          {
            measure: "CSQ",
            year: "2025",
          },
          {
            measure: "AAB-AD",
            year: "2025",
          },
        ],
      },
    } as ReturnType<typeof useGetMeasures>;
    mockedGetMeasures.mockReturnValue(mockMeasureData);

    render(<ExportAll />);

    const jumpLinks = screen
      .getAllByRole("link")
      // There are lots of links on this page, but only the jump links
      // at the top of the page are styled as buttons.
      .filter((link) => link.classList.contains("chakra-button"))
      .map((link) => link.textContent);
    expect(jumpLinks).toEqual(["CSQ", "AAB-AD", "BCS-AD"]);
  });

  it("should filter out certain measures", () => {
    const mockMeasureData = {
      isLoading: false,
      data: {
        Items: [
          {
            // Note that the CSQ measure is required for the page to render.
            measure: "CSQ",
            year: "2025",
          },
          {
            measure: "SS-1-HH",
            year: "2025",
          },
          {
            measure: "SS-2-HH",
            userCreated: true,
            year: "2025",
          },
        ],
      },
    } as ReturnType<typeof useGetMeasures>;
    mockedGetMeasures.mockReturnValue(mockMeasureData);

    render(<ExportAll />);

    // Measures matching this pattern are excluded from the page
    expect(screen.queryByText("SS-1-HH")).not.toBeInTheDocument();
    // UNLESS they are user-created
    expect(screen.getByText("SS-2-HH")).toBeInTheDocument();
  });
});
