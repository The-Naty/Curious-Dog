import joi from 'joi';

export const followUserReqSchema = {
  params: joi
    .object()
    .keys({
      toBeFollowedId: joi.number().min(1).required(),
    })
    .required(),
};

export const unfollowUserReqSchema = {
  params: joi
    .object()
    .keys({
      toBeUnfollowedId: joi.number().min(1).required(),
    })
    .required(),
};
