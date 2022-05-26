import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { MonthPicker } from "components/MonthPicker";
import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { useEffect } from "react";

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

export const currentYear = parseInt(format(new Date(), "yyyy"));
export const currentMonth = parseInt(format(new Date(), "M"));

export const DateRangeError = ({ name }: { name: string }) => {
  const { setValue, watch } = useFormContext();
  const range = watch(name);
  const toast = CUI.useToast();
  const startYear = parseInt(range?.startDate?.selectedYear);
  const startMonth = parseInt(range?.startDate?.selectedMonth);

  const endYear = parseInt(range?.endDate?.selectedYear);
  const endMonth = parseInt(range?.endDate?.selectedMonth);

  useEffect(() => {
    /* If the start date is after the end date, then reset the end date and then display a temporary warning notification. */
    if (
      endYear.toString()?.length === 4 &&
      (startYear > endYear || (startMonth >= endMonth && startYear === endYear))
    ) {
      const endDate = `${name}.endDate`;
      setValue(endDate, {});
      toast({
        status: "warning",
        description: "Start Date must be before the End Date",
        duration: 4000,
      });
    }
  }, [endMonth, endYear, setValue, name, startMonth, startYear, toast]);

  /* If the start date is a future date, then display a warning notification. */
  if (
    startYear > currentYear ||
    (startMonth > currentMonth && startYear === currentYear)
  ) {
    return <RangeNotification text="Start date cannot be a future date" />;
  }

  /* If the end date is a future date, then display a warning notification. */
  if (
    endYear > currentYear ||
    (endMonth > currentMonth && endYear === currentYear)
  ) {
    return <RangeNotification text="End date cannot be a future date" />;
  }

  return null;
};

export const DateRange = ({ name }: Props) => {
  return (
    <CUI.Stack>
      <CUI.FormControl>
        <CUI.FormLabel id={`${name}.startDate-label`} fontWeight={500}>
          {"Start Date"}
        </CUI.FormLabel>
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
