import { Client } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { ChatService } from "@services/chat.service";
import { ContactService } from "@services/contact.service";
import { CustomError } from "@errors/custom.error";
import { Parse } from "@utils/parse.util";
import {
  GetMessageDto,
  SendMessageByContactNameDto,
  SendMessageByContactOrderDto,
  SendMessageByGroupName,
  SendMessageByGroupOrder,
  SendMessageDto,
  SendMessageFromMeDto,
} from "@dtos/message";
import { GroupService } from "./group.service";
import { LimitDto } from "@dtos/_common/limit.dto";

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

  public sendMessage = async (sendMessageDto: SendMessageDto): Promise<void> => {
    const { phone, message } = sendMessageDto;
    await this.whatsappClient.sendMessage(Parse.phone(phone), message);
  };

  public getMessage = async (getMessageDto: GetMessageDto, limitDto: LimitDto) => {
    const { phone } = getMessageDto;
    const limit = limitDto?.limit ?? 10;

    const chat = await this.chatService.getChatByPhone({ phone });
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

  public sendMessageFromMe = async (sendMessageFromMeDto: SendMessageFromMeDto): Promise<void> => {
    const { message } = sendMessageFromMeDto;
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

  public sendMessageByContactOrder = async (sendMessageByContactOrderDto: SendMessageByContactOrderDto) => {
    const { order, message } = sendMessageByContactOrderDto;
    const { phone } = await this.contactService.getContactByOrder({ order });

    await this.whatsappClient.sendMessage(Parse.phone(phone), message);
  };

  public sendMessageByContactName = async (sendMessageByContactNameDto: SendMessageByContactNameDto) => {
    const { name, message } = sendMessageByContactNameDto;
    const myContact = await this.contactService.getContactByName({ name });

    if (myContact.length >= 2) throw CustomError.badRequest("Exists two contact with similarity names");

    const { phone } = myContact[0];

    await this.whatsappClient.sendMessage(Parse.phone(phone), message);
  };

  public getMessagesByContactName = async () => {};

  public sendMessageByGroupOrder = async (sendMessageByGroupOrderDto: SendMessageByGroupOrder) => {
    const { order, message } = sendMessageByGroupOrderDto;
    const { phone } = await this.groupService.getGroupByOrder({ order });

    await this.whatsappClient.sendMessage(Parse.phone(phone), message);
  };

  public sendMessageByGroupName = async (sendMessageByGroupNameDto: SendMessageByGroupName) => {
    const { name, message } = sendMessageByGroupNameDto;
    const myGroup = await this.groupService.getGroupByName({ name });

    if (myGroup.length >= 2) throw CustomError.badRequest("Exists two group with similarity names");

    const { phone } = myGroup[0];

    await this.whatsappClient.sendMessage(Parse.phone(phone), message);
  };

  public getMessagesByGroupName = async () => {};
}
