import { areObjectsDifferent } from "./form";

describe("Test areObjectsDifferent", () => {
  const objA = {
    measure: "AAB-AD",
    status: "completed",
    data: { pm: [{ label: "test 1", numerator: "2" }] },
  };
  const objB = {
    status: "completed",
    measure: "AAB-AD",
    data: { pm: [{ label: "test 1", numerator: "2" }] },
  };
  const objC = {
    status: "completed",
    measure: "AAB-AD",
    data: { pm: [{ label: "test 1", numerator: "4" }] },
  };
  test("should return false when comparing the same two objects", () => {
    const isDiff = areObjectsDifferent(objA, objB);
    expect(isDiff).toBe(false);
  });
  test("should return true when comparing two different objects", () => {
    const isDiff = areObjectsDifferent(objA, objC);
    expect(isDiff).toBe(true);
  });
});
