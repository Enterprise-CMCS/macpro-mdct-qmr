import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import Measures from "measures";
import { useGetMeasures } from "hooks/api";
import { createElement } from "react";
import "index.scss";

export const ExportAll = () => {
  // This is for PrinceXML. Uncomment once figured out how to use it.
  // const openPdf = (basePdf: string) => {
  //   let byteCharacters = atob(basePdf);
  //   let byteNumbers = new Array(byteCharacters.length);
  //   for (let i = 0; i < byteCharacters.length; i++) {
  //     byteNumbers[i] = byteCharacters.charCodeAt(i);
  //   }
  //   let byteArray = new Uint8Array(byteNumbers);
  //   let file = new Blob([byteArray], { type: "application/pdf;base64" });
  //   let fileURL = URL.createObjectURL(file);
  //   window.open(fileURL);
  // };

  const { data, isLoading } = useGetMeasures();
  if (isLoading || !data.Items) {
    return <QMR.LoadingWave />;
  }

  const sortedData = data?.Items?.sort((a: any, b: any) =>
    a?.measure?.localeCompare(b?.measure)
  ).filter((item: any) => item?.measure !== "CSQ");

  return (
    <>
      <CUI.Button
        type="button"
        onClick={() => window.print()}
        className="hidden-print-items"
      >
        Print
      </CUI.Button>
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
