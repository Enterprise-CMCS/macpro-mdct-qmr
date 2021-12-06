import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { Link, useParams } from "react-router-dom";
import { Params } from "Routes";
export const AddHHCoreSet = () => {
  const { state, year } = useParams<Params>();
  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: "FFY 2021" },
        { path: `/${state}/${year}/add-hh`, name: "Add Health Homes Core Set" },
      ]}
    >
      <CUI.Text>
        This is where the add health homes core set page stuff goes
      </CUI.Text>
      <Link to={`/${state}/${year}`}>Back to state home</Link>
    </QMR.StateLayout>
  );
};
