import Joi from 'joi';                                                                                 


export const postSchema= Joi.object({
    post:Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
    }).required()                                                                                       
})



export const commentSchema = Joi.object({
    comments: Joi.object({
      comment: Joi.string().required(),
    }).required(),
  });
  