import { useDeleteMeasure } from "./useDeleteMeasure";

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest
    .fn()
    .mockImplementation((arg) =>
      arg.mutationFn({ state: "MA", year: "2025", coreSet: "ACSC" })
    ),
}));

const mockDeleteMeasure = jest.fn();
jest.mock("libs/api", () => ({
  deleteMeasure: () => mockDeleteMeasure(),
}));

describe("Test useDeleteMeasure", () => {
  it("Test successful call to API", () => {
    useDeleteMeasure();
    expect(mockDeleteMeasure).toHaveBeenCalled();
  });
});
