import sanitizeHtml, { IOptions as SanitizeHtmlOptions } from "sanitize-html";

/*
 * sanitize-html prevents XSS and "deception" attacks without needing a DOM
 * environment (no jsdom required). With these settings, only the listed tags
 * and attributes are allowed through. If an attacker could put <div style="...">
 * into the site's admin banner, they could make give the banner any appearance,
 * overlaid anywhere on the page. For example, a fake "session expired" modal
 * with a malicious link. Thus, this very strict DOMPurify config.
 */
const allowedTags = ["ul", "ol", "li", "a", "strong", "b", "em"];

const sanitizeOptions: SanitizeHtmlOptions = {
  allowedTags,
  allowedAttributes: {
    a: ["href", "alt"],
  },
  allowedSchemesByTag: {
    a: ["https", "mailto"],
  },
  allowProtocolRelative: true,
  // Strip the text content of disallowed tags entirely.
  // Matches DOMPurify's `KEEP_CONTENT: false` behavior.
  nonTextTags: [
    "style",
    "script",
    "noscript",
    "textarea",
    "iframe",
    "object",
    "embed",
    "form",
    "svg",
    "math",
    "template",
    "div",
    "span",
  ],
  disallowedTagsMode: "discard",
  transformTags: {
    a: (tagName, attribs) => {
      // replace http with https for security
      if (attribs.href?.startsWith("http:")) {
        attribs = { ...attribs, href: attribs.href.replace("http:", "https:") };
      }
      return { tagName, attribs };
    },
  },
};

// sanitize string
export const sanitizeString = (string: string): string => {
  return sanitizeHtml(string, sanitizeOptions);
};

// iterates over array items, sanitizing items recursively
export const sanitizeArray = (array: unknown[]): unknown[] =>
  array.map((entry: unknown) => sanitizeEntry(entry));

// iterates over object key-value pairs, sanitizing values recursively
export const sanitizeObject = (object: { [key: string]: unknown }) => {
  if (object) {
    const entries = Object.entries(object);
    const sanitizedEntries = entries.map((entry: [string, unknown]) => {
      const [key, value] = entry;
      return [key, sanitizeEntry(value)];
    });
    return Object.fromEntries(sanitizedEntries);
  }
};

const sanitizerMap: any = {
  string: sanitizeString,
  array: sanitizeArray,
  object: sanitizeObject,
};

// return sanitized entry, or if safe type, return entry
const sanitizeEntry = (entry: unknown) => {
  const entryType = Array.isArray(entry) ? "array" : typeof entry;
  const sanitizer = sanitizerMap[entryType];
  return sanitizer?.(entry) || entry;
};
