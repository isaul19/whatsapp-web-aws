import { Router } from "express";

import { GroupController } from "@controllers/group.controller";
import { CreateGroupDto } from "@dtos/group/create-group.dto";
import { GroupService } from "@services/group.service";
import { bodyValidator } from "@validators/_common/body.validator";
import { paramsValidator } from "@validators/_common/params.validator";
import { NameDto, PhoneDto } from "@dtos/_common";

export class GroupRouter {
  public static get router() {
    const router = Router();

    const groupService = new GroupService();
    const groupController = new GroupController(groupService);

    router.get("/", groupController.listAllGroups);
    router.post("/", bodyValidator(CreateGroupDto), groupController.createGroup);

    router.get("/by-phone/:phone", paramsValidator(PhoneDto), groupController.getGroupByPhone);
    router.get("/by-name/:name", paramsValidator(NameDto), groupController.getGroupByName);

    router.post("/muted-by-name/:name", paramsValidator(NameDto), groupController.mutedGroupByName);
    router.post("/unmuted-by-name/:name", paramsValidator(NameDto), groupController.unmutedGroupByName);

    return router;
  }
}
