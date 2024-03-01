import { parseLabelToHTML } from "./parser";

describe("Test parseLabelToHTML", () => {
  it("Test that label text with tags will return JSX elements", () => {
    const label = "Hello <em>I am a tag</em> and I am a string";
    const parsedLabel = parseLabelToHTML(label);
    expect(parsedLabel).toBeInstanceOf(Object);
  });
});
