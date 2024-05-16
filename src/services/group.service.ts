import { Client, GroupChat } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { CreateGroupDto } from "@dtos/group/create-group.dto";
import { AddParticipantGroupDto } from "@dtos/group/add-participants-group.dto";
import { Parse } from "@utils/parse.util";
import { CustomError } from "@errors/custom.error";
import { GetGroupByOrderDto } from "@dtos/group/get-group-by-order.dto";
import { GetGroupByPhoneDto } from "@dtos/group/get-group-by-phone.dto";
import { GetGroupByNameDto } from "@dtos/group/get-group-by-name.dto";
import { Constants } from "@utils/constants.util";

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
      phone: group.id.user,
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
    if (!chat) throw CustomError.notFound(`Group with id '${idGroup}' not found`);

    if (chat.isGroup) {
      const groupChat = chat as GroupChat;
      const participants = participantsPhones.map((phone) => Parse.phone(phone));
      await groupChat.addParticipants(participants);
    }
  };

  public getGroupByOrder = async (getGroupByOrderDto: GetGroupByOrderDto) => {
    const { order } = getGroupByOrderDto;

    const groupsLow = await this.listAllGroups();
    const group = groupsLow.find((group) => group.order === order);
    if (!group) throw CustomError.notFound(`Group with order '${order}' not found`);

    return group;
  };

  public getGroupByPhone = async (getGroupByPhoneDto: GetGroupByPhoneDto) => {
    const { phone } = getGroupByPhoneDto;

    const groupsLow = await this.listAllGroups();
    const group = groupsLow.find((group) => group.phone === phone);
    if (!group) throw CustomError.notFound(`Group with phone '${phone}' not found`);

    return group;
  };

  public getGroupByName = async (getGroupByNameDto: GetGroupByNameDto) => {
    const { name } = getGroupByNameDto;

    const groupsLow = await this.listAllGroups();
    const groups = groupsLow.filter((contact) => contact.name.toLowerCase().includes(name.toLowerCase()));
    if (groups.length === 0) throw CustomError.notFound(`Groups with name '${name}' not found`);

    return groups;
  };
}
