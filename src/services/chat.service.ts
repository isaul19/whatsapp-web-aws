import type { Client } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { Parse } from "@utils/parse.util";
import type { NameDto, PhoneDto } from "@dtos/_common";

export class ChatService {
  private whatsappClient: Client;

  constructor() {
    this.whatsappClient = Whatsapp.client;
  }

  public listAllChats = async () => {
    const chats = await this.whatsappClient.getChats();

    const chatsLowInfo = chats
      .sort((a, b) => b.timestamp - a.timestamp)
      .map((chat, i) => ({
        order: i + 1,
        phone: chat.id.user,
        name: chat.name,
        lastMessage: chat.lastMessage?.body || "",
      }));

    return chatsLowInfo;
  };

  public getUserChatByPhone = async (phoneDto: PhoneDto) => {
    const { phone } = phoneDto;
    const chat = await this.whatsappClient.getChatById(Parse.UserPhone(phone));
    return chat;
  };

  public getGroupChatByPhone = async (phoneDto: PhoneDto) => {
    const { phone } = phoneDto;
    const chat = await this.whatsappClient.getChatById(Parse.GroupPhone(phone));
    return chat;
  };

  public getMyChat = async () => {
    const myPhone = this.whatsappClient.info.wid.user;
    const myChat = await this.whatsappClient.getChatById(Parse.UserPhone(myPhone));
    return myChat;
  };

  public getChatByContactName = async (nameDto: NameDto) => {
    // const { name } = nameDto;
    // const myContact = await this.contactService.getContactByName({ name });
    // const phone = myContact.id._serialized;
    // const chat = await this.whatsappClient.getChatById(Parse.UserPhone(phone));
    // return chat;
  };
}
