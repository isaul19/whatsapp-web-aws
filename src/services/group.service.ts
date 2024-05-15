import { Client } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { NewGroup } from "@interfaces/chat.interface";
import { CreateGroupDto } from "@dtos/group/create-group.dto";

export class GroupService {
  private whatsappClient: Client;

  constructor() {
    this.whatsappClient = Whatsapp.client;
  }

  public createGroup = async (createGroupDto: CreateGroupDto): Promise<string | NewGroup> => {
    const { groupName, participantsPhones } = createGroupDto;

    const participants = participantsPhones.map((phone) => `${phone}@c.us`);
    const group = await this.whatsappClient.createGroup(groupName, participants);
    return group;
  };
}
