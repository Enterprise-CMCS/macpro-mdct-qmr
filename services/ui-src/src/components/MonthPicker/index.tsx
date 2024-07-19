import * as CUI from "@chakra-ui/react";
import { MonthPickerCalendar } from "./calendarPopup";
import { useController, useFormContext } from "react-hook-form";
import { usePathParams } from "../../hooks/api/usePathParams";

interface CommonProps {
  name: string;
  initMonth?: string;
  isInvalid?: boolean;
}

type YearProps =
  | {
      yearLocked?: false;
      initYear?: string;
    }
  | { yearLocked: true; initYear: string };

type Props = CommonProps & YearProps;

export const MonthPicker = ({
  name,
  yearLocked,
  initYear,
  initMonth,
  isInvalid,
}: Props) => {
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
  });
  const { year } = usePathParams();
  const monthRegex = /^((1[0-2])|[1-9])?$/;
  const yearRegex = /^((19|20)?\d{0,2})$/;

  return (
    <CUI.HStack className="prince-flex-overwrite">
      <CUI.Stack className="prince-flex-overwrite">
        <CUI.FormControl label="Month:" isInvalid={isInvalid}>
          <CUI.FormLabel my={0}>{"Month:"}</CUI.FormLabel>
          <CUI.HStack className="prince-flex-overwrite">
            <CUI.Input
              data-cy={`${name}-month`}
              width="4rem"
              type="text"
              aria-label="Month Input Field"
              name={`${name}.month`}
              value={field.value?.selectedMonth ?? ""}
              onChange={(e) =>
                monthRegex.test(e.target.value)
                  ? field.onChange({
                      ...field.value,
                      selectedMonth: e.target.value,
                    })
                  : null
              }
            />
            <CUI.Text>{"/"}</CUI.Text>
          </CUI.HStack>
        </CUI.FormControl>
      </CUI.Stack>
      <CUI.Stack className="prince-flex-overwrite">
        <CUI.FormControl label="Year (yyyy):" isInvalid={isInvalid}>
          <CUI.FormLabel my={0}>{"Year (yyyy):"}</CUI.FormLabel>
          <CUI.HStack className="prince-flex-overwrite">
            <CUI.Input
              width="6rem"
              type="text"
              aria-label="Year Input Field"
              name={`${name}.year`}
              data-cy={`${name}-year`}
              value={field.value?.selectedYear ?? ""}
              onChange={(e) =>
                yearRegex.test(e.target.value)
                  ? field.onChange({
                      ...field.value,
                      selectedYear: e.target.value,
                    })
                  : null
              }
            />
            <MonthPickerCalendar
              yearForMeasure={year}
              yearLocked={yearLocked}
              selectedMonth={field.value?.selectedMonth || initMonth}
              selectedYear={yearLocked ? initYear : field.value?.selectedYear}
              onChange={(month, year) => {
                field.onChange({
                  selectedMonth: month,
                  selectedYear: year,
                });
              }}
            />
          </CUI.HStack>
        </CUI.FormControl>
      </CUI.Stack>
    </CUI.HStack>
  );
};

export * from "./calendarPopup";
