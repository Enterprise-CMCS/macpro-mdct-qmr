import { BannerData } from "types";
import { bannerId, checkDateRangeStatus } from "utils";
import { useGetBanner } from "hooks/api";
import { useEffect, useState } from "react";
import { Banner } from "./Banner";

export const BannerCard = () => {
  const [banner, setBanner] = useState<BannerData>();

  const { data } = useGetBanner(bannerId);
  const getBanner = () => {
    if (data) {
      const bannerData = data.body?.Item as unknown as BannerData;
      if (checkDateRangeStatus(bannerData?.startDate, bannerData?.endDate))
        setBanner(bannerData);
    }
  };
  useEffect(() => {
    getBanner();
  }, []);

  return <Banner bannerData={banner} />;
};
