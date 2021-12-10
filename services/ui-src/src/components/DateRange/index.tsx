import * as CUI from "@chakra-ui/react";
import { MonthPicker } from "components/MonthPicker";
import { Control } from "react-hook-form";

interface Props {
  name: string;
  control: Control<any, object>;
  initStartMonth?: string;
  initStartYear?: string;
  startYearLocked?: boolean;
  initEndMonth?: string;
  initEndYear?: string;
  endYearLocked?: boolean;
}

export const DateRange = ({ name, control }: Props) => {
  return (
    <CUI.Stack>
      <CUI.FormLabel fontWeight={500}>{"Start Date"}</CUI.FormLabel>
      <MonthPicker name={`${name}.startDate`} control={control} />
      <CUI.FormLabel fontWeight={500}>{"End Date"}</CUI.FormLabel>
      <MonthPicker name={`${name}.endDate`} control={control} />
    </CUI.Stack>
  );
};
