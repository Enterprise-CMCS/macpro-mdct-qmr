import * as CUI from "@chakra-ui/react";
import { MonthPicker } from "components/MonthPicker";

interface Props {
  name: string;
  initStartMonth?: string;
  initStartYear?: string;
  startYearLocked?: boolean;
  initEndMonth?: string;
  initEndYear?: string;
  endYearLocked?: boolean;
}

export const DateRange = ({ name }: Props) => {
  return (
    <CUI.Stack>
      <CUI.FormLabel fontWeight={500}>{"Start Date"}</CUI.FormLabel>
      <MonthPicker name={`${name}.startDate`} />
      <CUI.FormLabel pt={5} fontWeight={500}>
        {"End Date"}
      </CUI.FormLabel>
      <MonthPicker name={`${name}.endDate`} />
    </CUI.Stack>
  );
};
