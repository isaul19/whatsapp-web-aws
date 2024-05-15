import { Client } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { CreateGroupDto } from "@dtos/group/create-group.dto";
import { AddParticipantGroupDto } from "@dtos/group/add-participants-group.dto";
import { CustomError } from "@errors/custom.error";

export class GroupService {
  private whatsappClient: Client;

  constructor() {
    this.whatsappClient = Whatsapp.client;
  }

  public createGroup = async (createGroupDto: CreateGroupDto) => {
    const { groupName, participantsPhones } = createGroupDto;

    const participants = participantsPhones.map((phone) => `${phone}@c.us`);
    const group = await this.whatsappClient.createGroup(groupName, participants);
    return group;
  };

  public addParticipantsGroup = async (addParticipantGroupDto: AddParticipantGroupDto) => {
    const { idGroup, participantsPhones } = addParticipantGroupDto;
    throw CustomError.internalServer("Method not implemented");
  };
}
