import { createCoreSetKey, createMeasureKey } from "../createCompoundKey";

describe("Testing createCoreSetKey", () => {
  test("Successful key creation", () => {
    const key = createCoreSetKey({ year: "2022", state: "FL", coreSet: "ACS" });
    expect(key).toEqual("FL2022ACS");
  });
});

describe("Testing createMeasureKey", () => {
  test("Successful key creation", () => {
    const key = createMeasureKey({
      year: "2022",
      state: "FL",
      coreSet: "ACS",
      measure: "FUA-AD",
    });
    expect(key).toEqual("FL2022ACSFUA-AD");
  });
});
