import { useLocation, useParams, Params } from "react-router-dom";

export const useMeasureId = () => {
  const params: Readonly<Params<"coreSetId">> = useParams();
  const location = useLocation();
  const pathItems = location.pathname.split("/");
  const measureId =
    pathItems[pathItems.indexOf(params.coreSetId as string) + 1];
  return measureId;
};
