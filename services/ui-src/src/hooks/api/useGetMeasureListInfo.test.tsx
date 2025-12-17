import { useGetMeasureListInfo } from "./useGetMeasureListInfo";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn().mockImplementation((arg) => arg.queryFn()),
}));

const mockGetMeasureListInfo = jest.fn();
jest.mock("libs/api", () => ({
  getMeasureListInfo: () => mockGetMeasureListInfo(),
}));

describe("Test useGetMeasureListInfo", () => {
  it("Test successful call to API", () => {
    useGetMeasureListInfo();
    expect(mockGetMeasureListInfo).toHaveBeenCalled();
  });
});
