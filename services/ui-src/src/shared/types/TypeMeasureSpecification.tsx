import * as DC from "dataConstants";

export interface MeasurementSpecification {
  [DC.MEASUREMENT_SPECIFICATION]: // Selected Measurement Specification
  | typeof DC.NCQA
    | typeof DC.OPA
    | typeof DC.AHRQ
    | typeof DC.CMS
    | typeof DC.OTHER
    | typeof DC.HRSA
    | typeof DC.PQA;
  [DC.MEASUREMENT_SPECIFICATION_HEDIS]: string;
  [DC.MEASUREMENT_SPEC_OMS_DESCRIPTION]: string; // If user selects OTHER in MEASUREMENT_SPECIFICATION -> this is the description
  [DC.MEASUREMENT_SPEC_OMS_DESCRIPTION_UPLOAD]: File; // If user selects OTHER in MEASUREMENT_SPECIFICATION -> this is optional file upload
}
