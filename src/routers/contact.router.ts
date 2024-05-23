import { Router } from "express";

import { ContactController } from "@controllers/contact.controller";
import { ContactService } from "@services/contact.service";
import { paramsValidator } from "@validators/_common/params.validator";
import { NameDto, PhoneDto } from "@dtos/_common";

export class ContactRouter {
  public static get router() {
    const router = Router();

    const contactService = new ContactService();
    const contactController = new ContactController(contactService);

    router.get("/by-name/:name", paramsValidator(NameDto), contactController.getContactByName);

    return router;
  }
}
