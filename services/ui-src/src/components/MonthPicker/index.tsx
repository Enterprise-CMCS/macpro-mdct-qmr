import * as CUI from "@chakra-ui/react";
import { MonthPickerCalendar } from "./calendarPopup";
import { useController, useFormContext } from "react-hook-form";

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

  const monthRegex = /^((1[0-2])|[1-9])?$/;
  const yearRegex = /^((19|20)?\d{0,2})$/;

  return (
    <CUI.HStack>
      <CUI.Stack>
        <CUI.FormControl label="Month:" isInvalid={isInvalid}>
          <CUI.FormLabel my={0}>{"Month:"}</CUI.FormLabel>
          <CUI.HStack>
            <CUI.Input
              data-cy={`${name}-month`}
              width="4rem"
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
      <CUI.Stack>
        <CUI.FormControl label="Year (yyyy):" isInvalid={isInvalid}>
          <CUI.FormLabel my={0}>{"Year (yyyy):"}</CUI.FormLabel>
          <CUI.HStack>
            <CUI.Input
              width="6rem"
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
