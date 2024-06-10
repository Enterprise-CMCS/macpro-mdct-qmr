import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import { CombinedRateDataSource } from "shared/commonQuestions/CombinedRateDataSource/CombinedRateDataSource";

interface Props {
  year: string;
  measureId: string;
  measureName: string;
}

export const CombinedRatesMeasure = ({ year, measureName }: Props) => {
  const { state, measure, coreSetId } = useParams();
  const chipPath = `/${state}/${year}/ACSC/${measure}`;

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
      <body> TO-DO: replace placeholder text</body>
      <CUI.Heading size="sm" as="h2" fontWeight="400" mt="4">
        Measures used to calculate combined rates:
      </CUI.Heading>
      <CUI.UnorderedList m="5" ml="10">
        <CUI.ListItem>
          <Link to={chipPath} aria-label="" className="">
            CHIP - {measure} - {measureName}
          </Link>
        </CUI.ListItem>
        <CUI.ListItem>
          <Link to={chipPath} aria-label="" className="">
            Medicaid - {measure} - {measureName}
          </Link>
        </CUI.ListItem>
      </CUI.UnorderedList>
      <CombinedRateDataSource />
    </QMR.StateLayout>
  );
};
