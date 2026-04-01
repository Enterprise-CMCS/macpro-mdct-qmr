import { getLabelText } from "./getLabelText";

describe("getLabelText", () => {
  it("should include legacy category and qualifier labels", () => {
    jest.spyOn(window, "location", "get").mockReturnValueOnce({
      pathname: "_/_/2022/_/AMM-AD",
    } as Location);
    expect(getLabelText()).toEqual({
      "Age 65 and older": "Age 65 and older",
      "Ages 18 to 64": "Ages 18 to 64",
      "Effective Acute Phase Treatment": "Effective Acute Phase Treatment",
      "Effective Continuation Phase Treatment":
        "Effective Continuation Phase Treatment",
    });
  });

  it("should include ID-based category and qualifier labels", () => {
    jest.spyOn(window, "location", "get").mockReturnValueOnce({
      pathname: "_/_/2025/_/AMM-AD",
    } as Location);
    expect(getLabelText()).toEqual({
      "Age 65 and older": "Age 65 and older",
      "Ages 18 to 64": "Ages 18 to 64",
      "Effective Acute Phase Treatment": "Effective Acute Phase Treatment",
      "Effective Continuation Phase Treatment":
        "Effective Continuation Phase Treatment",
    });
  });
});
