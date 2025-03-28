import { useMutation, useQuery } from "@tanstack/react-query";
import { AdminBannerData } from "types";
import { getBanner, writeBanner, deleteBanner } from "libs/api";

export const useDeleteBanner = () => {
  return useMutation({
    mutationFn: (bannerKey: string) => deleteBanner(bannerKey),
  });
};

export const useWriteBanner = () => {
  return useMutation({
    mutationFn: (bannerData: AdminBannerData) => writeBanner(bannerData),
  });
};

const _getBanner = async (bannerKey: string) => {
  const banner = await getBanner(bannerKey);
  return await banner?.Item;
};

export const useGetBanner = (bannerKey: string) => {
  return useQuery({
    queryKey: [bannerKey],
    queryFn: () => _getBanner(bannerKey),
  });
};
