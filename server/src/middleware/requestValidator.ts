import Joi from "joi";
import { Request, Response, NextFunction, Express } from "express";
import _ from "lodash";

export const validate = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const options: Joi.AsyncValidationOptions | undefined = {
        abortEarly: true,
        allowUnknown: false,
        stripUnknown: false,
      };

      if (schema && !_.isEmpty(schema)) {
        const validationObject: any = [];
        const keys = ["headers", "params", "query", "files", "body"];
        for (let i = 0; i < keys.length; i++) {
          const _schema = schema[keys[i]];
          const value = req[keys[i] as keyof Request];

          validationObject.push(
            _schema ? _schema.validateAsync(value, options) : Promise.resolve()
          );
        }
        await Promise.all(validationObject);
        return next();
      } else {
        return res.status(400).json({
          error: "Empty validation schema provided!",
        });
      }
    } catch (error: any) {
      const message = error.details[0].message.replace(/['"]/g, "");
      return res.status(400).json({
        error: message,
      });
    }
  };
};
