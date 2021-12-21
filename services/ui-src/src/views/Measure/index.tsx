import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useParams } from "react-router-dom";
import { Params } from "Routes";
export const Measure = () => {
  const { state, year, coreSetId } = useParams<Params>();
  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: `FFY ${year}` },
        {
          path: `/${state}/${year}/${coreSetId}`,
          name: `Full Name of Measure`,
        },
      ]}
    >
      <CUI.Text data-testid="measure">This is where a measure lives</CUI.Text>
    </QMR.StateLayout>
  );
};
