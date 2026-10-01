import { render, screen } from "@testing-library/react";
import { BannerData } from "types";
import { Banner } from "../Banner";
import { toHaveNoViolations } from "jest-axe";
import axe from "@ui-src/axe-helper";
expect.extend(toHaveNoViolations);

const bannerData: BannerData = {
  title: "Banner Title",
  description: "Banner Description",
};

const testComponent = <Banner bannerData={bannerData} />;

describe("Test Banner Item", () => {
  it("should be visible", () => {
    render(testComponent);
    expect(screen.getByText(bannerData.title)).toBeInTheDocument();
    expect(screen.getByText(bannerData.description)).toBeInTheDocument();
  });

  // Regression test for htmlparser2's move to treating iframe as a raw-text
  // tag (v12), which changed how malformed/unclosed <iframe> is parsed.
  it.each([
    [
      "malformed attribute syntax with a closing tag",
      "abc<iframe//src=jAva&Tab;script:alert(3)>def</iframe>",
      "def",
    ],
    [
      "malformed attribute syntax without a closing tag",
      "abc<iframe//src=jAva&Tab;script:alert(3)>def",
      "def",
    ],
    [
      "unclosed iframe with no closing tag at all",
      'abc<iframe src="evil.com">payload',
      "payload",
    ],
  ])(
    "should strip content of malformed/unclosed iframe tags: %s",
    (_description, content, strippedContent) => {
      const { container } = render(
        <Banner bannerData={{ title: "Banner Title", description: content }} />
      );
      const descriptionContainer = container.querySelector(
        ".ds-c-alert__text"
      ) as HTMLElement;

      expect(descriptionContainer).toHaveTextContent("abc");
      expect(descriptionContainer.innerHTML).not.toContain(strippedContent);
    }
  );

  // Regression test for https://github.com/advisories/GHSA-g8qq-57p8-ggw5
  it("should strip SVG SMIL animate href-list XSS payloads", () => {
    const svgAnimateHrefListPayload =
      '<svg><a><animate attributeName="href" values="#safe;javascript:alert(1)" dur=".01s" fill="freeze"></animate><text y="30">Click me</text></a></svg>';
    const { container } = render(
      <Banner
        bannerData={{
          title: "Banner Title",
          description: svgAnimateHrefListPayload,
        }}
      />
    );
    const descriptionContainer = container.querySelector(
      ".ds-c-alert__text"
    ) as HTMLElement;

    expect(descriptionContainer.innerHTML).not.toContain("javascript:");
    expect(descriptionContainer.innerHTML).not.toContain("animate");
    expect(descriptionContainer.querySelector("svg")).toBeNull();
  });

  it("should not have basic accessibility issues", async () => {
    const { container } = render(testComponent);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
