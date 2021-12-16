// import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useParams } from "react-router-dom";
import { Params } from "Routes";

enum coresetType {
  ACS = "Adult",
  CCS = "Child",
  HHCS = "Health Home",
}

export const CoreSet = () => {
  const { state, year, coreset } = useParams<Params>();
  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: `FFY ${year}` },
        {
          path: `/${state}/${year}/${coreset}`,
          name: `${
            coresetType[coreset as keyof typeof coresetType]
          } Core Set Measures`,
        },
      ]}
    >
      <QMR.Table data={QMR.adultMeasuresData} columns={QMR.measuresColumns} />
    </QMR.StateLayout>
  );
};
