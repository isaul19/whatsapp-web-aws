import { Router } from "express";

import { GroupController } from "@controllers/group.controller";
import { CreateGroupDto } from "@dtos/group/create-group.dto";
import { GroupService } from "@services/group.service";
import { bodyValidator } from "@validators/_common/body.validator";
import { paramsValidator } from "@validators/_common/params.validator";
import { GetGroupByNameDto, GetGroupByOrderDto, GetGroupByPhoneDto } from "@dtos/group";

export class GroupRouter {
  public static get router() {
    const router = Router();

    const groupService = new GroupService();
    const groupController = new GroupController(groupService);

    router.get("/", groupController.listAllGroups);
    router.post("/", bodyValidator(CreateGroupDto), groupController.createGroup);

    router.get("/by-phone/:phone", paramsValidator(GetGroupByPhoneDto), groupController.getGroupByPhone);
    // router.get("/by-order/:order", paramsValidator(GetGroupByOrderDto), groupController.getGroupByOrder);
    router.get("/by-name/:name", paramsValidator(GetGroupByNameDto), groupController.getGroupByName);

    return router;
  }
}
