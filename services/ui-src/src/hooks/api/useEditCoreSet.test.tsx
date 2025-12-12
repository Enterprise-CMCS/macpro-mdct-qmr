import { useEditCoreSet } from "./useEditCoreSet";

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn().mockImplementation((arg) =>
    arg.mutationFn({
      body: { userState: "MA" },
      state: "MA",
      year: "2025",
      coreSet: "ACSC",
    })
  ),
}));

const mockEditCoreSet = jest.fn();
jest.mock("libs/api", () => ({
  editCoreSet: () => mockEditCoreSet(),
}));

describe("Test useEditCoreSet", () => {
  it("Test successful call to API", () => {
    useEditCoreSet();
    expect(mockEditCoreSet).toHaveBeenCalled();
  });
});
