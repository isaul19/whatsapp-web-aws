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
      const contacts = await this.contactService.listAllContacts();
      res.status(200).json({ message: "get contacts successfully", data: contacts });
    } catch (error) {
      handleError(res, error);
    }
  };
}
