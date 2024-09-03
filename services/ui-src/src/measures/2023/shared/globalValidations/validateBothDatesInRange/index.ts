import { DateRange } from "shared/types";

// Ensure the user populates the data range
export const validateBothDatesCompleted = (
  dateRange: DateRange["DateRange"],
  errorMessage?: string
) => {
  let errorArray: any[] = [];
  let error;

  if (dateRange) {
    const startDateCompleted =
      !!dateRange.startDate?.selectedMonth &&
      !!dateRange.startDate?.selectedYear;

    const endDateCompleted =
      !!dateRange.endDate?.selectedMonth && !!dateRange.endDate?.selectedYear;

    if (!startDateCompleted || !endDateCompleted) {
      error = true;
    }

    if (error) {
      errorArray.push({
        errorLocation: `Date Range`,
        errorMessage: errorMessage ?? `Date Range must be completed`,
      });
    }
  }

  return error ? errorArray : [];
};
