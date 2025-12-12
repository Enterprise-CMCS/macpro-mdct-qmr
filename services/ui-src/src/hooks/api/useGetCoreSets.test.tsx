import { useGetCoreSets } from "./useGetCoreSets";
import { useParams } from "react-router-dom";

const props = { state: "MA", year: 2026 };
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn().mockImplementation((arg) => arg.queryFn(props)),
}));

jest.mock("react-router-dom");
const mockUseParam = useParams as jest.Mock;

const mockGetAllCoreSet = jest.fn();
jest.mock("libs/api", () => ({
  getAllCoreSets: () => mockGetAllCoreSet(),
}));

describe("Test useGetCoreSets", () => {
  it("Test successful call to API", () => {
    mockUseParam.mockReturnValue(props);
    useGetCoreSets(true);
    expect(mockGetAllCoreSet).toHaveBeenCalled();
  });
  it("Test error", () => {
    mockUseParam.mockReturnValue({});
    expect(() => useGetCoreSets(false)).toThrowError(
      "state or year unavailable"
    );
  });
});
