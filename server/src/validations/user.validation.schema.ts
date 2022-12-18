import joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';

const joiPassword = joi.extend(joiPasswordExtendCore);
const passwordSchema = joiPassword.string().min(8).max(16).minOfSpecialCharacters(1).minOfLowercase(1).minOfUppercase(1).required();

export const registerUserReqSchema = {
  body: joi
    .object()
    .keys({
      username: joi.string().min(4).max(20).required(),
      email: joi.string().email().required(),
      profilePicture: joi.string(),
      password: passwordSchema,
    })
    .required(),
};

export const loginUserReqSchema = {
  body: joi
    .object()
    .keys({
      username: joi.string().min(4).max(20),
      email: joi.string().email(),
      password: passwordSchema,
    })
    .xor('username', 'email')
    .required(),
};

export const uploadProfilePictureReqSchema = {
  body: joi
    .object()
    .keys({
      profilePicture: joi.string(),
    })
    .required(),
};
