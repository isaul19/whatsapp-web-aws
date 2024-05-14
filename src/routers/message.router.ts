import { Router } from "express";

import { MessageController } from "@controllers/message.controller";
import { MessageService } from "@services/message.service";
import { dtoValidator } from "@validators/_common/dto.validator";
import { SendMessageDto } from "@dtos/message/send-message.dto";

export class MessageRouter {
  public static get router() {
    const router = Router();

    const messageService = new MessageService();
    const messageController = new MessageController(messageService);

    router.post("/", dtoValidator(SendMessageDto), messageController.sendMessage);

    return router;
  }
}
