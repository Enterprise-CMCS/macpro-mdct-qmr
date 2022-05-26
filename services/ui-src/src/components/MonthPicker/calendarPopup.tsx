import { useEffect, useState } from "react";
import * as CUI from "@chakra-ui/react";
import {
  BsFillCalendar2DateFill,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { usePathParams } from "../../hooks/api/usePathParams";

interface CalendarProps {
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
  selectedMonth,
  yearLocked = false,
  onChange: handleChange,
}: CalendarProps) => {
  const { year: selectedYear } = usePathParams();
  const maxYear = parseInt(selectedYear);
  const minYear = parseInt(selectedYear) - 1;
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
        <CUI.IconButton
          variant="outline"
          width="2rem"
          aria-label="Month Picker"
          icon={<BsFillCalendar2DateFill />}
          onClick={() => {
            setPickerOpen(!pickerOpen);
          }}
        />
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
                  aria-label={value}
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
