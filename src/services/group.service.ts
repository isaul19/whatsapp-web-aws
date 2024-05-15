import { Client } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { NewGroup } from "@interfaces/chat.interface";
import { CreateGroupDto } from "@dtos/group/create-group.dto";
import { AddParticipantGroupDto } from "@dtos/group/add-participants-group.dto";
import { CustomError } from "@errors/custom.error";

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

  public addParticipantsGroup = async (addParticipantGroupDto: AddParticipantGroupDto) => {
    const { idGroup, participantsPhones } = addParticipantGroupDto;

    throw CustomError.internalServer("Method not implemented");

    // const chat = await this.whatsappClient.group(`${idGroup}@c.us`);
    // if (!chat.isGroup) throw CustomError.badRequest("Is not a group");
    // await chat.mute(["NuevoNúmero1@c.us", "NuevoNúmero2@c.us"]);
  };
}
