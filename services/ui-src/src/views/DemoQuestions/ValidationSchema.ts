import Joi from "joi";
import { DemoForm } from "./DemoFormType";

export const validationSchema = Joi.object<DemoForm.DemoFormType>({
  areYouReporting: Joi.required().label("Are you reporting"),
  statusOfDataReporting: Joi.object<DemoForm.StatusOfDataReportingNested>({
    statusOfDataReporting: Joi.required().label("Status of data reporting"),
    statusOfDataReportingAdditional: Joi.string()
      .min(1)
      .max(10)
      .label("Additional Information"),
  }),
});
