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
    const { bodyValidator } = req.body;
    try {
      const response = await this.groupService.createGroup(bodyValidator);
      return res.status(200).json({ message: "create group successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };

  public addParticipantsGroup = async (req: Request, res: Response) => {
    try {
      await this.groupService.addParticipantsGroup(req.body);
      return res.status(200).json({ message: "add participant group successfully" });
    } catch (error) {
      handleError(res, error);
    }
  };

  public getGroupByPhone = async (req: Request, res: Response) => {
    const { paramsValidator } = req.body;
    try {
      const response = await this.groupService.getGroupByPhone(paramsValidator);
      res.status(200).json({ message: "get group by phone successfully", data: response });
    } catch (error) {
      handleError(res, error);
    }
  };

  public getGroupByName = async (req: Request, res: Response) => {
    const { paramsValidator } = req.body;
    try {
      const response = await this.groupService.getGroupByName(paramsValidator);
      res.status(200).json({ message: "get group by name successfully", data: response });
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
