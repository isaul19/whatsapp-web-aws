import { NextFunction, Request, Response } from "express";

import { GetChatByPhoneDto } from "@dtos/chat/get-chat-by-phone.dto";
import { handleError } from "@errors/handle.error";

export const getChatByPhoneValidator = (req: Request, res: Response, next: NextFunction) => {
  try {
    const instanceDto = new GetChatByPhoneDto();
    instanceDto.phone = req.params.phone;

    req.body = instanceDto;
    next();
  } catch (error) {
    handleError(res, error);
  }
};
