import { Router } from "express";

import { ContactController } from "@controllers/contact.controller";
import { ContactService } from "@services/contact.service";
import { paramsValidator } from "@validators/_common/params.validator";
import { GetContactByNameDto, GetContactByOrderDto, GetContactByPhone } from "@dtos/contact";

export class ContactRouter {
  public static get router() {
    const router = Router();

    const contactService = new ContactService();
    const contactController = new ContactController(contactService);

    router.get("/", contactController.listAllContacts);

    router.get("/by-phone/:phone", paramsValidator(GetContactByPhone), contactController.getContactByOrder);
    // router.get("/by-order/:order", paramsValidator(GetContactByOrderDto), contactController.getContactByOrder);
    router.get("/by-name/:name", paramsValidator(GetContactByNameDto), contactController.getContactByName);

    return router;
  }
}
