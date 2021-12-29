import Joi from "joi";
import { Qualifier } from "./types";

// This is the validation schema for any/all state measures
export const validationSchema = Joi.object<Qualifier.Form>({
  "deliverySystem-fee-for-service-21-64": Joi.string(),
  "deliverySystem-fee-for-service-65": Joi.string(),
  "deliverySystem-pccm-21-64": Joi.string(),
  "deliverySystem-pccm-65": Joi.string(),
});
