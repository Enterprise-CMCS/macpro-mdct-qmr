import { render } from "@testing-library/react";
import { parseLabelToHTML } from "./parser";

describe("Test parseLabelToHTML", () => {
  it("Test that label text with tags will return JSX elements", () => {
    const label = "Hello <em>I am a tag</em> and I am a string";
    const parsedLabel = parseLabelToHTML(label);
    expect(parsedLabel).toBeInstanceOf(Object);
  });

  it("Test that it renders tags recursively", () => {
    const label = "<em><strong>hello</strong></em>";

    const parsedLabel = parseLabelToHTML(label);
    const { container } = render(parsedLabel);

    const outerTag = container.querySelector("em");
    expect(outerTag).toBeTruthy();
    const innerTag = container.querySelector("strong");
    expect(innerTag).toBeTruthy();
  });

  it("Test that error is thrown when data is not an html element", () => {
    const label = "I am a bad set of <![CDATA[data]]>";
    expect(() => parseLabelToHTML(label)).toThrow(
      "Unrecognized node type in label:\n" + label
    );
  });

  it("Test that attributes are copied", () => {
    const label = `<a href="https://example.com/">test</a>`;
    const parsedLabel = parseLabelToHTML(label);
    const { container } = render(parsedLabel);
    const link = container.querySelector("a")!;
    expect(link.href).toBe("https://example.com/");
  });
});
