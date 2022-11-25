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

export const answerQuestionReqSchema = {
  params: joi
    .object()
    .keys({
      questionId: joi.number().min(1).required(),
    })
    .required(),
  body: joi
    .object()
    .keys({
      answer: joi.string().min(1).max(600).required(),
    })
    .required(),
};
