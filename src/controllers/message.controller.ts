import { Request, Response } from "express";
import { MessageService } from "@services/message.service";

export class MessageController {
  private messageService: MessageService;

  constructor(messageService: MessageService) {
    this.messageService = messageService;
  }

  public sendMessage = async (req: Request, res: Response) => {
    const response = await this.messageService.sendMessage();
    return res.status(200).json({ message: "send message successfully", data: response });
  };
}
