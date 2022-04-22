import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

interface Props {
  measureTitle: string;
  performanceMeasureText: string;
  performanceMeasureSubtext?: string;
  year: string;
}

export const AutocompletedMeasureTemplate = ({
  measureTitle,
  performanceMeasureText,
  performanceMeasureSubtext,
  year,
}: Props) => {
  const { state, coreSetId } = useParams();

  return (
    <>
      <CUI.HStack justifyContent="space-between">
        <CUI.Heading fontSize="xl" fontWeight="700">
          Measure Details
        </CUI.Heading>
        <QMR.ContainedButton
          buttonProps={{
            paddingX: "12",
            colorScheme: "blue",
          }}
          zIndex={3}
          icon="print"
          buttonText="Print"
          onClick={() => window.print()}
        />
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

          {performanceMeasureSubtext && (
            <CUI.Text>{performanceMeasureSubtext}</CUI.Text>
          )}
          <CUI.Text fontWeight="700">
            {`States are not asked to report data for this measure for FFY ${year} Core Set
            reporting.`}
          </CUI.Text>
        </CUI.Stack>

        <Link
          className="hidden-print-items"
          to={`/${state}/${year}/${coreSetId}`}
        >
          <QMR.ContainedButton
            buttonProps={{ colorScheme: "blue" }}
            buttonText="Back to Core Set Measures"
            zIndex={3}
          />
        </Link>
      </CUI.Stack>
    </>
  );
};
