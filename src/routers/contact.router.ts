import { ContactController } from "@controllers/contact.controller";
import { ContactService } from "@services/contact.service";
import { Router } from "express";

export class ContactRouter {
  public static get router() {
    const router = Router();

    const contactService = new ContactService();
    const contactController = new ContactController(contactService);

    router.get("/", contactController.listAllContacts);

    return router;
  }
}
