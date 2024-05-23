import type { Client } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { ChatService } from "@services/chat.service";
import type { NameDto } from "@dtos/_common";

export class ContactService {
  private whatsappClient: Client;
  private chatService: ChatService;

  constructor() {
    this.whatsappClient = Whatsapp.client;
    this.chatService = new ChatService();
  }

  public getContactByName = async (nameDto: NameDto) => {
    const chatContact = await this.chatService.getChatByContactName(nameDto);
    const contactInformation = await chatContact.getContact();
    return contactInformation;
  };
}
