import { Router } from "express";

import { GroupController } from "@controllers/group.controller";
import { CreateGroupDto } from "@dtos/group/create-group.dto";
import { GroupService } from "@services/group.service";
import { bodyValidator } from "@validators/_common/body.validator";

export class GroupRouter {
  public static get router() {
    const router = Router();

    const groupService = new GroupService();
    const groupController = new GroupController(groupService);

    router.post("/", bodyValidator(CreateGroupDto), groupController.createGroup);

    return router;
  }
}
