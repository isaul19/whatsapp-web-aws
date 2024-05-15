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
      await this.messageService.sendMessage(req.body);
      return res.status(200).json({ message: "send message successfully" });
    } catch (error) {
      handleError(res, error);
    }
  };

  public sendMessageFromMe = async (req: Request, res: Response) => {
    try {
      await this.messageService.sendMessageFromMe(req.body);
      return res.status(200).json({ message: "send message from me successfully" });
    } catch (error) {
      handleError(res, error);
    }
  };

  public sendMessageToContactOrder = async (req: Request, res: Response) => {
    try {
      await this.messageService.sendMessageToContactOrder(req.body);
      return res.status(200).json({ message: "send message to contact successfully" });
    } catch (error) {
      handleError(res, error);
    }
  };

  public sendMessageByContactName = async (req: Request, res: Response) => {
    try {
      await this.messageService.sendMessageByContactName(req.body);
      return res.status(200).json({ message: "send message by contact name successfully" });
    } catch (error) {
      handleError(res, error);
    }
  };
}
