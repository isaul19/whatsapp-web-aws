import { Router } from "express";

import { MessageRouter } from "@routers/message.router";
import { ChatRouter } from "./chat.router";
import { ContactRouter } from "./contact.router";

export class AppRouter {
  public static get router() {
    const router = Router();

    router.use("/message", MessageRouter.router);
    router.use("/chat", ChatRouter.router);
    router.use("/contact", ContactRouter.router);

    return router;
  }
}
