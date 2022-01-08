import Joi from "joi";
import { ACSQualifierForm } from "./types";

// This is the validation schema for the Adult Core Set Qualifiers
export const validationSchema = Joi.object<ACSQualifierForm>({
  // PercentageEnrolledInEachDeliverySystem: Joi.array().items(Joi.object()),
  PercentageEnrolledInEachDeliverySystem: Joi.any(),
  CoreSetMeasuresAuditedOrValidated: Joi.string(),
  CoreSetMeasuresAuditedOrValidatedDetails: Joi.array().items({
    WhoConductedAuditOrValidation: Joi.string(),
    MeasuresAuditedOrValidated: Joi.array().items(Joi.string()),
  }),
  WasExternalContractorUsed: Joi.string(),
  ExternalContractorsUsed: Joi.array().items(Joi.string()),
});
