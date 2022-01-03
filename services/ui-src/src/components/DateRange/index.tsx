import * as CUI from "@chakra-ui/react";
import { MonthPicker } from "components/MonthPicker";
import objectPath from "object-path";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

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
  const {
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();

  // trigger needed all three for rerender
  const watchEndMonth = watch(`${name}.endDate.selectedMonth`);
  const watchEndYear = watch(`${name}.endDate.selectedYear`);
  const watchDateRange = watch(name);

  const errorMessage =
    objectPath.get(errors, name + ".startDate.selectedMonth")?.message ||
    objectPath.get(errors, name + ".startDate.selectedYear")?.message;
  const isInvalid =
    !!objectPath.get(errors, name + ".startDate.selectedMonth") ||
    !!objectPath.get(errors, name + ".startDate.selectedYear")?.message;

  useEffect(() => {
    trigger();
  }, [watchEndMonth, watchEndYear, watchDateRange]);

  return (
    <CUI.Stack>
      <CUI.FormControl isInvalid={isInvalid}>
        <CUI.FormLabel fontWeight={500}>{"Start Date"}</CUI.FormLabel>
        <MonthPicker name={`${name}.startDate`} isInvalid={isInvalid} />
        <CUI.FormLabel pt={5} fontWeight={500}>
          {"End Date"}
        </CUI.FormLabel>
        <MonthPicker name={`${name}.endDate`} isInvalid={isInvalid} />
        <CUI.FormErrorMessage>
          <CUI.Stack>
            <>
              <CUI.Divider my="4" />
              {errorMessage || "An Error Occured"}
            </>
          </CUI.Stack>
        </CUI.FormErrorMessage>
      </CUI.FormControl>
    </CUI.Stack>
  );
};
