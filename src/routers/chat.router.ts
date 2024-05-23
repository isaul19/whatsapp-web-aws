import { Router } from "express";

import { ChatController } from "@controllers/chat.controller";
import { ChatService } from "@services/chat.service";
import { paramsValidator } from "@validators/_common/params.validator";

import { NameDto, PhoneDto } from "@dtos/_common";

export class ChatRouter {
  public static get router() {
    const router = Router();

    const chatService = new ChatService();
    const chatController = new ChatController(chatService);

    router.get("/me", chatController.getMyChat);

    router.get("/by-contact-name/:name", paramsValidator(NameDto), chatController.getChatByContactName);
    router.get("/by-group-name/:name", paramsValidator(NameDto), chatController.getChatByGroupName);

    return router;
  }
}
