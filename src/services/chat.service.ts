import { compareTwoStrings } from "string-similarity";
import type { Client, Contact } from "whatsapp-web.js";
import type { Chat } from "@interfaces/whatsapp.interface";
import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { Parse } from "@utils/parse.util";
import type { NameDto } from "@dtos/_common";
import { CustomError } from "@errors/custom.error";
import { AMERICAN_GROUP, AMERICAN_USER } from "@config/constants";

export class ChatService {
  private whatsappClient: Client;

  constructor() {
    this.whatsappClient = Whatsapp.client;
  }

  public getMyChat = async (): Promise<Chat> => {
    const myPhone = Parse.UserPhone(this.whatsappClient.info.wid.user);
    const chat = await this.getChatById(myPhone);
    return chat;
  };

  public getChatByContactName = async (nameDto: NameDto): Promise<Chat> => {
    const { name } = nameDto;
    const Allcontacts = await this.whatsappClient.getContacts();
    const contacts = Allcontacts.filter((contact) => contact.id.server === AMERICAN_USER);

    let maxSimilarity = -1;
    let matchingContact: Contact | null = null;

    for (const contact of contacts) {
      if (!contact.name) continue;

      const similarity = this.calculateSimilarity(contact.name, name);

      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        matchingContact = contact;
      }
    }

    if (!matchingContact) {
      throw CustomError.notFound(`Contact with name '${name}' not found`);
    }

    const chat = (await matchingContact.getChat()) as Chat;
    chat.lastMessage = undefined;
    return chat;
  };

  public getChatByGroupName = async (nameDto: NameDto): Promise<Chat> => {
    const { name } = nameDto;
    const chats = await this.whatsappClient.getChats();
    const groups = chats.filter((chat) => chat.isGroup).filter((chat) => chat.id.server === AMERICAN_GROUP);

    let maxSimilarity = -1;
    let matchingGroup: Chat | null = null;

    for (const group of groups) {
      if (!group.name) continue;

      const similarity = this.calculateSimilarity(group.name, name);

      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        matchingGroup = group;
      }
    }

    if (!matchingGroup) {
      throw CustomError.notFound(`Group with name '${name}' not found`);
    }

    const chat = matchingGroup as Chat;
    chat.lastMessage = undefined;
    return chat;
  };

  private getChatById = async (id: string): Promise<Chat> => {
    const chat = await this.whatsappClient.getChatById(id);
    return chat;
  };

  private calculateSimilarity = (value: string, valueToCompare: string): number => {
    const newValue = value.toLowerCase();
    const newValueToCompare = valueToCompare.toLowerCase();

    return compareTwoStrings(newValue, newValueToCompare);
  };
}
