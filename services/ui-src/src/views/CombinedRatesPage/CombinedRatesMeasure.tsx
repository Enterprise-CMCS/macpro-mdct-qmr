import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { DataSourceInformationBanner } from "shared/commonQuestions/DataSouceInformationBanner/DataSourceInformationBanner";

interface Props {
  year: string;
  measureId: string;
  measureName: string;
}

export const CombinedRatesMeasure = ({
  year,
  measureName,
  measureId: measure,
}: Props) => {
  const { state } = useParams();
  const typeSuffix = measure?.slice(-2); // used to determine if measure is adult or child type

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
      <CUI.Heading size="sm" as="body" fontWeight="400" mt="4">
        TO-DO: replace placeholder text
      </CUI.Heading>
      <CUI.Heading size="sm" as="h2" fontWeight="400" mt="4">
        Measures used to calculate combined rates:
      </CUI.Heading>
      <CUI.UnorderedList m="5" ml="10">
        <CUI.ListItem>
          <CUI.Link
            href={`/${state}/${year}/${typeSuffix}SC/${measure}`}
            aria-label="Link to CHIP measure"
            target="_blank"
            color="blue.600"
          >
            CHIP - {measure} - {measureName}
          </CUI.Link>
        </CUI.ListItem>
        <CUI.ListItem>
          <CUI.Link
            href={`/${state}/${year}/${typeSuffix}SM/${measure}`}
            aria-label="Link to Medicaid measure"
            className="link"
            target="_blank"
            color="blue.600"
          >
            Medicaid - {measure} - {measureName}
          </CUI.Link>
        </CUI.ListItem>
      </CUI.UnorderedList>
      <DataSourceInformationBanner />
    </QMR.StateLayout>
  );
};
