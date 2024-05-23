import { Chat as ChatWhatsapp, Message } from "whatsapp-web.js";

type ChatwithoutMessage = Omit<ChatWhatsapp, "lastMessage">;

export interface Chat extends ChatwithoutMessage {
  lastMessage?: Message;
}
