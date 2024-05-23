import type { Client, GroupChat } from "whatsapp-web.js";

import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { ChatService } from "@services/chat.service";
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
    const { groupName, contactNames } = createGroupDto;
    const contactsIds = await this.getContactsIds(contactNames);
    const group = await this.whatsappClient.createGroup(groupName, contactsIds);
    return group;
  };

  public addParticipantsGroup = async (addParticipantGroupDto: AddParticipantGroupDto) => {
    const { groupName, contactNames } = addParticipantGroupDto;
    const group = (await this.chatService.getChatByGroupName({ name: groupName })) as GroupChat;
    const contactsIds = await this.getContactsIds(contactNames);
    await group.addParticipants(contactsIds);
  };

  public mutedGroupByName = async (nameDto: NameDto) => {
    const group = await this.chatService.getChatByGroupName(nameDto);
    await group.mute();
  };

  public unmutedGroupByName = async (nameDto: NameDto) => {
    const group = await this.chatService.getChatByGroupName(nameDto);
    await group.unmute();
  };

  private getContactsIds = async (contactsName: string[]): Promise<string[]> => {
    const contactsIds = await Promise.all(
      contactsName.map(async (contactName) => {
        const contacts = await this.chatService.getChatByContactName({ name: contactName });
        return contacts.id._serialized;
      }),
    );

    return contactsIds;
  };
}
