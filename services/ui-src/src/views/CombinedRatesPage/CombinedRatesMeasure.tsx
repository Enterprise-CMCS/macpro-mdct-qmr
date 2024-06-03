import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useParams } from "react-router-dom";

interface Props {
  year: string;
  measureId: string;
}

export const CombinedRatesMeasure = ({ year }: Props) => {
  const { state, measure } = useParams();

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
      <CUI.Text>TBD</CUI.Text>
    </QMR.StateLayout>
  );
};
