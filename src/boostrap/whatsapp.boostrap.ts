import { Client, RemoteAuth, Store } from "whatsapp-web.js";

interface Options {
  WS_CLIENT_ID: string;
  s3Store: Store;
}

export class Whatsapp {
  private s3Store: Store;
  private WS_CLIENT_ID: string;
  public static client: Client;

  constructor({ WS_CLIENT_ID, s3Store }: Options) {
    this.WS_CLIENT_ID = WS_CLIENT_ID;
    this.s3Store = s3Store;

    this.mountClient();
  }

  private mountClient() {
    Whatsapp.client = new Client({
      authStrategy: new RemoteAuth({
        clientId: this.WS_CLIENT_ID,
        dataPath: "./.wwebjs_auth",
        backupSyncIntervalMs: 600000,
        store: this.s3Store,
      }),
      webVersionCache: {
        type: "remote",
        remotePath:
          "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
      },
    });
  }

  public start(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Whatsapp.client.initialize();

      Whatsapp.client.on("ready", () => {
        console.log("success whatsapp connected");
        resolve(true);
      });

      Whatsapp.client.on("auth_failure", (msg) => {
        console.error("failed whatsapp authentication", msg);
        reject(false);
      });

      Whatsapp.client.on("error", (error) => {
        console.error("WhatsApp client error", error);
        reject(false);
      });

      setTimeout(() => {
        console.error("WhatsApp client connection timeout");
        reject(false);
      }, 1000 * 30); // seconds
    });
  }
}
