import { Request, Response } from "express";

import { MessageService } from "@services/message.service";
import { handleError } from "@errors/handle.error";

export class MessageController {
  private messageService: MessageService;

  constructor(messageService: MessageService) {
    this.messageService = messageService;
  }

  public sendMessage = async (req: Request, res: Response) => {
    const { bodyValidator } = req.body;
    try {
      await this.messageService.sendMessage(bodyValidator);
      return res.status(200).json({ message: "send message successfully" });
    } catch (error) {
      handleError(res, error);
    }
  };

  public sendMessageFromMe = async (req: Request, res: Response) => {
    const { bodyValidator } = req.body;
    try {
      await this.messageService.sendMessageFromMe(bodyValidator);
      return res.status(200).json({ message: "send message from me successfully" });
    } catch (error) {
      handleError(res, error);
    }
  };

  public sendMessageToContactOrder = async (req: Request, res: Response) => {
    const { bodyValidator } = req.body;
    try {
      await this.messageService.sendMessageToContactOrder(bodyValidator);
      return res.status(200).json({ message: "send message to contact successfully" });
    } catch (error) {
      handleError(res, error);
    }
  };

  public sendMessageByContactName = async (req: Request, res: Response) => {
    const { bodyValidator } = req.body;
    try {
      await this.messageService.sendMessageByContactName(bodyValidator);
      return res.status(200).json({ message: "send message by contact name successfully" });
    } catch (error) {
      handleError(res, error);
    }
  };
}
