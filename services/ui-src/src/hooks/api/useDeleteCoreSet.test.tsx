import { useDeleteCoreSet } from "./useDeleteCoreSet";

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest
    .fn()
    .mockImplementation((arg) =>
      arg.mutationFn({ state: "MA", year: "2025", coreSet: "ACSC" })
    ),
}));

const mockDeleteCoreSet = jest.fn();
jest.mock("libs/api", () => ({
  deleteCoreSet: () => mockDeleteCoreSet(),
}));

describe("Test useDeleteCoreSet", () => {
  it("Test successful call to API", () => {
    useDeleteCoreSet();
    expect(mockDeleteCoreSet).toHaveBeenCalled();
  });
});
