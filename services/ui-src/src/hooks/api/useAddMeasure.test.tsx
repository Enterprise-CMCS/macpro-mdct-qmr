import { useApiMock, defaultMockValues } from "utils/testUtils/useApiMock";
import { useAddMeasure, addMeasure } from "./useAddMeasure";
import { useMutation } from "@tanstack/react-query";
import { CoreSetAbbr } from "types";
import { createMeasure } from "libs/api";

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));

jest.mock("libs/api", () => ({
  createMeasure: jest.fn().mockReturnValue({ body: "ok" }),
}));

const data = {
  body: {
    description: "",
    userState: "",
  },
  coreSet: CoreSetAbbr.ACSC,
  measure: "AABAD",
  state: "NJ",
  year: "2025",
};

describe("Test useAddMeasure", () => {
  beforeEach(() => {
    useApiMock({
      useAddMeasureValues: {
        useMutation: () => {
          return "hello";
        },
      },
    });
  });
  it("Test useAddMeasure function", () => {
    const defaultMeasureValues =
      defaultMockValues.useAddMeasureValues.useMutation();

    (useMutation as jest.Mock).mockReturnValue({});
    const response = useAddMeasure();
    console.log(response);
    // expect(useMutation).toBeCalled();
    // expect(response).toMatch(defaultMeasureValues);
  });

  it("Test addMeasure function", () => {
    const response = addMeasure(data);

    expect(createMeasure).toBeCalled();
    expect(response).toMatchObject({ body: "ok" });
  });
});
