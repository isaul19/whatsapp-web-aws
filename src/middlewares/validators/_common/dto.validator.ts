import { NextFunction, Request, Response } from "express";
import { ClassConstructor, plainToClass } from "class-transformer";
import { validateOrReject } from "class-validator";

import { handleError } from "@errors/handle.error";

export const dtoValidator = <T extends object>(dto: ClassConstructor<T>) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const dtoInstance = plainToClass(dto, req.body);
      await validateOrReject(dtoInstance);
      req.body = dtoInstance;
      next();
    } catch (error) {
      handleError(res, error);
    }
  };
};
