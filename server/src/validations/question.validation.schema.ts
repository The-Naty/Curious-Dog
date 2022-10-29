import joi from 'joi';

export const createQuestionReqSchema = {
  params: joi
    .object()
    .keys({
      userId: joi.number().min(1).required(),
    })
    .required(),
  body: joi
    .object()
    .keys({
      body: joi.string().min(1).max(600).required(),
      isAnonymous: joi.bool().required(),
    })
    .required(),
};
