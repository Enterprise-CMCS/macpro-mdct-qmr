import { SPA } from "./spaLib";

describe("spaLib", () => {
  it("Should contain properly-shaped data", () => {
    // Technically, this test is redundant with the Typescript definitions.
    for (let yearlySpas of Object.values(SPA)) {
      for (let spa of yearlySpas) {
        expect(typeof spa.id).toBe("string");
        expect(typeof spa.state).toBe("string");
        expect(typeof spa.name).toBe("string");
        expect(spa.id).toBeTruthy();
        expect(spa.state).toBeTruthy();
        expect(spa.name).toBeTruthy();
      }
    }
  });
});
