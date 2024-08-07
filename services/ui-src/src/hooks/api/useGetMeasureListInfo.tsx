import { useQuery } from "@tanstack/react-query";
import { getMeasureListInfo } from "libs/api";

const getList = async () => {
  return await getMeasureListInfo({});
};

export const useGetMeasureListInfo = () => {
  return useQuery({
    queryKey: ["measureListInfo"],
    queryFn: () => getList(),
    refetchOnWindowFocus: false,
  });
};
