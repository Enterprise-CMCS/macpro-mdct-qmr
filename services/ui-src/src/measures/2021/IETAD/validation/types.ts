import * as Types from "measures/CommonQuestions/types";
export namespace Measure {
  export interface Props {
    name: string;
    year: string;
    measureId: string;
    setValidationFunctions?: React.Dispatch<React.SetStateAction<any>>;
  }

  export interface Form extends Types.DefaulFormData {}
}
