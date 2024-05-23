import type { Request, Response } from "express";

import type { ChatService } from "@services/chat.service";
import { handleError } from "@errors/handle.error";

export class ChatController {
  private chatService: ChatService;

  constructor(chatService: ChatService) {
    this.chatService = chatService;
  }

  public getMyChat = async (req: Request, res: Response) => {
    try {
      const response = await this.chatService.getMyChat();
      res.status(200).json({ message: "get my chat successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };

  public getChatByContactName = async (req: Request, res: Response) => {
    const { paramsValidator } = req.body;
    try {
      const response = await this.chatService.getChatByContactName(paramsValidator);
      res.status(200).json({ message: "get chat by contact name successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };

  public getChatByGroupName = async (req: Request, res: Response) => {
    const { paramsValidator } = req.body;
    try {
      const response = await this.chatService.getChatByGroupName(paramsValidator);
      res.status(200).json({ message: "get chat by group name successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };
}
