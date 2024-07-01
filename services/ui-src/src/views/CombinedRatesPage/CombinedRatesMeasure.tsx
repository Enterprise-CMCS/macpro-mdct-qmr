import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import { DataSourceInformationBanner } from "shared/commonQuestions/DataSouceInformationBanner/DataSourceInformationBanner";
import { useGetRate } from "hooks/api/useGetRate";
import { CombinedRateNDR } from "shared/commonQuestions/CombinedRateNDR/CombinedRateNDR";

interface Props {
  year: string;
  measureId: string;
  measureName: string;
}

const CoreSetSuffixRecord: Record<string, string> = {
  AD: "ACS",
  CH: "CCS",
};

export const CombinedRatesMeasure = ({
  year,
  measureName,
  measureId: measure,
}: Props) => {
  const { state } = useParams();
  const typeSuffix = measure?.slice(-2); // used to determine if measure is adult or child type
  const combinedCoreSetAbbr = CoreSetSuffixRecord[typeSuffix] ?? "";

  const { data } = useGetRate({
    measure,
    state: state!,
    coreSet: combinedCoreSetAbbr,
    year,
  });
  const item = data?.Item;
  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}/combined-rates`, name: `FFY ${year}` },
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
            href={`/${state}/${year}/${combinedCoreSetAbbr}C/${measure}`}
            aria-label="Link to CHIP measure"
            target="_blank"
            color="blue.600"
          >
            CHIP - {measure} - {measureName}
          </CUI.Link>
        </CUI.ListItem>
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
      </CUI.UnorderedList>
      <DataSourceInformationBanner data={item?.data!} />
      <CombinedRateNDR json={data?.Item} />
    </QMR.StateLayout>
  );
};
