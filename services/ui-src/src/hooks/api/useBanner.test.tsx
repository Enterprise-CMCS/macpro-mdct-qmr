import { useDeleteBanner, useGetBanner, useWriteBanner } from "./useBanner";

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn().mockImplementation((arg) => arg.mutationFn()),
  useQuery: jest.fn().mockImplementation((arg) => arg.queryFn()),
}));

const mockGetBanner = jest.fn();
const mockWriteBanner = jest.fn();
const mockDeleteBanner = jest.fn();

jest.mock("libs/api", () => ({
  getBanner: () => mockGetBanner(),
  writeBanner: () => mockWriteBanner(),
  deleteBanner: () => mockDeleteBanner(),
}));

describe("Test useBanner", () => {
  it("Test successful call to API", () => {
    useGetBanner("mock-key");
    expect(mockGetBanner).toHaveBeenCalled();

    useWriteBanner();
    expect(mockWriteBanner).toHaveBeenCalled();

    useDeleteBanner();
    expect(mockDeleteBanner).toHaveBeenCalled();
  });
});
