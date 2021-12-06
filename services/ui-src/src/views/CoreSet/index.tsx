import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { Link, useParams } from "react-router-dom";
import { Params } from "Routes";
export const CoreSet = () => {
  const { state, year, coreset } = useParams<Params>();
  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: `FFY ${year}` },
        { path: `/${state}/${year}/${coreset}`, name: "Core Set Measures" },
      ]}
    >
      <CUI.Text data-testid="core-set">
        This is where the list of the core set measures stuff goes
      </CUI.Text>
      <Link to={`/${state}/${year}`}>Back to state home</Link>
    </QMR.StateLayout>
  );
};
