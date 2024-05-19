import { Client, GroupChat } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { Parse } from "@utils/parse.util";
import { CustomError } from "@errors/custom.error";
import { AddParticipantGroupDto, CreateGroupDto } from "@dtos/group";
import { NameDto, PhoneDto } from "@dtos/_common";

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

  private getAllGroups = async () => {
    const chats = await this.whatsappClient.getChats();
    const groups = chats.filter((chat) => chat.isGroup);

    return groups;
  };

  public createGroup = async (createGroupDto: CreateGroupDto) => {
    const { groupName, participantsPhones } = createGroupDto;

    const participants = participantsPhones.map((phone) => Parse.UserPhone(phone));
    const group = await this.whatsappClient.createGroup(groupName, participants);
    return group;
  };

  public addParticipantsGroup = async (addParticipantGroupDto: AddParticipantGroupDto) => {
    const { idGroup, participantsPhones } = addParticipantGroupDto;

    const chat = await Whatsapp.client.getChatById(idGroup);
    if (!chat) throw CustomError.notFound(`Group with id '${idGroup}' not found`);

    if (chat.isGroup) {
      const groupChat = chat as GroupChat;
      const participants = participantsPhones.map((phone) => Parse.UserPhone(phone));
      await groupChat.addParticipants(participants);
    }
  };

  public getGroupByPhone = async (phoneDto: PhoneDto) => {
    const { phone } = phoneDto;

    const groupsLow = await this.listAllGroups();
    const group = groupsLow.find((group) => group.phone === phone);
    if (!group) throw CustomError.notFound(`Group with phone '${phone}' not found`);

    return group;
  };

  public getGroupByName = async (nameDto: NameDto) => {
    const { name } = nameDto;

    const groupsLow = await this.getAllGroups();
    const groups = groupsLow.filter((contact) => contact.name.toLowerCase().includes(name.toLowerCase()));
    if (groups.length === 0) throw CustomError.notFound(`Groups with name '${name}' not found`);
    if (groups.length >= 2) throw CustomError.badRequest(`Exists two groups with name ${name}`);

    return groups[0];
  };

  public mutedGroupByName = async (nameDto: NameDto) => {
    const { name } = nameDto;
    const group = (await this.getGroupByName({ name })) as GroupChat;
    const mutedDate = new Date();
    mutedDate.setDate(mutedDate.getDate() + 1);
    await group.mute(mutedDate);
  };

  public unmutedGroupByName = async (nameDto: NameDto) => {
    const { name } = nameDto;
    const group = (await this.getGroupByName({ name })) as GroupChat;
    await group.unmute();
  };
}
