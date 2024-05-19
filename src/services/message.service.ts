import type { Client } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";

import { ChatService } from "@services/chat.service";
import { ContactService } from "@services/contact.service";
import { GroupService } from "@services/group.service";
import { Parse } from "@utils/parse.util";

import type { LimitDto, MessageDto, NameDto, PhoneDto } from "@dtos/_common";

export class MessageService {
  private whatsappClient: Client;

  private chatService: ChatService;
  private contactService: ContactService;
  private groupService: GroupService;

  constructor() {
    this.whatsappClient = Whatsapp.client;

    this.chatService = new ChatService();
    this.contactService = new ContactService();
    this.groupService = new GroupService();
  }

  public sendMessageByUserPhone = async (phoneDto: PhoneDto, messageDto: MessageDto): Promise<void> => {
    const { phone } = phoneDto;
    const { message } = messageDto;

    await this.whatsappClient.sendMessage(Parse.UserPhone(phone), message);
  };

  public getMessageByUserPhone = async (phoneDto: PhoneDto, limitDto: LimitDto) => {
    const { phone } = phoneDto;
    const limit = limitDto?.limit ?? 10;

    const chat = await this.chatService.getUserChatByPhone({ phone });
    const messages = await chat.fetchMessages({
      limit: limit,
    });

    const messagesContent = messages.map((message) => ({
      message: message.body,
      isMe: message.fromMe,
      date: Parse.date(message.timestamp),
    }));

    return messagesContent;
  };

  public getMessageByGroupPhone = async (phoneDto: PhoneDto, limitDto: LimitDto) => {
    const { phone } = phoneDto;
    const limit = limitDto?.limit ?? 10;

    const chat = await this.chatService.getGroupChatByPhone({ phone });
    const messages = await chat.fetchMessages({
      limit: limit,
    });

    const messagesContent = messages.map((message) => ({
      message: message.body,
      isMe: message.fromMe,
      date: Parse.date(message.timestamp),
    }));

    return messagesContent;
  };

  public sendMessageByGroupPhone = async (phoneDto: PhoneDto, messageDto: MessageDto) => {
    const { phone } = phoneDto;
    const { message } = messageDto;

    await this.whatsappClient.sendMessage(Parse.GroupPhone(phone), message);
  };

  public sendMessageFromMe = async (messageDto: MessageDto): Promise<void> => {
    const { message } = messageDto;
    const myChat = await this.chatService.getMyChat();
    const myId = myChat.id._serialized;

    await this.whatsappClient.sendMessage(myId, message);
  };

  public getMessagesFromMe = async (limitDto: LimitDto) => {
    const limit = limitDto?.limit ?? 10;
    const myChat = await this.chatService.getMyChat();

    const messages = await myChat.fetchMessages({
      limit: limit,
    });

    const messagesContent = messages.map((message) => ({
      message: message.body,
      date: Parse.date(message.timestamp),
    }));

    return messagesContent;
  };

  public sendMessageByContactName = async (nameDto: NameDto, messageDto: MessageDto) => {
    const { name } = nameDto;
    const { message } = messageDto;

    const myContact = await this.contactService.getContactByName({ name });
    const phone = myContact.id._serialized;

    await this.whatsappClient.sendMessage(phone, message);
  };

  public getMessagesByContactName = async (nameDto: NameDto, limitDto: LimitDto) => {
    const { name } = nameDto;
    const limit = limitDto?.limit ?? 10;

    const myContact = await this.contactService.getContactByName({ name });

    const messages = await myContact.fetchMessages({
      limit: limit,
    });

    const messagesContent = messages.map((message) => ({
      message: message.body,
      isMe: message.fromMe,
      date: Parse.date(message.timestamp),
    }));

    return messagesContent;
  };

  public sendMessageByGroupName = async (nameDto: NameDto, messageDto: MessageDto) => {
    const { name } = nameDto;
    const { message } = messageDto;

    const myGroup = await this.groupService.getGroupByName({ name });
    const phone = myGroup.id._serialized;
    await this.whatsappClient.sendMessage(phone, message);
  };

  public getMessagesByGroupName = async (nameDto: NameDto, limitDto: LimitDto) => {
    const { name } = nameDto;
    const limit = limitDto?.limit ?? 10;

    const myGroup = await this.groupService.getGroupByName({ name });

    const messages = await myGroup.fetchMessages({
      limit: limit,
    });

    const messagesContent = messages.map((message) => ({
      message: message.body,
      isMe: message.fromMe,
      date: Parse.date(message.timestamp),
    }));

    return messagesContent;
  };
}
