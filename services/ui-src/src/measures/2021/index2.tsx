import { Qualifier } from "shared/Qualifiers";
import { Data } from "labels/2021/qualifierFormsData";
/*
When importing a measure it should be a named import and added to the measures object below so that it routes correctly
the key should be the measure id as a string (with '-XX' included) 
*/

const ADDCH_Data = await import("./ADDCH/data").then((module) => module.data);
const ADDCH_Validations = await import("./ADDCH/validation").then(
  (module) => module.validationFunctions
);

const measureImports = {
  "ADD-CH": { data: ADDCH_Data, validationFunctions: ADDCH_Validations },
  Qualifier,
};
export default measureImports;
export const QualifierData = Data;
