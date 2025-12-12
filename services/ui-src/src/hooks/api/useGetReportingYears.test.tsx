import { useParams } from "react-router-dom";
import { useGetReportingYears } from "./useGetReportingYears";

const props = { coreSet: "ACSC", measure: "AAB-AD" };
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn().mockImplementation((arg) => arg.queryFn(props)),
}));

jest.mock("react-router-dom");
const mockUseParam = useParams as jest.Mock;

jest.mock("./usePathParams", () => ({
  usePathParams: jest.fn().mockReturnValue({}),
}));

const mockGetReportingYears = jest.fn();
jest.mock("libs/api", () => ({
  getReportingYears: () => mockGetReportingYears(),
}));

describe("Test useGetReportingYears", () => {
  it("Test successful call to API", () => {
    mockUseParam.mockReturnValue({ state: "MA", year: 2026 });
    useGetReportingYears();
    expect(mockGetReportingYears).toHaveBeenCalled();
  });
  it("Test error", () => {
    mockUseParam.mockReturnValue({});
    expect(() => useGetReportingYears()).toThrowError(
      "state or year unavailable"
    );
  });
});
