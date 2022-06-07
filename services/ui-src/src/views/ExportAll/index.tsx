import * as QMR from "components";
import Measures from "measures";
import { useGetMeasures } from "hooks/api";
import { createElement } from "react";
import { getPDF } from "libs/api";
import { useParams } from "react-router-dom";

// type CoreSetType = "A" | "C" | "H";

export const ExportAll = () => {
  const openPdf = (basePdf: string) => {
    let byteCharacters = atob(basePdf);
    let byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);
    let file = new Blob([byteArray], { type: "application/pdf;base64" });
    let fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };

  const { state, coreSetId, year } = useParams();

  const { data, isLoading } = useGetMeasures();
  if (isLoading || !data.Items) {
    return <QMR.LoadingWave />;
  }

  const sortedData = data?.Items?.sort((a: any, b: any) =>
    a?.measure?.localeCompare(b?.measure)
  ).filter((item: any) => item?.measure !== "CSQ");

  return (
    <>
      <button
        type="button"
        onClick={async () => {
          const html = document.querySelector("html")!;
          html.querySelector("noscript")?.remove();

          const htmlString = html
            .innerHTML!.replaceAll(
              '<link href="',
              `<link href="https://${window.location.host}`
            )
            .replaceAll(`’`, `'`)
            .replaceAll(`‘`, `'`)
            .replaceAll(`”`, `"`)
            .replaceAll(`“`, `"`)
            .replaceAll("\u2013", "-")
            .replaceAll("\u2014", "-");

          const base64String = btoa(unescape(encodeURIComponent(htmlString)));

          try {
            const test = await getPDF({
              body: base64String,
              state,
              coreSet: coreSetId,
              year,
            });
            console.log(test);
            openPdf(test);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        Testing
      </button>
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
