import WAWebJS from "whatsapp-web.js";

export interface Chat extends WAWebJS.Chat {}

export interface NewGroup extends WAWebJS.CreateGroupResult {}

export interface ChatLowData {
  order: number;
  id: string;
  name: string;
}
