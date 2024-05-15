import { Router } from "express";

import { ContactController } from "@controllers/contact.controller";
import { GetContactByOrderDto } from "@dtos/contact/get-contact-by-order.dto";
import { ContactService } from "@services/contact.service";
import { paramsValidator } from "@validators/_common/params.validator";
import { queryValidator } from "@validators/_common/query.validator";
import { SearchContactDto } from "@dtos/contact/search-contact.dto";

export class ContactRouter {
  public static get router() {
    const router = Router();

    const contactService = new ContactService();
    const contactController = new ContactController(contactService);

    router.get("/", contactController.listAllContacts);
    router.get("/by-order/:order", paramsValidator(GetContactByOrderDto), contactController.getContactByOrder);
    router.get("/search", queryValidator(SearchContactDto), contactController.searchContact);

    return router;
  }
}
