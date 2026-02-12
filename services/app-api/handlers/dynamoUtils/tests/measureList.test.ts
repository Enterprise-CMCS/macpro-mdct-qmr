import { measures } from "../measureList";

// This test is worthless, but there isn't a curently useful test for a measure array
describe("Testing Measure List", () => {
  test("test measure list contains measure obects", () => {
    expect(measures["2021"][0]).toBeDefined();
  });
});
