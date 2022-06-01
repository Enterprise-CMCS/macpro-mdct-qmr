import * as QMR from "components";
import { useGetMeasures } from "hooks/api";

// type CoreSetType = "A" | "C" | "H";

export const ExportAll = () => {
  const { data, isLoading } = useGetMeasures();
  if (isLoading || !data.Items) {
    return <QMR.LoadingWave />;
  }

  const sortedData = data?.Items?.sort((a: any, b: any) =>
    a?.measure?.localeCompare(b?.measure)
  );
  console.log(sortedData);
  return <></>;
};
