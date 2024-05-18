import { Router } from "express";

import { ChatController } from "@controllers/chat.controller";
import { ChatService } from "@services/chat.service";
import { paramsValidator } from "@validators/_common/params.validator";

import { PhoneDto } from "@dtos/_common";

export class ChatRouter {
  public static get router() {
    const router = Router();

    const chatService = new ChatService();
    const chatController = new ChatController(chatService);

    router.get("/", chatController.listAllChats);
    router.get("/by-phone/:phone", paramsValidator(PhoneDto), chatController.getChatByPhone);
    router.get("/me", chatController.getMyChat);

    return router;
  }
}
