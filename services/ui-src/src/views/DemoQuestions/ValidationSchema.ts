import Joi from "joi";
import { DemoForm } from "./DemoFormType";

export const validationSchema = Joi.object<DemoForm.DemoFormType>({
  areYouReporting: Joi.required(),
  statusOfDataReporting: Joi.object<DemoForm.StatusOfDataReportingNested>({
    statusOfDataReporting: Joi.required(),
    statusOfDataReportingAdditional: Joi.string().min(1).max(10),
  }),
}).messages({
  "string.min": "The minimum length is {#limit}",
  "string.max": "The maximum length is {#limit}",
});
