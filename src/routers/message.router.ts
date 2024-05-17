import { Router } from "express";

import { MessageController } from "@controllers/message.controller";
import { MessageService } from "@services/message.service";
import { bodyValidator } from "@validators/_common/body.validator";
import {
  SendMessageByContactNameDto,
  SendMessageByContactOrderDto,
  SendMessageDto,
  SendMessageFromMeDto,
} from "@dtos/message";

export class MessageRouter {
  public static get router() {
    const router = Router();

    const messageService = new MessageService();
    const messageController = new MessageController(messageService);

    router.post("/", bodyValidator(SendMessageDto), messageController.sendMessage);

    router.post("/from-me", bodyValidator(SendMessageFromMeDto), messageController.sendMessageFromMe);

    router.post(
      "/by-contact-order",
      bodyValidator(SendMessageByContactOrderDto),
      messageController.sendMessageToContactOrder,
    );

    router.post(
      "/by-contact-name",
      bodyValidator(SendMessageByContactNameDto),
      messageController.sendMessageByContactName,
    );

    return router;
  }
}
