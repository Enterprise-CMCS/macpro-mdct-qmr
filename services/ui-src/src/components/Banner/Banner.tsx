import { Alert } from "@cmsgov/design-system";
import sanitizeHtml, { IOptions as SanitizeHtmlOptions } from "sanitize-html";
import { BannerData } from "types";
import { parseLabelToHTML } from "utils";

/**
 * Should match with the configuration at services/app-api/utils/sanitize/sanitize.ts
 */
const sanitizeOptions: SanitizeHtmlOptions = {
  allowedTags: ["ul", "ol", "li", "a", "#text", "strong", "b", "em"],
  allowedAttributes: {
    a: ["href", "alt"],
  },
  allowedSchemesByTag: {
    a: ["https", "http", "mailto"],
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
};

export const Banner = ({ bannerData, ...props }: Props) => {
  return (
    <>
      {bannerData && (
        <Alert heading={bannerData.title} {...props}>
          <div className="ds-c-alert__text">
            {parseLabelToHTML(
              sanitizeHtml(bannerData.description, sanitizeOptions)
            )}
          </div>
          {bannerData.link && (
            <p>
              <a href={encodeURI(bannerData.link)}>{bannerData.link}</a>
            </p>
          )}
        </Alert>
      )}
    </>
  );
};

interface Props {
  bannerData: BannerData | undefined;
  [key: string]: any;
}
