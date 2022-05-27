import * as QMR from "components";
import { AMRAD } from "measures/2021/AMRAD";
import { createElement } from "react";
import { useMeasureRoutes } from "Routes";

export const ExportAll = () => {
  const measureRoutes = useMeasureRoutes("A", "2021");
  console.log(measureRoutes);
  // return measureRoutes.map((measureRoute: MeasureRoute) => {
  //   return measureRoute.element;
  // });
  return (
    <QMR.MeasureWrapper
      name={"Test Description"}
      year={"2021"}
      measureId={"AMR-AD"}
      measure={createElement(AMRAD)}
      autocompleteOnCreation={false}
    />
  );
};
