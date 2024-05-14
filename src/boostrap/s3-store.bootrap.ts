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
  private s3Client: S3Client;
  private s3Store: Store;

  constructor({ AWS_REGION, AWS_ACCESS_KEY, AWS_BUCKET_NAME, AWS_SECRET_KEY }: Options) {
    this.s3Client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
      },
    });

    this.s3Store = new AwsS3Store({
      bucketName: AWS_BUCKET_NAME,
      remoteDataPath: "./",
      s3Client: this.s3Client,
      putObjectCommand: PutObjectCommand,
      headObjectCommand: HeadObjectCommand,
      getObjectCommand: GetObjectCommand,
      deleteObjectCommand: DeleteObjectCommand,
    });
  }

  public get store(): Store {
    return this.s3Store;
  }
}
