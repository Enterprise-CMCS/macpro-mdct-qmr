import { ACSQualifierForm } from "../Adult/types";
import { CCSQualifierForm } from "../Child/types";
import { CCSCQualifierForm } from "../ChildCHIP/types";
import { CCSMQualifierForm } from "../ChildMedicaid/types";
import { HHCSQualifierForm } from "../HealthHome/types";

export function validateData(
  validationFunctions: Function[],
  data:
    | CCSMQualifierForm
    | CCSQualifierForm
    | ACSQualifierForm
    | CCSCQualifierForm
    | HHCSQualifierForm
): any {
  return validationFunctions.reduce((acc: any, current: any) => {
    const error = current(data);
    let errorArray = [];

    if (Array.isArray(error)) {
      errorArray = [...error];
    } else {
      errorArray = [error];
    }

    return error ? [...acc, ...errorArray] : acc;
  }, []);
}
