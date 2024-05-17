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
import { queryValidator } from "@validators/_common/query.validator";
import { LimitDto } from "@dtos/_common/limit.dto";
import { NameDto } from "@dtos/_common/name.dto";

export class MessageRouter {
  public static get router() {
    const router = Router();

    const messageService = new MessageService();
    const messageController = new MessageController(messageService);

    router.get(
      "/by-phone/:phone",
      paramsValidator(GetMessageDto),
      queryValidator(LimitDto),
      messageController.getMessage,
    );

    router.post("/", bodyValidator(SendMessageDto), messageController.sendMessage);

    router.get("/from-me", queryValidator(LimitDto), messageController.getMessagesFromMe);
    router.post("/from-me", bodyValidator(SendMessageFromMeDto), messageController.sendMessageFromMe);

    // router.post(
    //   "/by-contact-order",
    //   bodyValidator(SendMessageByContactOrderDto),
    //   messageController.sendMessageByContactOrder,
    // );

    router.post(
      "/by-contact-name",
      bodyValidator(SendMessageByContactNameDto),
      messageController.sendMessageByContactName,
    );

    router.get(
      "/by-contact-name/:name",
      paramsValidator(NameDto),
      queryValidator(LimitDto),
      messageController.getMessagesByContactName,
    );

    // router.post("/by-group-order", bodyValidator(SendMessageByGroupOrder), messageController.sendMessageByGroupOrder);

    router.post("/by-group-name", bodyValidator(SendMessageByGroupName), messageController.sendMessageByGroupName);

    router.get(
      "/by-group-name/:name",
      paramsValidator(NameDto),
      queryValidator(LimitDto),
      messageController.getMessagesByGroupName,
    );

    return router;
  }
}
