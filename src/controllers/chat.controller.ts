import type { Request, Response } from "express";

import type { ChatService } from "@services/chat.service";
import { handleError } from "@errors/handle.error";

export class ChatController {
  private chatService: ChatService;

  constructor(chatService: ChatService) {
    this.chatService = chatService;
  }

  public listAllChats = async (req: Request, res: Response) => {
    try {
      const response = await this.chatService.listAllChats();
      res.status(200).json({ message: "get chats successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };

  public getChatByPhone = async (req: Request, res: Response) => {
    const { paramsValidator } = req.body;
    try {
      const response = await this.chatService.getUserChatByPhone(paramsValidator);
      res.status(200).json({ message: "get chat successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };

  public getMyChat = async (req: Request, res: Response) => {
    try {
      const response = await this.chatService.getMyChat();
      res.status(200).json({ message: "get my chat successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };
}
