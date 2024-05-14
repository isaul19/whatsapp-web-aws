import { Response } from "express";
import { ValidationError } from "class-validator";
import { CustomError } from "./custom.error";

type ErrorProperty = Record<string, string[]>;

interface ErrorResponse {
  statusCode: number;
  error: string | ErrorProperty;
}

const mappingError = (error: unknown): ErrorResponse => {
  if (error instanceof CustomError) {
    return {
      statusCode: error.statusCode,
      error: error.message,
    };
  }

  if (Array.isArray(error)) {
    const errors = error as ValidationError[];
    const formatError: ErrorProperty = {};
    errors.forEach((error) => {
      const field = error.property;
      let messages: string[] = [];

      if (error.children && error.children.length > 0) {
        for (const child of error.children) {
          const errorMessage = Object.values(child.constraints!);
          messages = messages.concat(errorMessage);
        }
      } else {
        messages = Object.values(error.constraints!);
      }

      formatError[field] = messages;
    });
    return {
      statusCode: 400,
      error: formatError,
    };
  }

  return {
    statusCode: 500,
    error: "Internal server error",
  };
};

export const handleError = (res: Response, error: unknown) => {
  console.log(error);
  const response = mappingError(error);
  res.status(response.statusCode).json(response);
};
