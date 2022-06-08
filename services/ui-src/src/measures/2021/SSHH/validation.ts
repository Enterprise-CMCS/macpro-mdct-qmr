import * as DC from "dataConstants";
import * as GV from "measures/2021/globalValidations";
import { FormData } from "./types";

const SSHHValidation = (data: FormData) => {
  let errorArray: any[] = [];
  const dateRange = data[DC.DATE_RANGE];

  errorArray = [
    ...GV.validateAtLeastOneDataSource(data),
    ...GV.validateBothDatesCompleted(dateRange),
  ];

  return errorArray;
};

export const validationFunctions = [SSHHValidation];
