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
      <CUI.Stack spacing="4" data-testid="state-home">
        <CUI.Text>This is where the state home stuff goes</CUI.Text>
        <Link to={`/${state}/${year}/add-child`}>Add Child Core set</Link>
        <Link to={`/${state}/${year}/add-hh`}>Add Health Homes set</Link>
        <Link to={`/components`}>Demo Components</Link>
        <Link to={`/OH/2021/ACS/AIF-HH`}>Demo Questions</Link>
      </CUI.Stack>
    </QMR.StateLayout>
  );
};
