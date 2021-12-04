import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { Link, useParams } from "react-router-dom";
import { Params } from "Routes";
export const StateHome = () => {
  const { state, year } = useParams<Params>();
  return (
    <CUI.Container maxW="7xl">
      <QMR.Breadcrumbs />
      <CUI.Text>This is where the state home stuff goes</CUI.Text>
      <Link to={`/${state}/${year}/add-child`}>Add Child Core set</Link>
      <br />
      <Link to={`/${state}/${year}/add-hh`}>Add Health Homes set</Link>
    </CUI.Container>
  );
};
