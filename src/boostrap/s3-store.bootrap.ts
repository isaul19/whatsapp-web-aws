import { Store } from "whatsapp-web.js";
import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { AwsS3Store } from "wwebjs-aws-s3";

interface Options {
  AWS_REGION: string;
  AWS_BUCKET_NAME: string;
  AWS_ACCESS_KEY: string;
  AWS_SECRET_KEY: string;
}

export class S3Store {
  private s3Client!: S3Client;
  private s3Store!: Store;

  private AWS_REGION: string;
  private AWS_BUCKET_NAME: string;
  private AWS_ACCESS_KEY: string;
  private AWS_SECRET_KEY: string;

  constructor({ AWS_REGION, AWS_ACCESS_KEY, AWS_BUCKET_NAME, AWS_SECRET_KEY }: Options) {
    this.AWS_REGION = AWS_REGION;
    this.AWS_BUCKET_NAME = AWS_BUCKET_NAME;
    this.AWS_ACCESS_KEY = AWS_ACCESS_KEY;
    this.AWS_SECRET_KEY = AWS_SECRET_KEY;

    this.mountClient();
    this.mountS3Store();
  }

  private mountClient = () => {
    this.s3Client = new S3Client({
      region: this.AWS_REGION,
      credentials: {
        accessKeyId: this.AWS_ACCESS_KEY,
        secretAccessKey: this.AWS_SECRET_KEY,
      },
    });
  };

  private mountS3Store = () => {
    const S3_BASE_PATH = "./";

    this.s3Store = new AwsS3Store({
      bucketName: this.AWS_BUCKET_NAME,
      remoteDataPath: S3_BASE_PATH,
      s3Client: this.s3Client,
      putObjectCommand: PutObjectCommand,
      headObjectCommand: HeadObjectCommand,
      getObjectCommand: GetObjectCommand,
      deleteObjectCommand: DeleteObjectCommand,
    });
  };

  public uploadQrCodeToS3 = async (qrImage: string): Promise<void> => {
    const SAVE_AS = "qr.png";

    const s3 = new S3Client();
    const params = new PutObjectCommand({
      Bucket: this.AWS_BUCKET_NAME,
      Key: SAVE_AS,
      Body: Buffer.from(qrImage.replace(/^data:image\/\w+;base64,/, ""), "base64"),
      ContentType: "image/png",
    });

    await s3.send(params);
  };

  public get store(): Store {
    return this.s3Store;
  }
}
