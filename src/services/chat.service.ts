import { Client } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { Chat, ChatLowData } from "@interfaces/chat.interface";
import { GetChatByPhoneDto } from "@dtos/chat/get-chat-by-phone.dto";

export class ChatService {
  private whatsappClient: Client;

  constructor() {
    this.whatsappClient = Whatsapp.client;
  }

  public listAllChats = async () => {
    const chats = await this.whatsappClient.getChats();

    const chatsLow = chats.map((chat, index) => ({
      order: index + 1,
      id: chat.id.user,
      name: chat.name,
    }));

    return chatsLow;
  };

  public getChatByPhone = async (getChatByIdDto: GetChatByPhoneDto): Promise<Chat> => {
    const { phone } = getChatByIdDto;
    const chat = await this.whatsappClient.getChatById(`${phone}@c.us`);
    return chat;
  };

  public getMyChat = async (): Promise<Chat> => {
    const chats = await this.whatsappClient.getChats();
    const myChat = chats.find((chat) => chat.id.user === this.whatsappClient.info.wid.user);
    return myChat;
  };
}
