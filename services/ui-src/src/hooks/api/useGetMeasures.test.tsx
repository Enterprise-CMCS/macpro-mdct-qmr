import { useParams } from "react-router";
import { useGetMeasures } from "./useGetMeasures";

const props = { coreSetAbbr: "AC" };
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn().mockImplementation((arg) => arg.queryFn(props)),
}));

jest.mock("react-router");
const mockUseParam = useParams as jest.Mock;

jest.mock("./usePathParams", () => ({
  usePathParams: jest.fn().mockReturnValue({}),
}));

const mockListMeasures = jest.fn();
jest.mock("libs/api", () => ({
  listMeasures: () => mockListMeasures(),
}));

describe("Test useGetMeasures", () => {
  it("Test successful call to API", () => {
    mockUseParam.mockReturnValue({ state: "MA", year: 2026 });
    useGetMeasures("AC");
    expect(mockListMeasures).toHaveBeenCalled();
  });
  it("Test error", () => {
    mockUseParam.mockReturnValue({});
    expect(() => useGetMeasures("AC")).toThrow("state or year unavailable");
  });
});
