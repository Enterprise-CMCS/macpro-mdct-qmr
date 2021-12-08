import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { Link, useParams } from "react-router-dom";
import { Params } from "Routes";
export const AddChildCoreSet = () => {
  const { state, year } = useParams<Params>();
  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: `FFY ${year}` },
        { path: `/${state}/${year}/add-child`, name: "Add Child Core Set" },
      ]}
    >
      <CUI.Text>This is where the add child core set page stuff goes</CUI.Text>
      <Link to={`/${state}/${year}`}>Back to state home</Link>
    </QMR.StateLayout>
  );
};
