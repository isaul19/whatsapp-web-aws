import { Request, Response } from "express";

import { handleError } from "@errors/handle.error";
import { ContactService } from "@services/contact.service";

export class ContactController {
  private contactService: ContactService;

  constructor(contactService: ContactService) {
    this.contactService = contactService;
  }

  public listAllContacts = async (req: Request, res: Response) => {
    try {
      const response = await this.contactService.listAllContacts();
      res.status(200).json({ message: "get contacts successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };

  public getContactByOrder = async (req: Request, res: Response) => {
    const { paramsValidator } = req.body;
    try {
      const response = await this.contactService.getContactByOrder(paramsValidator);
      res.status(200).json({ message: "get contact by order successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };

  public getContactByPhone = async (req: Request, res: Response) => {
    const { paramsValidator } = req.body;
    try {
      const response = await this.contactService.getContactByPhone(paramsValidator);
      res.status(200).json({ message: "get contact by phone successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };

  public getContactByName = async (req: Request, res: Response) => {
    const { paramsValidator } = req.body;
    try {
      const response = await this.contactService.getContactByName(paramsValidator);
      res.status(200).json({ message: "search contact successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };
}
