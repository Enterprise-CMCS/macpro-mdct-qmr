import { Notification } from "components/Notification";
import { BannerData } from "types";

export const Banner = ({ bannerData, ...props }: Props) => {
  return (
    <>
      {bannerData && (
        <Notification
          alertTitle={bannerData.title}
          alertDescription={bannerData.description}
          extendedAlertList={bannerData.link ? [bannerData.link] : undefined}
          alertStatus="info"
          alertProps={props}
        />
      )}
    </>
  );
};

interface Props {
  bannerData: BannerData | undefined;
  [key: string]: any;
}
