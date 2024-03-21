import { useState } from "react";
import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import Measures, { QualifierData } from "measures";
import { useGetMeasures } from "hooks/api";
import { createElement } from "react";
import "index.scss";
import { useParams } from "react-router-dom";
import { usePrinceRequest, getSpaName } from "./util";

export const ExportAll = () => {
  const { state, coreSetId, year } = useParams();
  const [isLoadingPDF, setIsLoadingPDF] = useState(false);
  const makePrinceRequest = usePrinceRequest();
  const spaName = getSpaName({ state, year, coreSetId });

  const { data, isLoading } = useGetMeasures();
  if (isLoading || !data.Items) {
    return <QMR.LoadingWave />;
  }

  const csqMeasure = data?.Items?.find((d: any) => d.measure === "CSQ");
  const regMeasures: any[] = data?.Items?.filter(
    (d: any) => d.measure !== "CSQ"
  )
    // filter out non-created State Specific measures
    ?.filter((m: any) => !/SS-\d-HH/g.test(m.measure) || m?.userCreated)
    .sort((a: any, b: any) => a?.measure?.localeCompare(b?.measure));

  let sortedData = [csqMeasure, ...regMeasures];
  if (coreSetId === "ACS") {
    const filter = ["HBD-AD", "MSC-AD", "NCIIDD-AD", "PPC2-AD"];
    const filtered = regMeasures.filter(
      (item) => !filter.includes(item.measure)
    );
    sortedData = [csqMeasure, ...filtered];
  }

  return (
    <>
      <style key="printerPreviewStyles">
        {`.disabled-print-preview-items { visibility: hidden !important; display: none !important; }\n` +
          `select option { display: none }` +
          `select option[selected] { display: table-row; }\n`}
      </style>
      <CUI.Container maxW={"xs"} key="printPageButtonWrapper">
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
            await makePrinceRequest({ state, year, coreSetId });
            setIsLoadingPDF(false);
          }}
        >
          PRINT PDF
        </CUI.Button>
      </CUI.Container>
      <CUI.Center key="buttonGridLabel">
        <CUI.Text
          gridColumn={"1 / -1"}
          fontSize={"xl"}
          id="top-of-page"
          as="h1"
          my="6"
          textAlign={"center"}
          fontWeight="bold"
        >
          Click on one of the measures below to navigate to it.
        </CUI.Text>
      </CUI.Center>
      <CUI.Center key="buttonGridWrapper" mb="1rem">
        <CUI.SimpleGrid
          columns={{ sm: 2, md: 4, lg: 6, xl: 8 }}
          spacingX={5}
          spacingY={10}
        >
          {sortedData?.map((measure: any) => {
            return (
              <CUI.Button
                as="a"
                width={"28"}
                href={`#${measure?.measure}`}
                key={`buttonLink.${measure?.measure}`}
              >
                {measure?.measure}
              </CUI.Button>
            );
          })}
        </CUI.SimpleGrid>
      </CUI.Center>
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
          <CUI.Box
            key={`measure-${measure.measure}-wrapper`}
            className="prince-measure-wrapper-box"
          >
            <QMR.PrintableMeasureWrapper
              measure={createElement(Comp)}
              measureData={measure}
              measureId={measure.measure}
              name={measure.description}
              year={measure.year}
              key={measure.compoundKey}
              defaultData={defaultData}
              spaName={spaName}
            />
            <CUI.Center
              key={`returnButton.${measure.measure}`}
              mt="2"
              className="prince-top-link"
            >
              <a
                data-cy="surfaceLinkTag"
                href="#top-of-page"
                className="prince-top-link"
              >
                Back to top
              </a>
            </CUI.Center>
          </CUI.Box>
        );
      })}
    </>
  );
};
