import { Client } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { Parse } from "@utils/parse.util";
import { GetChatByPhoneDto } from "@dtos/chat";

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

  public getChatByPhone = async (getChatByIdDto: GetChatByPhoneDto) => {
    const { phone } = getChatByIdDto;

    const chat = await this.whatsappClient.getChatById(Parse.phone(phone));
    // const messages = await chat.fetchMessages({
    //   limit: 10,
    // });

    // const messagesContent = messages.map((message) => ({
    //   message: message.body,
    //   isMe: message.fromMe,
    // }));

    return chat;
  };

  public getMyChat = async () => {
    const myPhone = this.whatsappClient.info.wid.user;
    const myChat = await this.whatsappClient.getChatById(Parse.phone(myPhone));
    // const messages = await myChat.fetchMessages({
    //   limit: 10,
    // });

    // const messagesContent = messages.map((message) => ({
    //   message: message.body,
    //   isMe: message.fromMe,
    // }));

    // return messagesContent;

    return myChat;
  };
}
