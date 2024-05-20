import { Alert } from "@cmsgov/design-system";
import { BannerData } from "types";

export const Banner = ({ bannerData, ...props }: Props) => {
  return (
    <>
      {bannerData && (
        <Alert heading={bannerData.title} {...props}>
          <p className="ds-c-alert__text">{bannerData.description}</p>
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
