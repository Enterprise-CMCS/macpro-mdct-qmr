import { Measure } from "../validation/types";
import { validateReasonForNotReporting } from "../../globalValidations/validationsLib";

const CPAADValidation = (data: Measure.Form) => {
  const whyNotReporting = data["WhyDidYouNotCollect"];

  let errorArray: any[] = [];
  if (data["DidCollect"] === "No, we did not collect") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  errorArray = [...errorArray];

  return errorArray;
};

export const validationFunctions = [CPAADValidation];
