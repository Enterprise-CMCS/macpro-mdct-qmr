import { useMutation } from "react-query";
import { AdminBannerData } from "types";
import { getBanner, writeBanner, deleteBanner } from "libs/api";

export const useDeleteBanner = () => {
  return useMutation((bannerKey: string) => deleteBanner(bannerKey));
};

export const useWriteBanner = () => {
  return useMutation((bannerData: AdminBannerData) => writeBanner(bannerData));
};

export const useGetBanner = () => {
  return useMutation((bannerKey: string) => getBanner(bannerKey));
};
