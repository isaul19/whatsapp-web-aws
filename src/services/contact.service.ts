import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { Client } from "whatsapp-web.js";

export class ContactService {
  private whatsappClient: Client;

  constructor() {
    this.whatsappClient = Whatsapp.client;
  }

  public listAllContacts = async () => {
    const contacts = await this.whatsappClient.getContacts();

    const contactUs = contacts.filter((contact) => contact.id.server === "c.us" && contact.isMyContact);

    const contactsLow = contactUs.map((contact, index) => ({
      order: index + 1,
      id: contact.id.user,
      name: contact.name,
    }));

    return contactsLow;
  };
}
