import { useParams } from "react-router-dom";
import { useUpdateMeasure } from "./useUpdateMeasure";

const props = { coreSet: "ACSC", measure: "AAB-AD" };
jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn().mockImplementation((arg) => arg.mutationFn(props)),
}));

jest.mock("react-router-dom");
const mockUseParam = useParams as jest.Mock;

jest.mock("./usePathParams", () => ({
  usePathParams: jest.fn().mockReturnValue({}),
}));

const mockFditMeasure = jest.fn();
jest.mock("libs/api", () => ({
  editMeasure: () => mockFditMeasure(),
}));

describe("Test useUpdateMeasure", () => {
  it("Test successful call to API", () => {
    mockUseParam.mockReturnValue({ state: "MA", year: 2026, coreSetId: "AC" });
    useUpdateMeasure();
    expect(mockFditMeasure).toHaveBeenCalled();
  });
  it("Test error", () => {
    mockUseParam.mockReturnValue({});
    expect(() => useUpdateMeasure()).toThrowError("Missing required fields");
  });
});
