import type { Request, Response } from "express";

import type { GroupService } from "@services/group.service";
import { handleError } from "@errors/handle.error";

export class GroupController {
  private groupService: GroupService;

  constructor(groupService: GroupService) {
    this.groupService = groupService;
  }

  public createGroup = async (req: Request, res: Response) => {
    const { bodyValidator } = req.body;
    try {
      const response = await this.groupService.createGroup(bodyValidator);
      return res.status(200).json({ message: "create group successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };

  public addParticipantsGroup = async (req: Request, res: Response) => {
    const { bodyValidator } = req.body;
    try {
      await this.groupService.addParticipantsGroup(bodyValidator);
      return res.status(200).json({ message: "add participant group successfully" });
    } catch (error) {
      handleError(res, error);
    }
  };

  public mutedGroupByName = async (req: Request, res: Response) => {
    const { paramsValidator } = req.body;
    try {
      await this.groupService.mutedGroupByName(paramsValidator);
      return res.status(200).json({ message: "muted group by name successfully" });
    } catch (error) {
      handleError(res, error);
    }
  };

  public unmutedGroupByName = async (req: Request, res: Response) => {
    const { paramsValidator } = req.body;
    try {
      await this.groupService.unmutedGroupByName(paramsValidator);
      return res.status(200).json({ message: "unmuted group by name successfully" });
    } catch (error) {
      handleError(res, error);
    }
  };
}
