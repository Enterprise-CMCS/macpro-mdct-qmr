import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { MonthPicker } from "components/MonthPicker";
import { useFormContext } from "react-hook-form";
import { format } from "date-fns";

interface Props {
  name: string;
  initStartMonth?: string;
  initStartYear?: string;
  startYearLocked?: boolean;
  initEndMonth?: string;
  initEndYear?: string;
  endYearLocked?: boolean;
}

const RangeNotification = ({ text }: { text: string }) => (
  <QMR.Notification
    alertTitle="Date Range Error"
    alertDescription={text}
    alertStatus="warning"
  />
);

export const currentYear = format(new Date(), "yyyy");
export const currentMonth = format(new Date(), "M");

export const DateRangeError = ({ name }: { name: string }) => {
  const { watch } = useFormContext();
  const range = watch(name);

  /* If the start date is a future date, then display a warning notification. */
  if (
    range?.startDate?.selectedYear >= currentYear &&
    range?.startDate?.selectedMonth > currentMonth
  ) {
    return <RangeNotification text="Start date cannot be a future date" />;
  }

  /* If the end date is a future date, then display a warning notification. */
  if (
    range?.endDate?.selectedYear >= currentYear &&
    range?.endDate?.selectedMonth > currentMonth
  ) {
    return <RangeNotification text="End date cannot be a future date" />;
  }

  /* If the start date is after the end date, then display a warning notification. */
  if (
    range?.startDate?.selectedYear >= range?.endDate?.selectedYear &&
    range?.startDate?.selectedMonth > range?.endDate?.selectedMonth
  ) {
    return <RangeNotification text="Start Date must be before the end date" />;
  }

  return null;
};

export const DateRange = ({ name }: Props) => {
  return (
    <CUI.Stack>
      <CUI.FormControl>
        <CUI.FormLabel fontWeight={500}>{"Start Date"}</CUI.FormLabel>
        <MonthPicker name={`${name}.startDate`} />
        <CUI.FormLabel pt={5} fontWeight={500}>
          {"End Date"}
        </CUI.FormLabel>
        <MonthPicker name={`${name}.endDate`} />
      </CUI.FormControl>
      <DateRangeError name={name} />
    </CUI.Stack>
  );
};
