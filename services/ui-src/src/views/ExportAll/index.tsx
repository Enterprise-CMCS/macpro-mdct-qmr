import { useParams } from "react-router-dom";
import { useMeasureRoutes, MeasureRoute } from "Routes";

type CoreSetType = "A" | "C" | "H";

export const ExportAll = () => {
  const { year, coreSetId } = useParams();
  const measureRoutes = useMeasureRoutes(
    coreSetId![0] as CoreSetType,
    year,
    true
  );
  return (
    <>
      {measureRoutes.map((measureRoute: MeasureRoute) => {
        return measureRoute.element;
      })}
    </>
  );
};
