import * as CUI from "@chakra-ui/react";
import { MonthPickerCalendar } from "./calendarPopup";
import { Control, useController } from "react-hook-form";

interface CommonProps {
  name: string;
  control: Control<any, object>;
  initMonth?: string;
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
  control,
  yearLocked,
  initYear,
  initMonth,
}: Props) => {
  const { field } = useController({
    name,
    control,
  });

  const monthRegex = /^((1[0-2])|[0-9])?$/;
  const yearRegex = /^((19|20)?\d{0,2})$/;

  return (
    <CUI.HStack>
      <CUI.Stack>
        <CUI.FormLabel>{"Month:"}</CUI.FormLabel>
        <CUI.HStack>
          <CUI.Input
            width="4rem"
            type="number"
            label="Month:"
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
      </CUI.Stack>
      <CUI.Stack>
        <CUI.FormLabel>{"Year:"}</CUI.FormLabel>
        <CUI.HStack>
          <CUI.Input
            width="6rem"
            label="Year:"
            type="number"
            name={`${name}.year`}
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
            selectedYear={yearLocked ? initYear : field.value?.selectedYea}
            onChange={(month, year) => {
              field.onChange({
                selectedMonth: month,
                selectedYear: year,
              });
            }}
          />
        </CUI.HStack>
      </CUI.Stack>
    </CUI.HStack>
  );
};

export * from "./calendarPopup";
