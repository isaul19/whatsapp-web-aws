import "reflect-metadata";
import { Server } from "@boostrap/server.boostrap";
import { Whatsapp } from "@boostrap/whatsapp.boostrap";
import { Env } from "@adapters/env.adapter";
import { AppRouter } from "@routers/app.router";
import { S3Store } from "@boostrap/s3-store.bootrap";

const main = async () => {
  const s3Store = new S3Store({
    AWS_REGION: Env.AWS_REGION,
    AWS_BUCKET_NAME: Env.AWS_BUCKET_NAME,
    AWS_ACCESS_KEY: Env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY: Env.AWS_SECRET_KEY,
  });

  const whatsapp = new Whatsapp({
    WS_CLIENT_ID: Env.WS_CLIENT_ID,
    s3Store: s3Store,
  });

  const server = new Server({
    PORT: Env.SERVER_PORT,
    APP_ROUTER: AppRouter.router,
  });

  try {
    await whatsapp.start();
    server.start();
  } catch (error) {
    console.log(error);
  }
};

main();
