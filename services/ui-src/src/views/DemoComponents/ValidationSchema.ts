import Joi from "joi";

const regex = /^-{0,1}\d*\.?\d{0,4}$/;

export const DemoValidationSchema = Joi.object({
  demoTextInput: Joi.string().max(3),
  demoCheckboxTextInput: Joi.string().max(1),
  demoNumberInput2: Joi.string().pattern(new RegExp(/^-{0,1}\d*$/)),
  demoRate1: Joi.array().items(
    Joi.object({
      denominator: Joi.string().pattern(new RegExp(regex)),
      numerator: Joi.string().pattern(new RegExp(regex)),
      rate: Joi.string(),
    })
  ),
  demoRate2: Joi.array().items(
    Joi.object({
      denominator: Joi.string().pattern(new RegExp(regex)),
      numerator: Joi.string().pattern(new RegExp(regex)),
      rate: Joi.string(),
    })
  ),
  demoRateTextInput1: Joi.string(),
  demoRateTextInput2: Joi.string(),
  demoSelect: Joi.string().not("invalid"),
  demoTextArea: Joi.string().max(10),
  testCheckbox: Joi.array(),
  testUpload1: Joi.any(),
  testUpload2: Joi.any(),
  demoRadioButton: Joi.string().required(),
  demoNumberInput1: Joi.string().pattern(new RegExp(regex)),
  demoMultiSelectList: Joi.any(),
  dateRange1: Joi.any(),
});
