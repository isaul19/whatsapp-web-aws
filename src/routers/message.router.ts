import { Router } from "express";

import { MessageController } from "@controllers/message.controller";
import { MessageService } from "@services/message.service";
import { bodyValidator } from "@validators/_common/body.validator";
import { paramsValidator } from "@validators/_common/params.validator";
import { queryValidator } from "@validators/_common/query.validator";
import { LimitDto, MessageDto, NameDto } from "@dtos/_common";

export class MessageRouter {
  public static get router() {
    const router = Router();

    const messageService = new MessageService();
    const messageController = new MessageController(messageService);

    router.get("/from-me", queryValidator(LimitDto), messageController.getMessagesFromMe);
    router.post("/from-me", bodyValidator(MessageDto), messageController.sendMessageFromMe);

    router.post(
      "/by-contact-name/:name",
      paramsValidator(NameDto),
      bodyValidator(MessageDto),
      messageController.sendMessageByContactName,
    );

    router.get(
      "/by-contact-name/:name",
      paramsValidator(NameDto),
      queryValidator(LimitDto),
      messageController.getMessagesByContactName,
    );

    router.post(
      "/by-group-name/:name",
      paramsValidator(NameDto),
      bodyValidator(MessageDto),
      messageController.sendMessageByGroupName,
    );

    router.get(
      "/by-group-name/:name",
      paramsValidator(NameDto),
      queryValidator(LimitDto),
      messageController.getMessagesByGroupName,
    );

    return router;
  }
}
