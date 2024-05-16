import { Client } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { GetContactByOrderDto } from "@dtos/contact/get-contact-by-order.dto";
import { SearchContactDto } from "@dtos/contact/search-contact.dto";
import { CustomError } from "@errors/custom.error";
import { Constants } from "@utils/constants.util";

export class ContactService {
  private whatsappClient: Client;

  constructor() {
    this.whatsappClient = Whatsapp.client;
  }

  public listAllContacts = async () => {
    const contacts = await this.whatsappClient.getContacts();
    const MyContacts = contacts.filter(
      (contact) => contact.id.server === Constants.AMERICAN_PHONE && contact.isMyContact,
    );

    const contactsLowInfo = MyContacts.map((contact, index) => ({
      order: index + 1,
      phone: contact.id.user,
      name: contact.name,
    }));

    return contactsLowInfo;
  };

  public getContactByOrder = async (getContactByOrder: GetContactByOrderDto) => {
    const { order } = getContactByOrder;
    const contactsLow = await this.listAllContacts();

    const contact = contactsLow.find((contact) => contact.order === order);
    return contact;
  };

  public searchContact = async (searchContactDto: SearchContactDto) => {
    const { name } = searchContactDto;
    const contactsLow = await this.listAllContacts();

    const contacts = contactsLow.filter((contact) => contact.name.toLowerCase().includes(name.toLowerCase()));

    if (contacts.length === 0) throw CustomError.notFound(`Contact with '${name}' not found`);

    return contacts;
  };
}
