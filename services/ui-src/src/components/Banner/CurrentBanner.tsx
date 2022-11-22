import { useEffect, useState } from "react";
import { useGetBanner } from "hooks/api";
import { BannerData } from "types";
import { bannerId } from "utils";
import { Banner } from "./Banner";

export const CurrentBanner = () => {
  const [banner, setBanner] = useState<BannerData>();
  const mutation = useGetBanner();

  const getBanner = () => {
    mutation.mutate(bannerId, {
      onSuccess: async (bannerData) => {
        setBanner(bannerData as BannerData);
      },
      onError: (error) => {
        console.error("TODO IMPROVE ERROR HANDLING", error);
      },
    });
  };

  useEffect(() => {
    getBanner();
  }, []);

  return <Banner bannerData={banner} />;
};
