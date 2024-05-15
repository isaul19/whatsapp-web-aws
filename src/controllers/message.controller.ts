import { Request, Response } from "express";

import { MessageService } from "@services/message.service";
import { handleError } from "@errors/handle.error";

export class MessageController {
  private messageService: MessageService;

  constructor(messageService: MessageService) {
    this.messageService = messageService;
  }

  public sendMessage = async (req: Request, res: Response) => {
    try {
      const response = await this.messageService.sendMessage(req.body);
      return res.status(200).json({ message: "send message successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };

  public sendMessageFromMe = async (req: Request, res: Response) => {
    try {
      const response = await this.messageService.sendMessageFromMe(req.body);
      return res.status(200).json({ message: "send message from me successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };

  public sendMessageToContact = async (req: Request, res: Response) => {
    try {
      const response = await this.messageService.sendMessageToContact(req.body);
      return res.status(200).json({ message: "send message to contact successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };
}
