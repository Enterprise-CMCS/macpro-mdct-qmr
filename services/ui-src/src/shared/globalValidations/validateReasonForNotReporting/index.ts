import { FormError } from "error";

const validateReasonForNotReportingErrorMessage = (collecting?: boolean) => {
  return `You must select at least one reason for not ${
    collecting ? "collecting" : "reporting"
  } on this measure`;
};

export const validateReasonForNotReporting = (
  whyNotReporting: any,
  collecting?: boolean,
  errorMessageFunc = validateReasonForNotReportingErrorMessage
) => {
  let error = false;
  const errorArray: FormError[] = [];

  if (!(whyNotReporting && whyNotReporting.length > 0)) {
    error = true;
  }
  if (error) {
    errorArray.push({
      errorLocation: `Why Are You Not ${
        collecting ? "Collecting" : "Reporting"
      } On This Measure`,
      errorMessage: errorMessageFunc(collecting),
    });
  }
  return errorArray;
};
