import { ChatController } from "@controllers/chat.controller";
import { ChatService } from "@services/chat.service";
import { getChatByPhoneValidator } from "@validators/chat/get-chat-by-phone.validator";
import { Router } from "express";

export class ChatRouter {
  public static get router() {
    const router = Router();

    const chatService = new ChatService();
    const chatController = new ChatController(chatService);

    router.get("/", chatController.listAllChats);
    router.get("/:phone", getChatByPhoneValidator, chatController.getChatByPhone);

    return router;
  }
}
