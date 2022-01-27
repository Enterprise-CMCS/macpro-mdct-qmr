import { Measure } from "measures/types";
import * as QMR from "components";
import { useGetMeasure } from "hooks/api";
import { CoreSetAbbr } from "types";
import { format } from "date-fns";

export const PDENTCH = ({ name, year }: Measure.Props) => {
  const { data } = useGetMeasure({
    coreSet: CoreSetAbbr.CCS,
    measure: "PDENT-CH",
  });

  return (
    <QMR.AutocompletedMeasureTemplate
      year={year}
      dateCompleted={format(
        new Date(data.Item?.createdAt),
        "LLL d, yyyy h:mm a"
      )}
      isReportingOnMeasureYear={true}
      measureTitle={`PDENT-CH - ${name}`}
      performanceMeasureText="To reduce state burden and streamline reporting, CMS will use data from each state’s annual EPSDT report (Form CMS-416)."
    />
  );
};
