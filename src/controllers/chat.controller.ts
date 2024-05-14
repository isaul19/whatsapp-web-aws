import { handleError } from "@errors/handle.error";
import { ChatService } from "@services/chat.service";
import { Request, Response } from "express";

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
    try {
      const response = await this.chatService.getChatByPhone(req.body);
      res.status(200).json({ message: "get chat successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };
}
