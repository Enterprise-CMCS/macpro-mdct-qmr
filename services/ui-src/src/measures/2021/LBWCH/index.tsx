import { Measure } from "measures/types";
import * as QMR from "components";
import { useGetMeasure } from "hooks/api";
import { CoreSetAbbr } from "types";
import { format } from "date-fns";

export const LBWCH = ({ name, year }: Measure.Props) => {
  const { data } = useGetMeasure({
    coreSet: CoreSetAbbr.ACS,
    measure: "LBW-CH",
  });

  return (
    <QMR.AutocompletedMeasureTemplate
      year={year}
      dateCompleted={format(
        new Date(data.Item?.createdAt),
        "LLL d, yyyy h:mm a"
      )}
      isReportingOnMeasureYear={true}
      measureTitle={`LBW-CH - ${name}`}
      performanceMeasureText="Percentage of live births that weighed less than 2,500 grams at birth during the measurement year."
      performanceMeasureSubtext="To reduce state burden and streamline reporting, CMS will calculate this measure for states using state natality data obtained through the Centers for Disease Control and Prevention Wide-ranging Online Data for Epidemiologic Research (CDC WONDER)."
    />
  );
};
