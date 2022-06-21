import { useState } from "react";
import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import Measures, { QualifierData } from "measures";
import { useGetMeasures } from "hooks/api";
import { createElement } from "react";
import "index.scss";
import { getPDF } from "libs/api";
import { useParams } from "react-router-dom";

export const ExportAll = () => {
  const { state, coreSetId, year } = useParams();
  const [isLoadingPDF, setIsLoadingPDF] = useState(false);

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

  const makePrinceRequest = async () => {
    const html = document.querySelector("html")!;
    html.querySelector("noscript")?.remove();

    for (let i = 0; i < document.styleSheets.length - 1; i++) {
      if (
        !document.styleSheets[i].href &&
        document.styleSheets[i]?.cssRules[0]?.cssText.includes("--chakra") &&
        document.styleSheets[i]?.cssRules[0]?.cssText.includes(":root")
      ) {
        const chakraVars = document.styleSheets[i];
        document.body.setAttribute(
          "style",
          chakraVars.cssRules[0].cssText.split(/(\{|\})/g)[2]
        );
      }
    }

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
      const pdf = await getPDF({
        body: base64String,
        state,
        coreSet: coreSetId,
        year,
      });

      openPdf(pdf);
    } catch (err) {}
  };

  const { data, isLoading } = useGetMeasures();
  if (isLoading || !data.Items) {
    return <QMR.LoadingWave />;
  }

  const csqMeasure = data?.Items?.find((d: any) => d.measure === "CSQ");
  const regMeasures = data?.Items?.filter((d: any) => d.measure !== "CSQ").sort(
    (a: any, b: any) => a?.measure?.localeCompare(b?.measure)
  );
  const sortedData = [csqMeasure, ...regMeasures];

  return (
    <>
      <CUI.Container maxW={"xs"}>
        <CUI.Button
          disabled={isLoadingPDF}
          isFullWidth={true}
          type="button"
          className="hidden-print-items"
          margin="1"
          isLoading={isLoadingPDF}
          loadingText="Preparing"
          colorScheme="orange"
          variant="solid"
          fontWeight="700"
          fontSize="large"
          onClick={async () => {
            setIsLoadingPDF(true);
            await makePrinceRequest();
            setIsLoadingPDF(false);
          }}
        >
          PRINT PDF
        </CUI.Button>
      </CUI.Container>
      <CUI.UnorderedList
        display={"grid"}
        gridTemplateRows={"1fr"}
        gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr));"
        listStyleType={"none"}
        placeItems={"center"}
      >
        <CUI.Text
          gridColumn={"1 / -1"}
          fontSize={"xl"}
          style={
            { fontWeight: "bold", "--testing": "red" } as React.CSSProperties
          }
          id="top-of-page"
          as="h2"
          my="4"
        >
          Click on one of the measures below to navigate to it.
        </CUI.Text>
        {sortedData?.map((measure: any) => {
          return (
            <CUI.ListItem my="2">
              <CUI.Button as="a" width={"28"} href={`#${measure?.measure}`}>
                {measure?.measure}
              </CUI.Button>
            </CUI.ListItem>
          );
        })}
      </CUI.UnorderedList>
      {sortedData?.map((measure: any) => {
        const Comp =
          measure.measure === "CSQ"
            ? Measures?.[measure.year]?.["Qualifier"]
            : Measures[measure.year][measure.measure];

        const defaultData =
          measure.measure === "CSQ"
            ? QualifierData.find((d) => d.year === measure.year + "")?.data
            : undefined;

        return (
          <QMR.PrintableMeasureWrapper
            measure={createElement(Comp)}
            measureData={measure}
            measureId={measure.measure}
            name={measure.description}
            year={measure.year}
            key={measure.compoundKey}
            defaultData={defaultData}
          />
        );
      })}
    </>
  );
};
