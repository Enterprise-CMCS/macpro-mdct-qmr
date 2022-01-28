import { Measure } from "measures/types";
import * as QMR from "components";
import { useGetMeasure } from "hooks/api";
import { CoreSetAbbr } from "types";
import { formatInTimeZone } from "date-fns-tz";

export const LBWCH = ({ name, year }: Measure.Props) => {
  const { data } = useGetMeasure({
    coreSet: CoreSetAbbr.ACS,
    measure: "LBW-CH",
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
      measureTitle={`LBW-CH - ${name}`}
      performanceMeasureText="Percentage of live births that weighed less than 2,500 grams at birth during the measurement year."
      performanceMeasureSubtext="To reduce state burden and streamline reporting, CMS will calculate this measure for states using state natality data obtained through the Centers for Disease Control and Prevention Wide-ranging Online Data for Epidemiologic Research (CDC WONDER)."
    />
  );
};
