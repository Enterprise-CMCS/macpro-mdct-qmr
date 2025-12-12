import { useAddMeasure } from "./useAddMeasure";

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn().mockImplementation((arg) => arg.mutationFn()),
}));

const mockCreateMeasure = jest.fn();
jest.mock("libs/api", () => ({
  createMeasure: () => mockCreateMeasure(),
}));

describe("Test useAddMeasure", () => {
  it("Test successful call to API", () => {
    useAddMeasure();
    expect(mockCreateMeasure).toHaveBeenCalled();
  });
});
