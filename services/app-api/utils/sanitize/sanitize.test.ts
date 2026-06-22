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
  test("Test sanitizeString passes through empty strings and clean strings", () => {
    expect(sanitizeString("")).toEqual("");
    expect(sanitizeString(cleanString)).toEqual(cleanString);
  });

  test("Test sanitizeString cleans dirty strings", () => {
    expect(sanitizeString(dirtyLinkString)).toEqual(cleanLinkString);
  });
});

describe("Test sanitizeArray", () => {
  test("Test sanitizeArray passes through empty arrays and clean arrays", () => {
    expect(sanitizeArray([])).toEqual([]);
    expect(sanitizeArray(cleanStringArray)).toEqual(cleanStringArray);
    expect(sanitizeArray(cleanNestedStringArray)).toEqual(
      cleanNestedStringArray
    );
    expect(sanitizeArray(cleanObjectArray)).toEqual(cleanObjectArray);
  });

  test("Test sanitizeArray cleans dirty arrays", () => {
    expect(sanitizeArray(dirtyStringArray)).toEqual(cleanStringArray);
    expect(sanitizeArray(dirtyNestedStringArray)).toEqual(
      cleanNestedStringArray
    );
    expect(sanitizeArray(dirtyObjectArray)).toEqual(cleanObjectArray);
  });
});

describe("Test sanitizeObject", () => {
  test("Test sanitizeObject passes through safe types", () => {
    expect(sanitizeObject({ safeBoolean })).toEqual({ safeBoolean });
    expect(sanitizeObject({ safeNaN })).toEqual({ safeNaN });
    expect(sanitizeObject({ safeNumber })).toEqual({ safeNumber });
    expect(sanitizeObject({ safeNull })).toEqual({ safeNull });
    expect(sanitizeObject({ safeUndefined })).toEqual({ safeUndefined });
  });

  test("Test sanitizeObject passes through empty object, clean object", () => {
    expect(sanitizeObject({})).toEqual({});
    expect(sanitizeObject(cleanObject)).toEqual(cleanObject);
    expect(sanitizeObject(cleanComplexObject)).toEqual(cleanComplexObject);
  });

  test("Test sanitizeObject cleans dirty objects", () => {
    expect(sanitizeObject(dirtyObject)).toEqual(cleanObject);
    expect(sanitizeObject(dirtyComplexObject)).toEqual(cleanComplexObject);
  });
});

describe("Test sanitizeString security", () => {
  test("should strip script tags and their content entirely", () => {
    expect(sanitizeString('<script>alert("xss")</script>')).toEqual("");
    expect(sanitizeString('<script src="evil.js"></script>')).toEqual("");
    expect(
      sanitizeString("<ul><script>evil()</script><li>item</li></ul>")
    ).toEqual("<ul><li>item</li></ul>");
  });

  test("should strip event handlers from allowed tags", () => {
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

  test("should strip javascript:, data:, and vbscript: protocols from href", () => {
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

  test("should allow safe href schemes including protocol-relative", () => {
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

  test("should allow http links", () => {
    expect(sanitizeString('<a href="http://example.com">link</a>')).toEqual(
      '<a href="http://example.com">link</a>'
    );
  });

  test("should strip style attributes from allowed tags", () => {
    expect(
      sanitizeString('<a href="/" style="position:fixed;top:0">link</a>')
    ).toEqual('<a href="/">link</a>');
    expect(sanitizeString('<strong style="color:red">text</strong>')).toEqual(
      "<strong>text</strong>"
    );
  });

  test("should strip disallowed block/container tags and their text content entirely", () => {
    // Deception attack: styled overlay with fake content
    expect(
      sanitizeString('<div style="position:fixed;top:0">fake login</div>')
    ).toEqual("");
    expect(sanitizeString("<span>inline text</span>")).toEqual("");
  });

  test("should strip iframe, object, and embed and their content entirely", () => {
    expect(
      sanitizeString('<iframe src="evil.com">phishing content</iframe>')
    ).toEqual("");
    expect(
      sanitizeString('<object data="evil.swf">fallback text</object>')
    ).toEqual("");
    expect(sanitizeString('<embed src="evil.swf">')).toEqual("");
  });

  test("should strip form elements and their content entirely", () => {
    expect(
      sanitizeString(
        '<form action="https://evil.com"><input name="password"><button>Submit</button></form>'
      )
    ).toEqual("");
  });

  test("should strip SVG and math elements and their content entirely", () => {
    expect(
      sanitizeString('<svg onload="evil()"><script>evil()</script></svg>')
    ).toEqual("");
    expect(sanitizeString("<math><mo>x</mo></math>")).toEqual("");
  });

  test("should strip img tags with dangerous attributes", () => {
    expect(sanitizeString('<img src="x" onerror="evil()">')).toEqual("");
  });

  test("should preserve plain text outside of any tags", () => {
    expect(sanitizeString("plain text with no tags")).toEqual(
      "plain text with no tags"
    );
    expect(sanitizeString("text &amp; more text")).toEqual(
      "text &amp; more text"
    );
  });
});
