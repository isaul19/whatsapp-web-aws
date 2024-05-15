import { Client } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { SendMessageDto } from "@dtos/message/send-message.dto";
import { ChatService } from "./chat.service";
import { SendMessageFromMeDto } from "@dtos/message/send-message-from-me.dto";
import { ContactService } from "./contact.service";
import { SendMessageToContactDto } from "@dtos/message/send-message-to-contact.dto";

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
    await this.whatsappClient.sendMessage(`${phone}@c.us`, message);
  };

  public sendMessageFromMe = async (sendMessageFromMeDto: SendMessageFromMeDto): Promise<void> => {
    const { message } = sendMessageFromMeDto;
    const myChat = await this.chatService.getMyChat();
    const myId = myChat.id._serialized;

    await this.whatsappClient.sendMessage(myId, message);
  };

  public sendMessageToContact = async (sendMessageToContactDto: SendMessageToContactDto) => {
    const { order, message } = sendMessageToContactDto;
    const myContact = await this.contactService.getContactByOrder({ order });

    await this.whatsappClient.sendMessage(`${myContact.id}@c.us`, message);
  };
}
