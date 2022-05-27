import * as QMR from "components";
import { AMRAD } from "measures/2021/AMRAD";
import { createElement } from "react";

export const ExportAll = () => {
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
