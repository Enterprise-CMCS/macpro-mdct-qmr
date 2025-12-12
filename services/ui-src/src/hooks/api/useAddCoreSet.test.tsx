import { useParams } from "react-router-dom";
import { useAddCoreSet } from "./useAddCoreSet";

jest.mock("react-router-dom");
const mockUseParam = useParams as jest.Mock;

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn().mockImplementation((arg) => arg.mutationFn()),
}));

const mockCreateCoreset = jest.fn();
jest.mock("libs/api", () => ({
  createCoreSet: () => mockCreateCoreset(),
}));

describe("Test useAddCoreSet", () => {
  it("Test successful call to API", () => {
    mockUseParam.mockReturnValue({ state: "MA", year: "2026" });
    useAddCoreSet();
    expect(mockCreateCoreset).toHaveBeenCalled();
  });
  it("Test error", () => {
    mockUseParam.mockReturnValue({ state: "", year: "2026" });
    expect(() => useAddCoreSet()).toThrowError("Missing required fields");
  });
});
