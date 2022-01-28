import { Measure } from "measures/types";
import * as QMR from "components";
import { useGetMeasure } from "hooks/api";
import { CoreSetAbbr } from "types";
import { formatInTimeZone } from "date-fns-tz";

export const PDENTCH = ({ name, year }: Measure.Props) => {
  const { data } = useGetMeasure({
    coreSet: CoreSetAbbr.CCS,
    measure: "PDENT-CH",
  });
  const currentTimeZone = Intl.DateTimeFormat()?.resolvedOptions()?.timeZone;
  const formattedTime = data?.Item?.createdAt
    ? formatInTimeZone(
        new Date(data.Item.createdAt),
        currentTimeZone,
        "LLL d, yyyy h:mm a zzz"
      )
    : "";

  return (
    <QMR.AutocompletedMeasureTemplate
      year={year}
      dateCompleted={formattedTime}
      isReportingOnMeasureYear={true}
      measureTitle={`PDENT-CH - ${name}`}
      performanceMeasureText="To reduce state burden and streamline reporting, CMS will use data from each state’s annual EPSDT report (Form CMS-416)."
    />
  );
};
