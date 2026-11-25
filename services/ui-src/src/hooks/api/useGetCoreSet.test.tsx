import { CoreSetAbbr } from "@qmr/shared";
import { useGetCoreSet } from "./useGetCoreSet";

const mockProps = {
  coreSetId: CoreSetAbbr.ACS as const,
  state: "MA",
  year: "2025",
};

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn().mockImplementation((arg) => arg.queryFn(mockProps)),
}));

const mockGetCoreSet = jest.fn();
jest.mock("libs/api", () => ({
  getCoreSet: () => mockGetCoreSet(),
}));

describe("Test useGetCoreSet", () => {
  it("Test successful call to API", () => {
    useGetCoreSet(mockProps);
    expect(mockGetCoreSet).toHaveBeenCalled();
  });
  it("Test error", () => {
    expect(() =>
      useGetCoreSet({ coreSetId: "" as any, state: "", year: "" })
    ).toThrow("state or year unavailable");
  });
});
