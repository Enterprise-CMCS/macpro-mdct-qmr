import Joi from "joi";
import { DemoForm } from "./DemoFormType";

export const validationSchema = Joi.object<DemoForm.DemoFormType>({
  DidReport: Joi.required().label("Are you reporting"),
  DataStatus: Joi.required().label("Status of Data Reported"),
  "DataStatus-ProvisionalExplaination": Joi.any(),
  "DataSource-Administrative": Joi.any(),
  "DataSource-Administrative-Other": Joi.any(),
  "DataSource-Administrative-Other-Explaination": Joi.any(),
  DataSource: Joi.any(),
  "DataSource-Other": Joi.any(),
  "DataSource-Other-Explaination": Joi.any(),
});
