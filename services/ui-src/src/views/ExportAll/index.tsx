import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import Measures from "measures";
import { useGetMeasures } from "hooks/api";
import { createElement } from "react";
import "index.scss";
import { getPDF } from "libs/api";
import { useParams } from "react-router-dom";

export const ExportAll = () => {
  const { state, coreSetId, year } = useParams();

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
    document.body.setAttribute(
      "style",
      document.querySelectorAll("style")[2].innerHTML.split(/{|}/g)[1]
    );

    const htmlString = html
      .innerHTML!.replaceAll(
        '<link href="',
        `<link href="https://${window.location.host}`
      )
      .replaceAll(`’`, `'`)
      .replaceAll(`‘`, `'`)
      .replaceAll(`”`, `"`)
      .replaceAll(`“`, `"`)
      .replaceAll(`chakra-space-0\\.5`, `helloworld`)
      .replaceAll("\u2013", "-")
      .replaceAll("\u2014", "-");
    console.log(htmlString);

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
  };

  const { data, isLoading } = useGetMeasures();
  if (isLoading || !data.Items) {
    return <QMR.LoadingWave />;
  }

  const sortedData = data?.Items?.sort((a: any, b: any) =>
    a?.measure?.localeCompare(b?.measure)
  ).filter((item: any) => item?.measure !== "CSQ");

  return (
    <>
      <CUI.Container maxW={"xs"}>
        <QMR.ContainedButton
          buttonProps={{
            isFullWidth: true,
            type: "button",
            className: "hidden-print-items",
            background: "blue.500",
            margin: "1",
          }}
          onClick={() => window.print()}
          buttonText={"Print"}
        />
        <QMR.ContainedButton
          buttonProps={{
            isFullWidth: true,
            type: "button",
            className: "hidden-print-items",
            background: "blue.500",
            margin: "1",
          }}
          onClick={async () => await makePrinceRequest()}
          buttonText={"Print 508"}
        />
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
