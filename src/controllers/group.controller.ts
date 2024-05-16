import { Request, Response } from "express";

import { handleError } from "@errors/handle.error";
import { GroupService } from "@services/group.service";

export class GroupController {
  private groupService: GroupService;

  constructor(groupService: GroupService) {
    this.groupService = groupService;
  }

  public listAllGroups = async (req: Request, res: Response) => {
    try {
      const response = await this.groupService.listAllGroups();
      res.status(200).json({ message: "get groups successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };

  public createGroup = async (req: Request, res: Response) => {
    try {
      const response = await this.groupService.createGroup(req.body);
      return res.status(200).json({ message: "create group successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };

  public addParticipantsGroup = async (req: Request, res: Response) => {
    try {
      const response = await this.groupService.addParticipantsGroup(req.body);
      return res.status(200).json({ message: "add participant group successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };
}
