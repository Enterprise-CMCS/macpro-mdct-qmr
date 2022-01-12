import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

interface Props {
  measureTitle: string;
  dateCompleted: string;
  isReportingOnMeasureYear: boolean;
  performanceMeasureText: string;
  performanceMeasureSubtext?: string;
  year: string;
}

export const AutocompletedMeasureTemplate = ({
  measureTitle,
  dateCompleted,
  performanceMeasureText,
  performanceMeasureSubtext,
  isReportingOnMeasureYear,
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
            variant: "outline",
            colorScheme: "blue",
          }}
          icon="print"
          buttonText="Print"
          onClick={() => window.print()}
        />
      </CUI.HStack>

      <CUI.Stack spacing={12}>
        <CUI.Box>
          <CUI.Heading size="sm" fontWeight="700">
            Measure Title
          </CUI.Heading>
          <CUI.Text>{measureTitle}</CUI.Text>
        </CUI.Box>

        <CUI.Box>
          <CUI.Heading size="sm" fontWeight="700">
            Date Completed
          </CUI.Heading>
          <CUI.Text>Auto-completed on {dateCompleted}</CUI.Text>
        </CUI.Box>

        <CUI.Box>
          <CUI.Heading
            size="sm"
            fontWeight="700"
          >{`Reporting on Measure FFY ${year}`}</CUI.Heading>
          <CUI.Text>{isReportingOnMeasureYear ? "Yes" : "No"}</CUI.Text>
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

        <Link to={`/${state}/${year}/${coreSetId}`}>
          <QMR.ContainedButton
            buttonProps={{ colorScheme: "blue", variant: "outline" }}
            buttonText="Back to Core Set Measures"
          />
        </Link>
      </CUI.Stack>
    </>
  );
};
