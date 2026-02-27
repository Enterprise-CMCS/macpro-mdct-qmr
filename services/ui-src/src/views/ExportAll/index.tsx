import { useState, createElement } from "react";
import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import Measures, { QualifierData } from "measures";
import { useGetMeasures } from "hooks/api";
import "./../../styles/index.scss";
import { useParams } from "react-router-dom";
import { getSpaName, generatePDF } from "./util";

export const ExportAll = () => {
  const { state, coreSetId, year } = useParams();
  const [isLoadingPDF, setIsLoadingPDF] = useState(false);
  const spaName = getSpaName({ state, year, coreSetId });

  const { data, isLoading } = useGetMeasures();
  if (isLoading || !data.Items) {
    return <QMR.LoadingWave />;
  }

  const csqMeasure = data?.Items?.find((d: any) => d.measure === "CSQ");
  const regMeasures = data?.Items?.filter((d: any) => d.measure !== "CSQ")
    // filter out non-created State Specific measures
    ?.filter((m: any) => !/SS-\d-HH/g.test(m.measure) || m?.userCreated)
    .toSorted((a: any, b: any) => a?.measure?.localeCompare(b?.measure));
  const sortedData = [csqMeasure, ...regMeasures];

  //build the data to render the measures
  const measures = sortedData
    .map((data) => {
      const defaultData =
        data.measure === "CSQ"
          ? QualifierData.find((d) => d.year === data.year + "")?.data
          : undefined;
      const Comp =
        data.measure === "CSQ"
          ? Measures?.[data.year]?.["Qualifier"]
          : Measures[data.year][data.measure];
      return { data: data, comp: Comp, defaultData: defaultData };
    })
    .filter((measure) => {
      //log any measure that is unrenderable, this could indicate unclean data in the database
      if (!measure.comp)
        console.error(`Measure does not exist: ${measure.data.measure}`);
      return measure.comp;
    });

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
          width="full"
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
            await generatePDF(state!, year!, coreSetId!);
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
          columns={{ base: 2, sm: 3, md: 4, lg: 6, xl: 8 }}
          spacingX={5}
          spacingY={10}
        >
          {measures?.map((measure: any) => {
            return (
              <CUI.Button
                as="a"
                width={"28"}
                href={`#${measure?.data.measure}`}
                key={`buttonLink.${measure?.data.measure}`}
              >
                {measure?.data.measure}
              </CUI.Button>
            );
          })}
        </CUI.SimpleGrid>
      </CUI.Center>
      {measures?.map((measure: any) => {
        return (
          <CUI.Box
            key={`measure-${measure.data.measure}-wrapper`}
            className="prince-measure-wrapper-box"
          >
            <QMR.PrintableMeasureWrapper
              measure={createElement(measure.comp)}
              measureData={measure.data}
              measureId={measure.data.measure}
              name={measure.data.description}
              year={measure.data.year}
              key={measure.data.compoundKey}
              defaultData={measure.defaultData}
              spaName={spaName}
            />
            <CUI.Center
              key={`returnButton.${measure.data.measure}`}
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
