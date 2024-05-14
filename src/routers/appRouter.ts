import { Router } from "express";

import { MessageRouter } from "@routers/message.router";

export class AppRouter {
  public static get router() {
    const router = Router();

    router.use("/message", MessageRouter.router);

    return router;
  }
}
