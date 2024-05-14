import { Client } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { SendMessageDto } from "@dtos/message/send-message.dto";

export class MessageService {
  private whatsappClient: Client;

  constructor() {
    this.whatsappClient = Whatsapp.client;
  }

  public sendMessage = async (sendMessageDto: SendMessageDto): Promise<void> => {
    const { phone, message } = sendMessageDto;
    await this.whatsappClient.sendMessage(`${phone}@c.us`, message);
  };
}
