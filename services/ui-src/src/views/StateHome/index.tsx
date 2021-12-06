import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { Link, useParams } from "react-router-dom";
import { Params } from "Routes";
export const StateHome = () => {
  const { state, year } = useParams<Params>();
  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: "Core Set Measures" },
      ]}
    >
      <CUI.Text>This is where the state home stuff goes</CUI.Text>
      <Link to={`/${state}/${year}/add-child`}>Add Child Core set</Link>
      <br />
      <Link to={`/${state}/${year}/add-hh`}>Add Health Homes set</Link>
    </QMR.StateLayout>
  );
};
