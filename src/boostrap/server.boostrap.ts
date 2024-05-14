import express from "express";
import cors from "cors";

interface Options {
  PORT: number;
  APP_ROUTER: express.Router;
}

export class Server {
  private app = express();
  private PORT: number;
  private APP_ROUTER: express.Router;

  constructor({ PORT, APP_ROUTER }: Options) {
    this.PORT = PORT;
    this.APP_ROUTER = APP_ROUTER;

    this.mountMiddlewares();
    this.mountRoutes();
  }

  private mountRoutes = () => {
    this.app.use("/api", this.APP_ROUTER);
  };

  private mountMiddlewares = () => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  };

  public start = () => {
    this.app.listen(this.PORT, () => {
      console.log(`Server running on port ${this.PORT}`);
    });
  };
}
