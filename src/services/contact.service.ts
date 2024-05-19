import type { Client } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { CustomError } from "@errors/custom.error";
import { AMERICAN_USER } from "@config/constants";

import type { NameDto, PhoneDto } from "@dtos/_common";

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

    return MyContacts;
  };

  public getContactByPhone = async (phoneDto: PhoneDto) => {
    const { phone } = phoneDto;

    const contactsLow = await this.listAllContacts();
    const contact = contactsLow.find((group) => group.id.user === phone);
    if (!contact) throw CustomError.notFound(`Group with phone '${phone}' not found`);

    return contact;
  };

  public getContactByName = async (nameDto: NameDto) => {
    const { name } = nameDto;

    const contactsLow = await this.listAllContacts();

    const contacts = contactsLow.filter((contact) => {
      if (!contact.name) return false;
      contact.name.toLowerCase().includes(name.toLowerCase());
    });

    if (contacts.length === 0) throw CustomError.notFound(`Contacts with name '${name}' not found`);
    if (contacts.length >= 2) throw CustomError.badRequest(`Exists two groups with name ${name}`);

    const contactChat = contacts[0].getChat();
    return contactChat;
  };
}
