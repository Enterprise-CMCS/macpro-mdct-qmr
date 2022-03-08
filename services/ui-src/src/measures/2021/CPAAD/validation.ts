import { FormData } from "./types";
import { validateReasonForNotReporting } from "../../globalValidations/validationsLib";

const CPAADValidation = (data: FormData) => {
  const whyNotReporting = data["WhyDidYouNotCollect"];

  let errorArray: any[] = [];
  if (data["DidCollect"] === "no") {
    errorArray = [...validateReasonForNotReporting(whyNotReporting)];
    return errorArray;
  }

  errorArray = [...errorArray];

  return errorArray;
};

export const validationFunctions = [CPAADValidation];
