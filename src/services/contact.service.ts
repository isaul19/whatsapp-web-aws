import { Client } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { CustomError } from "@errors/custom.error";
import { GetContactByNameDto, GetContactByOrderDto, GetContactByPhone } from "@dtos/contact";
import { AMERICAN_PHONE } from "@config/constants";

export class ContactService {
  private whatsappClient: Client;

  constructor() {
    this.whatsappClient = Whatsapp.client;
  }

  public listAllContacts = async () => {
    const contacts = await this.whatsappClient.getContacts();

    const MyContacts = contacts.filter(
      (contact) => contact.id.server === AMERICAN_PHONE && contact.isMyContact && !contact.isGroup,
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
    if (!contact) throw CustomError.notFound(`Contact with order '${order}' not found`);

    return contact;
  };

  public getContactByPhone = async (getContactByPhone: GetContactByPhone) => {
    const { phone } = getContactByPhone;

    const contactsLow = await this.listAllContacts();
    const contact = contactsLow.find((group) => group.phone === phone);
    if (!contact) throw CustomError.notFound(`Group with phone '${phone}' not found`);

    return contact;
  };

  public getContactByName = async (getContactByNameDto: GetContactByNameDto) => {
    const { name } = getContactByNameDto;

    const contactsLow = await this.listAllContacts();
    const contacts = contactsLow.filter((contact) => contact.name.toLowerCase().includes(name.toLowerCase()));
    if (contacts.length === 0) throw CustomError.notFound(`Contacts with name '${name}' not found`);

    return contacts;
  };
}
