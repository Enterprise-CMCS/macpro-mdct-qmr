import Joi from "joi";
import { ACSQualifierForm } from "./types";

// This is the validation schema for the Adult Core Set Qualifiers
export const validationSchema = Joi.object<ACSQualifierForm>({
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
