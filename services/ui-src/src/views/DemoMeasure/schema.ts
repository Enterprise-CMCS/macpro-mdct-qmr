import Joi from "joi";
import { DemoForm } from "./DemoFormType";

export const validationSchema = Joi.object<DemoForm.DemoFormType>({
  areYouReporting: Joi.required().label("Are you reporting"),
  statusOfData: Joi.object<DemoForm.StatusOfData>({
    status: Joi.required().label("Status of data reporting"),
    statusOfDataAdditional: Joi.string()
      .min(1)
      .max(10)
      .label("Additional Information"),
  }),
  dataSource: Joi.any(),
});
