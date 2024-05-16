import { Client } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { SendMessageDto } from "@dtos/message/send-message.dto";
import { SendMessageFromMeDto } from "@dtos/message/send-message-from-me.dto";
import { SendMessageByContactOrderDto } from "@dtos/message/send-message-by-contact-order.dto";
import { SendMessageByContactNameDto } from "@dtos/message/send-message-by-contact-name.dto";
import { ChatService } from "@services/chat.service";
import { ContactService } from "@services/contact.service";
import { CustomError } from "@errors/custom.error";
import { Parse } from "@utils/parse.util";

export class MessageService {
  private whatsappClient: Client;

  private chatService: ChatService;
  private contactService: ContactService;

  constructor() {
    this.whatsappClient = Whatsapp.client;

    this.chatService = new ChatService();
    this.contactService = new ContactService();
  }

  public sendMessage = async (sendMessageDto: SendMessageDto): Promise<void> => {
    const { phone, message } = sendMessageDto;
    await this.whatsappClient.sendMessage(Parse.phone(phone), message);
  };

  public sendMessageFromMe = async (sendMessageFromMeDto: SendMessageFromMeDto): Promise<void> => {
    const { message } = sendMessageFromMeDto;
    const myChat = await this.chatService.getMyChat();
    const myId = myChat.id._serialized;

    await this.whatsappClient.sendMessage(myId, message);
  };

  public sendMessageToContactOrder = async (sendMessageByContactOrderDto: SendMessageByContactOrderDto) => {
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
}
