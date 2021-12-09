import * as CUI from "@chakra-ui/react";
import { MonthPickerCalendar } from "./calendarPopup";
import { Control, useController } from "react-hook-form";

interface Props {
  name: string;
  control: Control<any, object>;
  yearLocked?: boolean;
}

export const MonthPicker = ({ name, control, yearLocked }: Props) => {
  const { field } = useController({
    name,
    control,
  });

  const monthRegex = /^\d{0,2}$/;
  const yearRegex = /^((19|20)?\d{0,2})$/;

  // const updateMonth = (value: string) => {
  //   setMonthValue(value);
  //   //NOTE: add react-form update here?
  // };

  // const updateYear = (value: string) => {
  //   setYearValue(value);
  //   //NOTE: add react-form update here?
  // };

  return (
    <CUI.HStack>
      <CUI.Input
        value={field.value?.selectedMonth ?? ""}
        width="4rem"
        label="Month:"
        onChange={(e) =>
          monthRegex.test(e.target.value)
            ? field.onChange({ ...field.value, selectedMonth: e.target.value })
            : null
        }
      />
      <CUI.Input
        value={field.value?.selectedYear ?? ""}
        width="6rem"
        label="Year:"
        onChange={(e) =>
          yearRegex.test(e.target.value)
            ? field.onChange({ ...field.value, selectedYear: e.target.value })
            : null
        }
      />
      <MonthPickerCalendar
        yearLocked={yearLocked}
        selectedMonth={field.value?.selectedMonth ?? ""}
        selectedYear={field.value?.selectedYear ?? ""}
        onChange={(month, year) => {
          field.onChange({
            selectedMonth: month,
            selectedYear: year,
          });
        }}
      />
    </CUI.HStack>
  );
};

export * from "./calendarPopup";
