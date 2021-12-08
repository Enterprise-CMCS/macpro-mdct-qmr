import { useState } from "react";
import * as CUI from "@chakra-ui/react";
import * as Inputs from "components/Inputs";
import { MonthPickerCalendar } from "./calendarPopup";

interface Props {
  selectedYear?: string;
  selectedMonth?: string;
  yearLocked?: boolean;
}

export const MonthPicker = ({
  selectedMonth,
  selectedYear,
  yearLocked,
}: Props) => {
  const [monthValue, setMonthValue] = useState(selectedMonth || "");
  const [yearValue, setYearValue] = useState(selectedYear || "");

  const monthRegex = /^\d{0,2}$/;
  const yearRegex = /^((19|20)?\d{0,2})$/;

  const updateMonth = (value: string) => {
    setMonthValue(value);
    //NOTE: add react-form update here?
  };

  const updateYear = (value: string) => {
    setYearValue(value);
    //NOTE: add react-form update here?
  };

  return (
    <CUI.HStack>
      <Inputs.NumberInput
        value={monthValue}
        width="4rem"
        label="Month:"
        onChange={(e) =>
          monthRegex.test(e.target.value) ? updateMonth(e.target.value) : null
        }
      />
      <CUI.Text>/</CUI.Text>
      <Inputs.NumberInput
        value={yearValue}
        width="6rem"
        label="Year:"
        onChange={(e) =>
          yearRegex.test(e.target.value) ? updateYear(e.target.value) : null
        }
      />
      <MonthPickerCalendar
        yearLocked={yearLocked}
        selectedYear={yearValue}
        selectedMonth={monthValue}
        onChange={(month, year) => {
          updateMonth(`${month}`);
          updateYear(`${year}`);
        }}
      />
    </CUI.HStack>
  );
};

export * from "./calendarPopup";
