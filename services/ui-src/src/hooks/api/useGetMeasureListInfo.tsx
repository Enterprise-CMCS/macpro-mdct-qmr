import { useQuery } from "react-query";
import { getFilteredMeasureListInfo, getMeasureListInfo } from "libs/api";

const getList = async () => {
  const test = await getMeasureListInfo({});
  return test;
};

const getFilteredList = async () => {
  const test = await getFilteredMeasureListInfo({
    year: 2021,
    coresetType: "A",
    state: "MA",
  });
  console.log({ test });
  return test;
};

export const useGetMeasureListInfo = (isPrintable: boolean) => {
  return useQuery(
    ["measureListInfo"],
    isPrintable ? () => getFilteredList() : () => getList()
  );
};

export const useGetFilteredMeasureListInfo = () => {
  return useQuery(["measureListInfo"], () => getFilteredList());
};
