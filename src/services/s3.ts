import { env } from "@/env.mjs";
import { S3Client } from "@aws-sdk/client-s3";
import { S3Interface } from "./S3Interface";

const S3_ENV = JSON.parse(env.S3) as S3Interface;

const s3 = new S3Client({
  credentials: {
    accessKeyId: S3_ENV.accessKey,
    secretAccessKey: S3_ENV.secretKey,
  },
  endpoint: S3_ENV.url,
  forcePathStyle: true,
  region: "ap-southeast-1",
});

export default s3;