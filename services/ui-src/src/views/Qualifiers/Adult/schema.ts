import Joi from "joi";
import { ACSQualifierForm } from "./types";

// This is the validation schema for the Adult Core Set Qualifiers
export const validationSchema = Joi.object<ACSQualifierForm>({
  PercentageEnrolledInEachDeliverySystem: Joi.array().items({
    key: Joi.string(),
    label: Joi.string(),
    TwentyOneToSixtyFour: Joi.string().empty(""),
    GreaterThanSixtyFour: Joi.string().empty(""),
    userGenerated: Joi.bool(),
  }),
  CoreSetMeasuresAuditedOrValidated: Joi.string(),
  CoreSetMeasuresAuditedOrValidatedDetails: Joi.array().items({
    WhoConductedAuditOrValidation: Joi.string().empty(""),
    MeasuresAuditedOrValidated: Joi.array().items(Joi.string()),
  }),
  WasExternalContractorUsed: Joi.string(),
  ExternalContractorsUsed: Joi.array().items(Joi.string()),
  OtherContractorDetails: Joi.string(),
});
