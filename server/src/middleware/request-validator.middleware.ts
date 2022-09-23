import Joi from "joi";
import { Request, Response, NextFunction, Express } from "express";
import _ from "lodash";

export const validate = (schema: Record<string, Joi.Schema>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const options: Joi.AsyncValidationOptions = {
        abortEarly: true,
        allowUnknown: false,
        stripUnknown: false,
      };

      if (schema && !_.isEmpty(schema)) {
        const keys = ["headers", "params", "query", "files", "body"];
        const validationPromises = keys.map((key) => {
          const schemaObject = schema[key];
          const value = req[key as keyof Request];

          return schemaObject
            ? schemaObject.validateAsync(value, options)
            : Promise.resolve();
        });

        await Promise.all(validationPromises);
        return next();
      } else {
        return next();
      }
    } catch (error: any) {
      const message = error.details[0].message.replace(/['"]/g, "");
      return res.status(400).json({
        error: message,
      });
    }
  };
};
