import Joi from "joi";

const regex = /^-{0,1}\d*\.?\d{0,4}$/;

export const DemoValidationSchema = Joi.object({
  demoTextInput: Joi.string().max(3).allow(""),
  demoCheckboxTextInput: Joi.string().allow("").max(1),
  demoNumberInput2: Joi.string()
    .pattern(new RegExp(/^-{0,1}\d*$/))
    .allow(""),
  demoRate1: Joi.array().items(
    Joi.object({
      denominator: Joi.string().pattern(new RegExp(regex)).allow(""),
      numerator: Joi.string().pattern(new RegExp(regex)).allow(""),
      rate: Joi.string().pattern(new RegExp(regex)).allow(""),
    })
  ),
  demoRate2: Joi.array().items(
    Joi.object({
      denominator: Joi.string().pattern(new RegExp(regex)).allow(""),
      numerator: Joi.string().pattern(new RegExp(regex)).allow(""),
      rate: Joi.string().pattern(new RegExp(regex)).allow(""),
    })
  ),
  demoRateTextInput1: Joi.string().allow(""),
  demoRateTextInput2: Joi.string().allow(""),
  demoSelect: Joi.string().allow("").not("invalid"),
  demoTextArea: Joi.string().max(10).allow(""),
  testCheckbox: Joi.array().allow(""),
  testUpload1: Joi.any(),
  testUpload2: Joi.any(),
  demoRadioButton: Joi.string().required(),
  demoNumberInput1: Joi.string().pattern(new RegExp(regex)).allow(""),
});
