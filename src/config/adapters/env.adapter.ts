import "dotenv/config";
import { get } from "env-var";

export class Env {
  public static get SERVER_PORT() {
    return get("SERVER_PORT").required().asPortNumber();
  }

  public static get AWS_REGION() {
    return get("AWS_REGION").required().asString();
  }

  public static get AWS_BUCKET_NAME() {
    return get("AWS_BUCKET_NAME").required().asString();
  }

  public static get AWS_ACCESS_KEY() {
    return get("AWS_ACCESS_KEY").required().asString();
  }

  public static get AWS_SECRET_KEY() {
    return get("AWS_SECRET_KEY").required().asString();
  }

  public static get WS_CLIENT_ID() {
    return get("WS_CLIENT_ID").required().asString();
  }
}
