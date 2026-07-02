import { getLabelText } from "./getLabelText";

describe("getLabelText", () => {
  const setPathname = (pathname: string) => {
    window.history.pushState({}, "", pathname);
  };

  it("should include legacy category and qualifier labels", () => {
    setPathname("/_/2022/_/AMM-AD");
    expect(getLabelText()).toEqual({
      "Age 65 and older": "Age 65 and older",
      "Ages 18 to 64": "Ages 18 to 64",
      "Effective Acute Phase Treatment": "Effective Acute Phase Treatment",
      "Effective Continuation Phase Treatment":
        "Effective Continuation Phase Treatment",
    });
  });

  it("should include ID-based category and qualifier labels", () => {
    setPathname("/_/2025/_/AMM-AD");
    expect(getLabelText()).toEqual({
      "Age 65 and older": "Age 65 and older",
      "Ages 18 to 64": "Ages 18 to 64",
      "Effective Acute Phase Treatment": "Effective Acute Phase Treatment",
      "Effective Continuation Phase Treatment":
        "Effective Continuation Phase Treatment",
    });
  });
});
