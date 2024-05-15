import { Router } from "express";

import { MessageController } from "@controllers/message.controller";
import { MessageService } from "@services/message.service";
import { bodyValidator } from "@validators/_common/body.validator";
import { SendMessageDto } from "@dtos/message/send-message.dto";
import { SendMessageFromMeDto } from "@dtos/message/send-message-from-me.dto";
import { SendMessageByContactOrderDto } from "@dtos/message/send-message-by-contact-order.dto";
import { SendMessageByContactNameDto } from "@dtos/message/send-message-by-contact-name.dto";

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
