import { useEffect, useState } from "react";
import * as CUI from "@chakra-ui/react";
import config from "config";
import {
  BsFillCalendar2DateFill,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";

interface CalendarProps {
  yearForMeasure?: string;
  selectedYear?: string;
  selectedMonth?: string;
  yearLocked?: boolean;
  minYear?: number;
  maxYear?: number;
  onChange: (month: number, year: number) => void;
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MonthPickerCalendar = ({
  yearForMeasure = config.currentReportingYear,
  selectedMonth,
  selectedYear = parseInt(yearForMeasure) >= 2023
    ? (parseInt(yearForMeasure) - 1).toString()
    : yearForMeasure,
  maxYear = parseInt(yearForMeasure),
  minYear = parseInt(yearForMeasure) >= 2023
    ? parseInt(yearForMeasure) - 3
    : parseInt(yearForMeasure) - 2,
  yearLocked = false,
  onChange: handleChange,
}: CalendarProps) => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [year, setYear] = useState(parseInt(selectedYear) || maxYear);
  const [month, setMonth] = useState(
    (selectedMonth && parseInt(selectedMonth)) || undefined
  );

  useEffect(() => {
    setMonth((selectedMonth && parseInt(selectedMonth)) || undefined);
  }, [selectedMonth]);

  const handleMonthClick = (month: number) => {
    setMonth(month);
    setPickerOpen(false);
    handleChange(month, year);
  };

  return (
    <CUI.Popover
      isOpen={pickerOpen}
      onClose={() => {
        setPickerOpen(!pickerOpen);
      }}
    >
      <CUI.PopoverTrigger>
        <CUI.Tooltip hasArrow label="Month picker">
          <CUI.IconButton
            variant="outline"
            className="hidden-print-items disabled-print-preview-items"
            width="2rem"
            aria-label="Month Picker"
            icon={<BsFillCalendar2DateFill />}
            onClick={() => {
              setPickerOpen(!pickerOpen);
            }}
          />
        </CUI.Tooltip>
      </CUI.PopoverTrigger>
      <CUI.PopoverContent data-testid="monthpicker-popover-content">
        <CUI.PopoverHeader>
          <CUI.HStack justifyContent={yearLocked ? "center" : "space-between"}>
            {!yearLocked && (
              <CUI.IconButton
                aria-label="Previous Year"
                variant="ghost"
                icon={<BsChevronLeft />}
                disabled={year === minYear}
                onClick={() => {
                  setYear((pr) => pr - 1);
                }}
              />
            )}
            <CUI.Text>{year}</CUI.Text>
            {!yearLocked && (
              <CUI.IconButton
                aria-label="Next Year"
                variant="ghost"
                icon={<BsChevronRight />}
                disabled={year === maxYear}
                onClick={() => {
                  setYear((pr) => pr + 1);
                }}
              />
            )}
          </CUI.HStack>
        </CUI.PopoverHeader>
        <CUI.PopoverBody>
          <CUI.SimpleGrid columns={3}>
            {monthNames.map((value, index) => {
              const variant =
                month && month === index + 1 && year === parseInt(selectedYear)
                  ? "solid"
                  : "ghost";
              return (
                <CUI.Button
                  key={`${value}-${index}`}
                  aria-label={value + " " + year}
                  variant={variant}
                  colorScheme="blue"
                  onClick={() => {
                    handleMonthClick(index + 1);
                  }}
                >
                  {value.substring(0, 3)}
                </CUI.Button>
              );
            })}
          </CUI.SimpleGrid>
        </CUI.PopoverBody>
      </CUI.PopoverContent>
    </CUI.Popover>
  );
};
