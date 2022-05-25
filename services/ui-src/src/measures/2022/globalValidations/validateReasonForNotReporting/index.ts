export const validateReasonForNotReporting = (
  whyNotReporting: any,
  collecting?: boolean
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
      errorMessage: `You must select at least one reason for not ${
        collecting ? "collecting" : "reporting"
      } on this measure`,
    });
  }
  return errorArray;
};
