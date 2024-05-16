import { Client, RemoteAuth } from "whatsapp-web.js";
import { S3Store } from "./s3-store.bootrap";
import qrcode from "qrcode";

interface Options {
  WS_CLIENT_ID: string;
  s3Store: S3Store;
}

export class Whatsapp {
  private s3Store: S3Store;
  private WS_CLIENT_ID: string;
  public static client: Client;

  constructor({ WS_CLIENT_ID, s3Store }: Options) {
    this.WS_CLIENT_ID = WS_CLIENT_ID;
    this.s3Store = s3Store;

    this.mountClient();
  }

  private mountClient = () => {
    const SESSION_DIR = ".auth_session";

    Whatsapp.client = new Client({
      authStrategy: new RemoteAuth({
        clientId: this.WS_CLIENT_ID,
        backupSyncIntervalMs: 600000,
        store: this.s3Store.store,
        dataPath: SESSION_DIR,
      }),
      webVersionCache: {
        type: "remote",
        remotePath: "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
      },
    });
  };

  public start = async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      Whatsapp.client.initialize();

      Whatsapp.client.on("qr", async (qrCode) => {
        console.log("Scan qr code in to s3 bucket");
        const qrImage = await qrcode.toDataURL(qrCode);
        await this.s3Store.uploadQrCodeToS3(qrImage);
      });

      Whatsapp.client.on("ready", async () => {
        resolve(true);
      });

      Whatsapp.client.on("auth_failure", (msg) => {
        console.error("Authentication failed:", msg);
        reject(false);
      });
    });
  };
}
