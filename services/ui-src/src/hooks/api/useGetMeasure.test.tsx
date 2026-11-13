import { useParams } from "react-router";
import { useGetMeasure } from "./useGetMeasure";
import { CoreSetAbbr } from "@qmr/shared";

const mockProps = { coreSet: CoreSetAbbr.ACSC as const, measure: "AAB-AD" };
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn().mockImplementation((arg) => arg.queryFn(mockProps)),
}));

jest.mock("react-router");
const mockUseParam = useParams as jest.Mock;

jest.mock("./usePathParams", () => ({
  usePathParams: jest.fn().mockReturnValue({}),
}));

const mockGetMeasure = jest.fn();
jest.mock("libs/api", () => ({
  getMeasure: () => mockGetMeasure(),
}));

describe("Test useGetMeasure", () => {
  it("Test successful call to API", () => {
    mockUseParam.mockReturnValue({ state: "MA", year: 2026 });
    useGetMeasure(mockProps);
    expect(mockGetMeasure).toHaveBeenCalled();
  });
  it("Test error", () => {
    mockUseParam.mockReturnValue({});
    expect(() => useGetMeasure(mockProps)).toThrow("state or year unavailable");
  });
});
