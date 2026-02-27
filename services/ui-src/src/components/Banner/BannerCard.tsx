import { BannerData } from "types";
import { bannerId, checkDateRangeStatus } from "utils";
import { useGetBanner } from "hooks/api";
import { useEffect, useState } from "react";
import { Banner } from "./Banner";

export const BannerCard = () => {
  const [banner, setBanner] = useState<BannerData>();
  const bannerData = useGetBanner(bannerId);

  useEffect(() => {
    if (
      bannerData?.isFetched &&
      checkDateRangeStatus(bannerData.data?.startDate, bannerData.data?.endDate)
    ) {
      setBanner(bannerData.data);
    }
  }, [bannerData]);

  return <Banner bannerData={banner} />;
};
