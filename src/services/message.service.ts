import type { Client, Message } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";

import { ChatService } from "@services/chat.service";
import { Parse } from "@utils/parse.util";

import type { LimitDto, MessageDto, NameDto } from "@dtos/_common";

export class MessageService {
  private whatsappClient: Client;
  private chatService: ChatService;

  constructor() {
    this.whatsappClient = Whatsapp.client;
    this.chatService = new ChatService();
  }

  public sendMessageFromMe = async (messageDto: MessageDto): Promise<void> => {
    const { message } = messageDto;
    const myChat = await this.chatService.getMyChat();
    const myId = myChat.id._serialized;

    await this.whatsappClient.sendMessage(myId, message);
  };

  public getMessagesFromMe = async (limitDto: LimitDto) => {
    const limit = limitDto?.limit ?? 10;
    const chat = await this.chatService.getMyChat();
    const messages = await chat.fetchMessages({ limit });

    const messagesContent = this.sanitizeMessage(messages);
    return messagesContent;
  };

  public sendMessageByContactName = async (nameDto: NameDto, messageDto: MessageDto) => {
    const { message } = messageDto;
    const contact = await this.chatService.getChatByContactName(nameDto);
    await contact.sendMessage(message);
  };

  public getMessagesByContactName = async (nameDto: NameDto, limitDto: LimitDto) => {
    const limit = limitDto?.limit ?? 10;
    const contact = await this.chatService.getChatByContactName(nameDto);

    const messages = await contact.fetchMessages({ limit });
    const messagesContent = this.sanitizeMessage(messages);
    return messagesContent;
  };

  public sendMessageByGroupName = async (nameDto: NameDto, messageDto: MessageDto) => {
    const { message } = messageDto;

    const group = await this.chatService.getChatByGroupName(nameDto);
    await group.sendMessage(message);
  };

  public getMessagesByGroupName = async (nameDto: NameDto, limitDto: LimitDto) => {
    const limit = limitDto?.limit ?? 10;
    const group = await this.chatService.getChatByGroupName(nameDto);

    const messages = await group.fetchMessages({ limit });
    const messagesContent = this.sanitizeMessage(messages);
    return messagesContent;
  };

  private sanitizeMessage = (messages: Message[]) => {
    return messages.map((message) => ({
      message: message.body,
      isMe: message.fromMe,
      date: Parse.date(message.timestamp),
    }));
  };
}
