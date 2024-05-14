import { Client } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { Chat, ChatLowData } from "@interfaces/chat.interface";
import { GetChatByPhoneDto } from "@dtos/chat/get-chat-by-phone.dto";

export class ChatService {
  private whatsappClient: Client;

  constructor() {
    this.whatsappClient = Whatsapp.client;
  }

  public listAllChats = async (): Promise<ChatLowData[]> => {
    const chats = await this.whatsappClient.getChats();

    const idsAndName = chats.map((chat, index) => ({
      order: index + 1,
      id: chat.id.user,
      name: chat.name,
    }));

    return idsAndName;
  };

  public getChatByPhone = async (getChatByIdDto: GetChatByPhoneDto): Promise<Chat> => {
    const { phone } = getChatByIdDto;
    const chat = await this.whatsappClient.getChatById(`${phone}@c.us`);
    return chat;
  };
}
