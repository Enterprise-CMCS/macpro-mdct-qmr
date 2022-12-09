import { BannerData } from "types";
import { bannerId, checkDateRangeStatus } from "utils";
import { useGetBanner } from "hooks/api";
import { useEffect, useState } from "react";
import { Banner } from "./Banner";

export const BannerCard = () => {
  const [banner, setBanner] = useState<BannerData>();

  const getMutation = useGetBanner();
  const getBanner = () => {
    getMutation.mutate(bannerId, {
      onSuccess: async (response) => {
        if (/20\d/.test(response?.status)) {
          const bannerData = response.body?.Item as BannerData;
          if (checkDateRangeStatus(bannerData?.startDate, bannerData?.endDate))
            setBanner(bannerData);
        } else {
          //DO NOTHING
        }
      },
    });
  };
  useEffect(() => {
    getBanner();
  }, []);

  return <Banner bannerData={banner} />;
};
