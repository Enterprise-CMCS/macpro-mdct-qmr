import { Alert } from "@cmsgov/design-system";
import { BannerData } from "types";
import { parseLabelToHTML } from "utils";
import DOMPurify from "dompurify";

const domPurifyBannerConfig = {
  // Only these tags will be allowed through
  ALLOWED_TAGS: ["ul", "ol", "li", "a", "#text", "strong", "b", "em"],
  // On those tags, only these attributes are allowed
  ALLOWED_ATTR: ["href", "alt"],
  // If a tag is removed, so will all its child elements & text
  KEEP_CONTENT: false,
};

export const Banner = ({ bannerData, ...props }: Props) => {
  return (
    <>
      {bannerData && (
        <Alert heading={bannerData.title} {...props}>
          <span className="ds-c-alert__text">
            {parseLabelToHTML(
              DOMPurify.sanitize(bannerData.description, domPurifyBannerConfig)
            )}
          </span>
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
