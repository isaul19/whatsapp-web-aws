import type { Request, Response } from "express";

import type { ContactService } from "@services/contact.service";
import { handleError } from "@errors/handle.error";

export class ContactController {
  private contactService: ContactService;

  constructor(contactService: ContactService) {
    this.contactService = contactService;
  }

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
