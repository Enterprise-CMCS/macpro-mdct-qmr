import { useQuery } from "react-query";
import { getMeasureListInfo } from "libs/api";

const getList = async () => {
  return await getMeasureListInfo({});
};

export const useGetMeasureListInfo = () => {
  return useQuery(["measureListInfo"], () => getList());
};
