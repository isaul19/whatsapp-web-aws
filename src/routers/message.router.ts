import { Router } from "express";

import { MessageController } from "@controllers/message.controller";
import { MessageService } from "@services/message.service";
import { bodyValidator } from "@validators/_common/body.validator";
import {
  GetMessageDto,
  SendMessageByContactNameDto,
  SendMessageByContactOrderDto,
  SendMessageByGroupName,
  SendMessageByGroupOrder,
  SendMessageDto,
  SendMessageFromMeDto,
} from "@dtos/message";
import { paramsValidator } from "@validators/_common/params.validator";

export class MessageRouter {
  public static get router() {
    const router = Router();

    const messageService = new MessageService();
    const messageController = new MessageController(messageService);

    router.get("/:phone", paramsValidator(GetMessageDto), messageController.getMessage);
    router.post("/", bodyValidator(SendMessageDto), messageController.sendMessage);

    router.get("/from-me", messageController.getMessagesFromMe);
    router.post("/from-me", bodyValidator(SendMessageFromMeDto), messageController.sendMessageFromMe);

    router.post(
      "/by-contact-order",
      bodyValidator(SendMessageByContactOrderDto),
      messageController.sendMessageByContactOrder,
    );

    router.post(
      "/by-contact-name",
      bodyValidator(SendMessageByContactNameDto),
      messageController.sendMessageByContactName,
    );

    router.post("/by-group-order", bodyValidator(SendMessageByGroupOrder), messageController.sendMessageByGroupOrder);

    router.post("/by-group-name", bodyValidator(SendMessageByGroupName), messageController.sendMessageByGroupName);

    return router;
  }
}
