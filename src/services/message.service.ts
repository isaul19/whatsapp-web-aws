import { Client } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { SendMessageDto } from "@dtos/message/send-message.dto";
import { ChatService } from "./chat.service";
import { SendMessageFromMeDto } from "@dtos/message/send-message-from-me.dto";

export class MessageService {
  private whatsappClient: Client;
  private chatService: ChatService;

  constructor() {
    this.whatsappClient = Whatsapp.client;
    this.chatService = new ChatService();
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
}
