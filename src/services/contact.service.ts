import { Client } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { CustomError } from "@errors/custom.error";
import { AMERICAN_USER } from "@config/constants";
import { NameDto, PhoneDto } from "@dtos/_common";

export class ContactService {
  private whatsappClient: Client;

  constructor() {
    this.whatsappClient = Whatsapp.client;
  }

  public listAllContacts = async () => {
    const contacts = await this.whatsappClient.getContacts();

    const MyContacts = contacts.filter(
      (contact) => contact.id.server === AMERICAN_USER && contact.isMyContact && !contact.isGroup,
    );

    const contactsLowInfo = MyContacts.map((contact, index) => ({
      order: index + 1,
      phone: contact.id.user,
      name: contact.name,
    }));

    return contactsLowInfo;
  };

  public getContactByPhone = async (phoneDto: PhoneDto) => {
    const { phone } = phoneDto;

    const contactsLow = await this.listAllContacts();
    const contact = contactsLow.find((group) => group.phone === phone);
    if (!contact) throw CustomError.notFound(`Group with phone '${phone}' not found`);

    return contact;
  };

  public getContactByName = async (nameDto: NameDto) => {
    const { name } = nameDto;

    const contactsLow = await this.listAllContacts();
    const contacts = contactsLow.filter((contact) => contact.name.toLowerCase().includes(name.toLowerCase()));
    if (contacts.length === 0) throw CustomError.notFound(`Contacts with name '${name}' not found`);

    return contacts;
  };
}
