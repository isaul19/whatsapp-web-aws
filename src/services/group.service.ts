import type { Client, GroupChat } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { ChatService } from "@services/chat.service";
import { CustomError } from "@errors/custom.error";
import { Parse } from "@utils/parse.util";

import type { AddParticipantGroupDto, CreateGroupDto } from "@dtos/group";
import type { NameDto } from "@dtos/_common";

export class GroupService {
  private whatsappClient: Client;
  private chatService: ChatService;

  constructor() {
    this.whatsappClient = Whatsapp.client;
    this.chatService = new ChatService();
  }

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

  public mutedGroupByName = async (nameDto: NameDto) => {
    const group = await this.chatService.getChatByGroupName(nameDto);
    await group.mute();
  };

  public unmutedGroupByName = async (nameDto: NameDto) => {
    const group = await this.chatService.getChatByGroupName(nameDto);
    await group.unmute();
  };
}
