import * as Types from "../../CommonQuestions/types";
export namespace Measure {
  export interface Props {
    name: string;
    year: string;
    measureId: string;
    setValidationFunctions?: React.Dispatch<React.SetStateAction<any>>;
  }

  export interface Form extends Types.DefaultFormData {}
}
