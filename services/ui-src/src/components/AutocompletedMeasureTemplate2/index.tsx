import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { featuresByYear } from "utils/featuresByYear";
import * as MeasureData from "labels/MeasureDatas";

export const AutocompletedMeasureTemplate2 = ({
  name,
  year,
  measureId,
}: QMR.MeasureWrapperProps) => {
  const { state, coreSetId } = useParams();
  const navigate = useNavigate();

  const measure = {
    ...MeasureData[`MeasureData${year}` as keyof typeof MeasureData],
  }.measureTemplateData[measureId];

  const measureTitle = `${measureId} - ${name}`;

  const {
    performanceMeasureSubtext,
    performanceMeasureText,
    performanceMeasureList,
  } = measure.data;

  const subText: string[] | undefined =
    typeof performanceMeasureSubtext === "string"
      ? [performanceMeasureSubtext]
      : performanceMeasureSubtext;

  return (
    <>
      <CUI.HStack justifyContent="space-between">
        <CUI.Heading fontSize="xl" fontWeight="700">
          Measure Details
        </CUI.Heading>
      </CUI.HStack>
      <CUI.Stack spacing={2}>
        <CUI.Box>
          <CUI.Heading size="sm" fontWeight="700">
            Measure Title
          </CUI.Heading>
          <CUI.Text>{measureTitle}</CUI.Text>
        </CUI.Box>

        <CUI.Stack spacing={6}>
          <CUI.Box>
            <CUI.Heading size="sm" fontWeight="700">
              Performance Measure
            </CUI.Heading>
            <CUI.Text>{performanceMeasureText}</CUI.Text>
          </CUI.Box>
          {performanceMeasureList && (
            <CUI.Box>
              <CUI.UnorderedList ml="10">
                {performanceMeasureList.map((item: string, idx: number) => {
                  return (
                    <CUI.ListItem key={`performanceMeasureListItem.${idx}`}>
                      <CUI.Text>{item}</CUI.Text>
                    </CUI.ListItem>
                  );
                })}
              </CUI.UnorderedList>
            </CUI.Box>
          )}
          {subText &&
            subText.map((text, idx) => {
              return <CUI.Text key={`subText.${idx}`}>{text}</CUI.Text>;
            })}
          <CUI.Text fontWeight="700">
            {`States are not asked to report data for this measure for ${
              featuresByYear.displayFFYLanguage ? "FFY" : ""
            } ${year} Core Set reporting.`}
          </CUI.Text>
        </CUI.Stack>
        <CUI.Button
          href="#"
          onClick={() => navigate(`/${state}/${year}/${coreSetId}`)}
          variant={"outline-primary"}
          zIndex={3}
          fontSize={"1.2rem"}
          as={CUI.Link}
        >
          Back To Core Set Measures
        </CUI.Button>
      </CUI.Stack>
    </>
  );
};
