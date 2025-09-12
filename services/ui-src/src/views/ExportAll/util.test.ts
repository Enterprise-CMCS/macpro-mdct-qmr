import {
  applyPrinceSpecificCss,
  openPdf,
  getSpaName,
  htmlStringCleanup,
} from "./util";

describe("ExportAll utils", () => {
  describe("getSpaName", () => {
    const props = {
      coreSetId: "HHCS_24-0020",
      state: "DC",
      year: "2025",
    };

    it("should return undefined if the needed params are missing", () => {
      expect(getSpaName({ ...props, coreSetId: undefined })).toBeUndefined();
      expect(getSpaName({ ...props, state: undefined })).toBeUndefined();
      expect(getSpaName({ ...props, year: undefined })).toBeUndefined();
    });

    it("should return undefined if the coreSetId does not contain an underscore", () => {
      expect(getSpaName({ ...props, coreSetId: "HHCS" })).toBeUndefined();
    });

    it("should return undefined if the year does not have defined SPAs", () => {
      expect(getSpaName({ ...props, year: "1999" })).toBeUndefined();
    });

    it("should return undefined if matching spa info cannot be found", () => {
      expect(getSpaName({ ...props, state: "ZZ" })).toBeUndefined();
      expect(getSpaName({ ...props, coreSetId: "HHCS_nope" })).toBeUndefined();
    });

    it("should find the SPA info for a specific core set ID", () => {
      expect(getSpaName(props)).toBe("DC 24-0020 - Chronic Conditions");
    });
  });

  describe("htmlStringCleanup", () => {
    it("should adjust asset and footer links", () => {
      if (window.location.host !== "localhost") {
        throw new Error("Test inconclusive; expected domain to be localhost");
      }
      const html = `
        <img src="https://example.com/assets/foo.png"/>
        <img src="/assets/bar.jpg"/>
        <img src="/assets/baz.svg"/>
        <img src="/footer/quux.gif"/>
      `;
      const result = htmlStringCleanup(html);
      expect(result).toContain("https://example.com/assets/foo.png");
      expect(result).toContain("https://localhost/assets/bar.jpg");
      expect(result).toContain("https://localhost/assets/baz.svg");
      expect(result).toContain("https://localhost/footer/quux.gif");
    });

    it("should replace certain characters", () => {
      const html = "‘single’ and “double” quotes \u2013 en dash \u2014 em dash";
      const result = htmlStringCleanup(html);
      expect(result).toBe(`'single' and "double" quotes - en dash - em dash`);
    });

    it("should forbid flex and inline styling for the entire page", () => {
      const html = "span { display: inline; } .container { display: flex; }";
      const result = htmlStringCleanup(html);
      expect(result).toContain("span { display: block; }");
      expect(result).toContain(".container { display: block; }");
    });

    it("should turn textareas into paragraphs", () => {
      const html = `<textarea required class="foo">contents</textarea>`;
      const result = htmlStringCleanup(html);
      expect(result).toBe(
        `<p class="chakra-text replaced-text-area">contents</p>`
      );
    });

    it("should turn textareas outside the tab order into hidden paragraphs", () => {
      const html = `<textarea id="x" tabindex="-1" class="foo">oof</textarea>`;
      const result = htmlStringCleanup(html);
      expect(result).toBe(`<p class="hidden-print-items">oof</p>`);
    });
  });

  describe("applyPrinceSpecificCss", () => {
    it("should create a new style tag", () => {
      const countBefore = document.body.querySelectorAll("style").length;

      applyPrinceSpecificCss();

      const countAfter = document.body.querySelectorAll("style").length;

      expect(countAfter).toBe(countBefore + 1);
    });
  });

  describe("openPdf", () => {
    beforeEach(() => {
      global.open = jest.fn();
      global.URL.createObjectURL = jest.fn();
    });
    it("should call window.open with proper url", () => {
      openPdf("test");
      expect(global.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(global.open).toHaveBeenCalled();
    });
  });
});
