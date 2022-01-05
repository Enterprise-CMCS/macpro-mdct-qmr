import Joi from "joi";
import { Qualifier } from "./types";

// This is the validation schema for any/all state measures
export const validationSchema = Joi.object<Qualifier.Form>({
  deliverySystem: Joi.array().items(Joi.object()),
  isAudited: Joi.string(),
  whoAudited: Joi.when("audit", {
    is: Joi.exist(),
    then: Joi.array().items(Joi.string()).required(),
  }),
  hasExternalContractor: Joi.string(),
  audit: Joi.array(),
  contractorType: Joi.array().items(Joi.string()),
  otherContractorDetails: Joi.string(),
});
