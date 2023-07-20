const Joi = require('joi')

const postsSchema = Joi.object({
    title: Joi.string().max(25).required().messages({
        "string.base": "title은 문자열이어야 합니다.",         
        "string.max": "title은 25글자 이하이어야 합니다.",
        "any.required": "title은 필수 항목입니다.",
      }),
      content: Joi.string().max(500).required().messages({
        "string.base": "content는 문자열이어야 합니다.",         
        "string.max": "content는 500자 이하이어야 합니다.",
        "any.required": "content는 필수 항목입니다.",
      }),
      roomname: Joi.string().max(25).required().messages({
        "string.base": "roomname은 문자열이어야 합니다.",         
        "string.max": "roomname은 25글자 이하이어야 합니다.",
        "any.required": "roomname은 필수 항목입니다.",
      }),
      star: Joi.number().integer().min(1).max(5).required().messages({
        "number.base": "star는 숫자여야 합니다.", 
        "number.integer":"star는 정수여야 합니다.",
        "number.min":"star는 1보다 크거나 같아야 합니다.",        
        "number.max": "star는 5보다 작거나 같아야 합니다.",
        "any.required": "star는 필수 항목입니다.",
      })
      
})

module.exports = postsSchema;