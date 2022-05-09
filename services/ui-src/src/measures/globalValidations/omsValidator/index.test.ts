import { omsValidations } from "./index";

describe("Testing OMS validation processor", () => {
  test("should have no errors for no data", () => {
    expect(omsValidations).toBeTruthy();
  });
});
