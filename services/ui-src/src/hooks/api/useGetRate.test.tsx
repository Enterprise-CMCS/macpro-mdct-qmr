import { useGetRate } from "./useGetRate";

const props = { coreSetAbbr: "AC" };
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn().mockImplementation((arg) => arg.queryFn(props)),
}));

const mockGetRate = jest.fn();
jest.mock("libs/api", () => ({
  getRate: () => mockGetRate(),
}));

describe("Test useGetRate", () => {
  it("Test successful call to API", () => {
    useGetRate({
      measure: "BCS-AD",
      state: "MA",
      coreSet: "ACSC",
      year: "2026",
    });
    expect(mockGetRate).toHaveBeenCalled();
  });
  it("Test error", () => {
    expect(() =>
      useGetRate({ measure: "", state: "", coreSet: "", year: "" })
    ).toThrowError("state or year unavailable");
  });
});
