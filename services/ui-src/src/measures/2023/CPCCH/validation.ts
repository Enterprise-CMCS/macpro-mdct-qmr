import { FormData } from "./types";
import { validateReasonForNotReporting } from "measures/2023/shared/globalValidations";
import * as DC from "dataConstants";

const CPCCHValidation = (data: FormData) => {
  let errorArray: any[] = [];
  const whyDidYouNotCollect = data["WhyDidYouNotCollect"];

  if (data["DidCollect"] === undefined) {
    errorArray.push({
      errorLocation: "Did you collect this measure",
      errorMessage:
        "You must select at least one option for Did you collect this measure?",
    });
  }

  if (data["DidCollect"] === DC.NO) {
    errorArray = [...validateReasonForNotReporting(whyDidYouNotCollect, true)];
    return errorArray;
  }

  return errorArray;
};

export const validationFunctions = [CPCCHValidation];
