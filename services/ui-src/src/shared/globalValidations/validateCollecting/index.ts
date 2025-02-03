import * as Types from "shared/types";
import * as DC from "dataConstants";

const validateCollectingErrorMessage = () => {
  return `You must provide an answer for this question`;
};

export const validateCollecting = (
  data: Types.DidCollect,
  errorMessageFunc = validateCollectingErrorMessage
) => {
  const errorArray: FormError[] = [];

  if (data[DC.DID_COLLECT] === undefined) {
    errorArray.push({
      errorLocation: `Did you collect this measure?`,
      errorMessage: errorMessageFunc(),
    });
  }
  return errorArray;
};
