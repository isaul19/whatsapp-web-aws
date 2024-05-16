import { Client, GroupChat } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { CreateGroupDto } from "@dtos/group/create-group.dto";
import { AddParticipantGroupDto } from "@dtos/group/add-participants-group.dto";
import { Parse } from "@utils/parse.util";

export class GroupService {
  private whatsappClient: Client;

  constructor() {
    this.whatsappClient = Whatsapp.client;
  }

  public listAllGroups = async () => {
    const chats = await this.whatsappClient.getChats();
    const groups = chats.filter((chat) => chat.isGroup);

    const groupsLowInfo = groups.map((group, index) => ({
      order: index + 1,
      id: group.id.user,
      name: group.name,
    }));

    return groupsLowInfo;
  };

  public createGroup = async (createGroupDto: CreateGroupDto) => {
    const { groupName, participantsPhones } = createGroupDto;

    const participants = participantsPhones.map((phone) => Parse.phone(phone));
    const group = await this.whatsappClient.createGroup(groupName, participants);
    return group;
  };

  public addParticipantsGroup = async (addParticipantGroupDto: AddParticipantGroupDto) => {
    const { idGroup, participantsPhones } = addParticipantGroupDto;

    const chat = await Whatsapp.client.getChatById(idGroup);

    if (chat.isGroup) {
      const groupChat = chat as GroupChat;
      const participants = participantsPhones.map((phone) => Parse.phone(phone));
      await groupChat.addParticipants(participants);
    }
  };
}
