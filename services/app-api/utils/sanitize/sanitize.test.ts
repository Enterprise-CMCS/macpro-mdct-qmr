import { sanitizeArray, sanitizeObject, sanitizeString } from "./sanitize";

// SAFE TYPES

const safeBoolean = true;
const safeNaN = NaN;
const safeNumber = 2349872;
const safeNull = null;
const safeUndefined = undefined;

// STRINGS

const cleanString = "test";

const dirtyLinkString = "<ul><li><a href=//google.com>click</ul>";
const cleanLinkString = '<ul><li><a href="//google.com">click</a></li></ul>';

// ARRAYS

const dirtyStringArray = [cleanString, dirtyLinkString];
const cleanStringArray = [cleanString, cleanLinkString];

const dirtyNestedStringArray = [dirtyStringArray, dirtyStringArray];
const cleanNestedStringArray = [cleanStringArray, cleanStringArray];

// OBJECTS

const dirtyObject = {
  string: dirtyLinkString,
  array: dirtyStringArray,
};
const cleanObject = {
  string: cleanLinkString,
  array: cleanStringArray,
};

const dirtyObjectArray = [dirtyObject, dirtyObject];
const cleanObjectArray = [cleanObject, cleanObject];

const dirtyComplexObject = {
  string1: cleanString,
  string2: dirtyLinkString,
  array: dirtyStringArray,
  nestedStringArray: dirtyNestedStringArray,
  nestedObjectArray: dirtyObjectArray,
  emptyArray: [],
  object: dirtyObject,
  emptyObject: {},
};
const cleanComplexObject = {
  string1: cleanString,
  string2: cleanLinkString,
  array: cleanStringArray,
  nestedStringArray: cleanNestedStringArray,
  nestedObjectArray: cleanObjectArray,
  emptyArray: [],
  object: cleanObject,
  emptyObject: {},
};

describe("Test sanitizeString", () => {
  it("should pass through empty strings and clean strings", () => {
    expect(sanitizeString("")).toEqual("");
    expect(sanitizeString(cleanString)).toEqual(cleanString);
  });

  it("should clean dirty strings", () => {
    expect(sanitizeString(dirtyLinkString)).toEqual(cleanLinkString);
  });
});

describe("Test sanitizeArray", () => {
  it("should pass through empty arrays and clean arrays", () => {
    expect(sanitizeArray([])).toEqual([]);
    expect(sanitizeArray(cleanStringArray)).toEqual(cleanStringArray);
    expect(sanitizeArray(cleanNestedStringArray)).toEqual(
      cleanNestedStringArray
    );
    expect(sanitizeArray(cleanObjectArray)).toEqual(cleanObjectArray);
  });

  it("should clean dirty arrays", () => {
    expect(sanitizeArray(dirtyStringArray)).toEqual(cleanStringArray);
    expect(sanitizeArray(dirtyNestedStringArray)).toEqual(
      cleanNestedStringArray
    );
    expect(sanitizeArray(dirtyObjectArray)).toEqual(cleanObjectArray);
  });
});

describe("Test sanitizeObject", () => {
  it("should pass through safe types", () => {
    expect(sanitizeObject({ safeBoolean })).toEqual({ safeBoolean });
    expect(sanitizeObject({ safeNaN })).toEqual({ safeNaN });
    expect(sanitizeObject({ safeNumber })).toEqual({ safeNumber });
    expect(sanitizeObject({ safeNull })).toEqual({ safeNull });
    expect(sanitizeObject({ safeUndefined })).toEqual({ safeUndefined });
  });

  it("should pass through empty object, clean object", () => {
    expect(sanitizeObject({})).toEqual({});
    expect(sanitizeObject(cleanObject)).toEqual(cleanObject);
    expect(sanitizeObject(cleanComplexObject)).toEqual(cleanComplexObject);
  });

  it("should clean dirty objects", () => {
    expect(sanitizeObject(dirtyObject)).toEqual(cleanObject);
    expect(sanitizeObject(dirtyComplexObject)).toEqual(cleanComplexObject);
  });
});

describe("Test sanitizeString security", () => {
  it("should strip script tags and their content entirely", () => {
    expect(sanitizeString('<script>alert("xss")</script>')).toEqual("");
    expect(sanitizeString('<script src="evil.js"></script>')).toEqual("");
    expect(
      sanitizeString("<ul><script>evil()</script><li>item</li></ul>")
    ).toEqual("<ul><li>item</li></ul>");
  });

  it("should strip event handlers from allowed tags", () => {
    expect(sanitizeString('<a href="/" onclick="evil()">click</a>')).toEqual(
      '<a href="/">click</a>'
    );
    expect(
      sanitizeString('<strong onmouseover="evil()">text</strong>')
    ).toEqual("<strong>text</strong>");
    expect(sanitizeString('<em onload="evil()">text</em>')).toEqual(
      "<em>text</em>"
    );
  });

  it("should strip javascript:, data:, and vbscript: protocols from href", () => {
    expect(sanitizeString('<a href="javascript:alert(1)">click</a>')).toEqual(
      "<a>click</a>"
    );
    expect(
      sanitizeString(
        '<a href="data:text/html,<script>evil()</script>">click</a>'
      )
    ).toEqual("<a>click</a>");
    expect(sanitizeString('<a href="vbscript:evil()">click</a>')).toEqual(
      "<a>click</a>"
    );
  });

  it("should allow safe href schemes including protocol-relative", () => {
    expect(sanitizeString('<a href="https://example.com">link</a>')).toEqual(
      '<a href="https://example.com">link</a>'
    );
    expect(
      sanitizeString('<a href="mailto:user@example.com">link</a>')
    ).toEqual('<a href="mailto:user@example.com">link</a>');
    expect(sanitizeString('<a href="//example.com">link</a>')).toEqual(
      '<a href="//example.com">link</a>'
    );
  });

  it("should allow http links", () => {
    expect(sanitizeString('<a href="http://example.com">link</a>')).toEqual(
      '<a href="http://example.com">link</a>'
    );
  });

  it("should strip style attributes from allowed tags", () => {
    expect(
      sanitizeString('<a href="/" style="position:fixed;top:0">link</a>')
    ).toEqual('<a href="/">link</a>');
    expect(sanitizeString('<strong style="color:red">text</strong>')).toEqual(
      "<strong>text</strong>"
    );
  });

  it("should strip disallowed block/container tags and their text content entirely", () => {
    // Deception attack: styled overlay with fake content
    expect(
      sanitizeString('<div style="position:fixed;top:0">fake login</div>')
    ).toEqual("");
    expect(sanitizeString("<span>inline text</span>")).toEqual("");
  });

  it("should strip iframe, object, and embed and their content entirely", () => {
    expect(
      sanitizeString('<iframe src="evil.com">phishing content</iframe>')
    ).toEqual("");
    expect(
      sanitizeString('<object data="evil.swf">fallback text</object>')
    ).toEqual("");
    expect(sanitizeString('<embed src="evil.swf">')).toEqual("");
  });

  it("should strip form elements and their content entirely", () => {
    expect(
      sanitizeString(
        '<form action="https://evil.com"><input name="password"><button>Submit</button></form>'
      )
    ).toEqual("");
  });

  it("should strip SVG and math elements and their content entirely", () => {
    expect(
      sanitizeString('<svg onload="evil()"><script>evil()</script></svg>')
    ).toEqual("");
    expect(sanitizeString("<math><mo>x</mo></math>")).toEqual("");
  });

  it("should strip img tags with dangerous attributes", () => {
    expect(sanitizeString('<img src="x" onerror="evil()">')).toEqual("");
  });

  it("should preserve plain text outside of any tags", () => {
    expect(sanitizeString("plain text with no tags")).toEqual(
      "plain text with no tags"
    );
    expect(sanitizeString("text &amp; more text")).toEqual(
      "text &amp; more text"
    );
  });

  // Regression test for htmlparser2's move to treating iframe as a raw-text
  // tag (v12), which changed how malformed/unclosed <iframe> is parsed.
  it.each([
    [
      "malformed attribute syntax with a closing tag",
      "<ul><li>abc<iframe//src=jAva&Tab;script:alert(3)>def</iframe></li></ul>",
    ],
    [
      "malformed attribute syntax without a closing tag",
      "<ul><li>abc<iframe//src=jAva&Tab;script:alert(3)>def</li></ul>",
    ],
    [
      "unclosed iframe with no closing tag at all",
      '<ul><li>abc<iframe src="evil.com">payload',
    ],
  ])(
    "should strip content of malformed/unclosed iframe tags: %s",
    (_description, input) => {
      expect(sanitizeString(input)).toEqual("<ul><li>abc</li></ul>");
    }
  );

  // Regression test for https://github.com/advisories/GHSA-g8qq-57p8-ggw5
  it("should strip SVG SMIL animate href-list XSS payloads (GHSA-g8qq-57p8-ggw5)", () => {
    const svgAnimateHrefListPayload =
      '<svg><a><animate attributeName="href" values="#safe;javascript:alert(1)" dur=".01s" fill="freeze"></animate><text y="30">Click me</text></a></svg>';
    const sanitized = sanitizeString(svgAnimateHrefListPayload);

    expect(sanitized).not.toContain("javascript:");
    expect(sanitized).not.toContain("animate");
    expect(sanitized).toEqual("");
  });
});
