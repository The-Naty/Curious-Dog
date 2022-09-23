import joi from 'joi'
import { joiPasswordExtendCore } from 'joi-password'
const joiPassword = joi.extend(joiPasswordExtendCore)

export const createUserValidator = {
    body: joi
        .object()
        .keys({
            username: joi.string().min(4).max(20).required(),
            email: joi.string().email().required(),
            profilePicture: joi.string(),
            password: joiPassword
                .string()
                .min(8)
                .max(16)
                .minOfSpecialCharacters(1)
                .minOfLowercase(1)
                .minOfUppercase(1)
                .required(),
        })
        .required(),
}
