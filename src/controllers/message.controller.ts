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

  public getMessage = async (req: Request, res: Response) => {
    const { paramsValidator, queryValidator } = req.body;
    try {
      const response = await this.messageService.getMessage(paramsValidator, queryValidator);
      res.status(200).json({ message: "get message successfully", data: response });
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

  public getMessagesFromMe = async (req: Request, res: Response) => {
    const { queryValidator } = req.body;
    console.log("controller");

    try {
      const response = await this.messageService.getMessagesFromMe(queryValidator);
      res.status(200).json({ message: "get messages from me successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };

  public sendMessageByContactOrder = async (req: Request, res: Response) => {
    const { bodyValidator } = req.body;
    try {
      await this.messageService.sendMessageByContactOrder(bodyValidator);
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

  public getMessagesByContactName = async (req: Request, res: Response) => {
    const { paramsValidator, queryValidator } = req.body;
    try {
      const response = await this.messageService.getMessagesByContactName(paramsValidator, queryValidator);
      res.status(200).json({ message: "get messages by contact name successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };

  public sendMessageByGroupOrder = async (req: Request, res: Response) => {
    const { bodyValidator } = req.body;
    try {
      await this.messageService.sendMessageByGroupOrder(bodyValidator);
      return res.status(200).json({ message: "send message to group successfully" });
    } catch (error) {
      handleError(res, error);
    }
  };

  public sendMessageByGroupName = async (req: Request, res: Response) => {
    const { bodyValidator } = req.body;
    try {
      await this.messageService.sendMessageByGroupName(bodyValidator);
      return res.status(200).json({ message: "send message by group name successfully" });
    } catch (error) {
      handleError(res, error);
    }
  };

  public getMessagesByGroupName = async (req: Request, res: Response) => {
    const { paramsValidator, queryValidator } = req.body;
    try {
      const response = await this.messageService.getMessagesByGroupName(paramsValidator, queryValidator);
      res.status(200).json({ message: "get messages by contact name successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };
}
