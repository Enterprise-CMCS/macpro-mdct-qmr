import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetRate } from "hooks/api";
import { LoadingWrapper } from "components";
import { DataSourceInformationBanner } from "shared/commonQuestions/DataSouceInformationBanner/DataSourceInformationBanner";
import { CombinedRateNDR } from "shared/commonQuestions/CombinedRateNDR/CombinedRateNDR";
import { AdditionalCombinedValues } from "shared/commonQuestions/AdditionalCombinedValues/AdditionalCombinedValues";
import { featuresByYear } from "utils/featuresByYear";

interface Props {
  year: string;
  measureId: string;
  measureName: string;
}

const CoreSetSuffixRecord: Record<string, string> = {
  AD: "ACS",
  CH: "CCS",
};

const getPathToCombinedRatesTab = (
  state: string,
  year: string,
  coreSetAbbr: string
) => {
  if (coreSetAbbr === "ACS") {
    return `/${state}/${year}/combined-rates?tab=adult`;
  } else if (coreSetAbbr === "CCS") {
    return `/${state}/${year}/combined-rates?tab=child`;
  } else {
    return `/${state}/${year}/combined-rates`;
  }
};

export const CombinedRatesMeasure = ({
  year,
  measureName,
  measureId: measure,
}: Props) => {
  const { state } = useParams();
  const typeSuffix = measure?.slice(-2); // used to determine if measure is adult or child type
  const combinedCoreSetAbbr = CoreSetSuffixRecord[typeSuffix] ?? "";

  const queryResult = useGetRate({
    measure,
    state: state!,
    coreSet: combinedCoreSetAbbr,
    year,
  });
  const combinedRateData = queryResult.data;

  // In 2025 and forward, ECDS is no longer tracked
  if (Number(year) >= 2025) {
    delete combinedRateData?.DataSources.CHIP.hasECDSDataSource;
    delete combinedRateData?.DataSources.Medicaid.hasECDSDataSource;
  }

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        {
          path: getPathToCombinedRatesTab(state!, year, combinedCoreSetAbbr),
          name: `${featuresByYear.displayFFYLanguage ? "FFY" : ""} ${year}`,
        },
        {
          path: `/${state}/${year}`,
          name: `${measure} Combined Rates`,
        },
      ]}
    >
      <CUI.Heading fontSize="xl" mt="2" mb="2">
        {measure} - {measureName}
      </CUI.Heading>
      <CUI.Heading fontSize="md" mt="4">
        About the Combined Medicaid and CHIP Rate
      </CUI.Heading>
      <CUI.Text mt="4">
        This page displays data reported for this measure in the Medicaid and
        Separate CHIP reports. The QMR system automatically calculates a
        combined Medicaid and CHIP rate based on these data, which is displayed
        in the “Combined Rate” column below. Please note, the combined Medicaid
        and CHIP rates will change if states update the individual Medicaid or
        Separate CHIP reports.
      </CUI.Text>
      <CUI.Text mt="4">
        This page is not editable. If your state would like to make edits to the
        data reported in the individual Medicaid or Separate CHIP reports,
        please click on the links to these reports below. The report will open
        in a new tab. Save and complete your measure updates and return to the
        combined rates page to view the updated combined Medicaid and CHIP rate.{" "}
      </CUI.Text>
      <CUI.Text mt="4">
        For more information on how the combined Medicaid and CHIP rates are
        calculated, please see{" "}
        <CUI.Link
          href={`https://www.medicaid.gov/quality-of-care/downloads/QMRCoreSetCombinedRates.pdf`}
          aria-label="Link to Reporting Medicaid and Separate CHIP Data"
          target="_blank"
          color="blue.600"
        >
          Reporting Medicaid and Separate CHIP Data in the Quality Measure
          Reporting System for the Child and Adult Core Sets.{" "}
        </CUI.Link>
      </CUI.Text>
      <CUI.Heading size="sm" as="h2" fontWeight="400" mt="4">
        Measures used to calculate combined rates:
      </CUI.Heading>
      <CUI.UnorderedList m="5" ml="10">
        <CUI.ListItem>
          <CUI.Link
            href={`/${state}/${year}/${combinedCoreSetAbbr}M/${measure}`}
            aria-label="Link to Medicaid measure"
            target="_blank"
            color="blue.600"
          >
            Medicaid - {measure} - {measureName}
          </CUI.Link>
        </CUI.ListItem>
        <CUI.ListItem>
          <CUI.Link
            href={`/${state}/${year}/${combinedCoreSetAbbr}C/${measure}`}
            aria-label="Link to CHIP measure"
            target="_blank"
            color="blue.600"
          >
            Separate CHIP - {measure} - {measureName}
          </CUI.Link>
        </CUI.ListItem>
      </CUI.UnorderedList>
      <LoadingWrapper isLoaded={!queryResult.isLoading}>
        <DataSourceInformationBanner payload={combinedRateData} />
        {combinedRateData && (
          <>
            <CombinedRateNDR
              payload={combinedRateData}
              year={year}
              measure={measure}
            />
            <AdditionalCombinedValues
              payload={combinedRateData}
              year={year}
              measure={measure}
            />
          </>
        )}
      </LoadingWrapper>
    </QMR.StateLayout>
  );
};
