import { Router } from "express";

import { MessageRouter } from "@routers/message.router";
import { ChatRouter } from "./chat.router";
import { ContactRouter } from "./contact.router";
import { GroupRouter } from "./group.router";

export class AppRouter {
  public static get router() {
    const router = Router();

    router.use("/chat", ChatRouter.router);
    router.use("/contact", ContactRouter.router);
    router.use("/group", GroupRouter.router);
    router.use("/message", MessageRouter.router);

    return router;
  }
}
