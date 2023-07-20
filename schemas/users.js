const Joi = require("joi");

const signupSchema = Joi.object({
  id: Joi.string().alphanum().min(5).max(15).required().messages({
    "string.base": "id는 문자열이어야 합니다.",
    "string.alphanum": "id는 알파벳과 숫자로만 구성되어야 합니다.",
    "string.min": "id는 5글자 이상이어야 합니다.",
    "string.max": "id는 15글자 이하이어야 합니다.",
    "any.required": "id는 필수 항목입니다.",
  }),
  password: Joi.string()
    .alphanum()
    .min(6)
    .max(12)
    .required()
    .messages({
      'string.base': '비밀번호는 문자열이어야 합니다.',
      'string.alphanum': '비밀번호는 알파벳과 숫자로만 구성되어야 합니다.',
      'string.min': '비밀번호는 6자 이상이어야 합니다.',
      'string.max': '비밀번호는 12자 이하이어야 합니다.',
      'any.required': '비밀번호는 필수 항목입니다.',
    }),
  confirm: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': '비밀번호가 일치하지 않습니다.',
      'any.required': '비밀번호 확인은 필수 항목입니다.',
    }),
});

const loginSchema = Joi.object({
    id: Joi.string().required().messages({
      'any.required': 'id는 필수 항목입니다.',
    }),
    password: Joi.string().required().messages({
      'any.required': '비밀번호는 필수 항목입니다.',
    }),
  });

  module.exports = {
    signupSchema,
    loginSchema
  }
