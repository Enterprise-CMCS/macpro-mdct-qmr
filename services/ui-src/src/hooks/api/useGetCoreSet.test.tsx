import { useGetCoreSet } from "./useGetCoreSet";

const props = {
  coreSetId: "AC",
  state: "MA",
  year: "2025",
};

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn().mockImplementation((arg) => arg.queryFn(props)),
}));

const mockGetCoreSet = jest.fn();
jest.mock("libs/api", () => ({
  getCoreSet: () => mockGetCoreSet(),
}));

describe("Test useGetCoreSet", () => {
  it("Test successful call to API", () => {
    useGetCoreSet(props);
    expect(mockGetCoreSet).toHaveBeenCalled();
  });
  it("Test error", () => {
    expect(() =>
      useGetCoreSet({ coreSetId: "", state: "", year: "" })
    ).toThrowError("state or year unavailable");
  });
});
