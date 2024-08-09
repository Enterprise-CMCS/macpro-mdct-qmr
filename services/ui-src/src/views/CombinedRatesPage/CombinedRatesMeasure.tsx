import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { DataSourceInformationBanner } from "shared/commonQuestions/DataSouceInformationBanner/DataSourceInformationBanner";
import { useGetRate } from "hooks/api";
import { CombinedRateNDR } from "shared/commonQuestions/CombinedRateNDR/CombinedRateNDR";
import { LoadingWrapper } from "components";

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

  const { data: combinedRateData } = useGetRate({
    measure,
    state: state!,
    coreSet: combinedCoreSetAbbr,
    year,
  });
  return (
    <QMR.StateLayout
      breadcrumbItems={[
        {
          path: getPathToCombinedRatesTab(state!, year, combinedCoreSetAbbr),
          name: `FFY ${year}`,
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
      <CUI.Text> TO-DO: replace placeholder text</CUI.Text>
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
      <LoadingWrapper isLoaded={!!combinedRateData}>
        {combinedRateData && (
          <>
            <DataSourceInformationBanner payload={combinedRateData} />
            <CombinedRateNDR
              payload={combinedRateData}
              year={year}
              measure={measure}
            />
            <AdditionalValuesTable payload={combinedRateData} />
          </>
        )}
      </LoadingWrapper>
    </QMR.StateLayout>
  );
};
