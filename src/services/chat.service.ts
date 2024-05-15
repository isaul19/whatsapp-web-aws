import { Client } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { GetChatByPhoneDto } from "@dtos/chat/get-chat-by-phone.dto";

export class ChatService {
  private whatsappClient: Client;

  constructor() {
    this.whatsappClient = Whatsapp.client;
  }

  public listAllChats = async () => {
    const chats = await this.whatsappClient.getChats();

    const chatsLowInfo = chats.map((chat, index) => ({
      order: index + 1,
      phone: chat.id.user,
      name: chat.name,
    }));

    return chatsLowInfo;
  };

  public getChatByPhone = async (getChatByIdDto: GetChatByPhoneDto) => {
    const { phone } = getChatByIdDto;
    const chat = await this.whatsappClient.getChatById(`${phone}@c.us`);
    return chat;
  };

  public getMyChat = async () => {
    const chats = await this.whatsappClient.getChats();
    const myChat = chats.find((chat) => chat.id.user === this.whatsappClient.info.wid.user);
    return myChat;
  };
}
