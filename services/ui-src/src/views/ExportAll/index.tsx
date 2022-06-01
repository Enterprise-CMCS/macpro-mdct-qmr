import * as QMR from "components";
import Measures from "measures";
import { useGetMeasures } from "hooks/api";
import { createElement } from "react";

// type CoreSetType = "A" | "C" | "H";

export const ExportAll = () => {
  const { data, isLoading } = useGetMeasures();
  if (isLoading || !data.Items) {
    return <QMR.LoadingWave />;
  }

  const sortedData = data?.Items?.sort((a: any, b: any) =>
    a?.measure?.localeCompare(b?.measure)
  ).filter((item: any) => item?.measure !== "CSQ");

  return (
    <>
      {sortedData?.map((measure: any) => {
        const Comp = Measures[measure.year][measure.measure];

        return (
          <QMR.PrintableMeasureWrapper
            measure={createElement(Comp)}
            measureData={measure}
            measureId={measure.measure}
            name={measure.description}
            year={measure.year}
            key={measure.compoundKey}
          />
        );
      })}
    </>
  );
};
