import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { featuresByYear } from "utils/featuresByYear";

interface Props {
  measureTitle: string;
  performanceMeasureText: string;
  performanceMeasureList?: string[];
  performanceMeasureSubtext?: string | string[];
  year: string;
}

export const AutocompletedMeasureTemplate = ({
  measureTitle,
  performanceMeasureText,
  performanceMeasureList,
  performanceMeasureSubtext,
  year,
}: Props) => {
  const { state, coreSetId } = useParams();
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
                {performanceMeasureList.map((item, idx) => {
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

        <Link
          className="hidden-print-items"
          to={`/${state}/${year}/${coreSetId}`}
          aria-label="Return to Core Set Measures"
        >
          <QMR.ContainedButton
            buttonProps={{
              colorScheme: "blue",
              className: "hidden-print-items disabled-print-preview-items",
              variant: "outline",
              color: "blue.500",
            }}
            buttonText="Back to Core Set Measures"
            zIndex={3}
          />
        </Link>
      </CUI.Stack>
    </>
  );
};
