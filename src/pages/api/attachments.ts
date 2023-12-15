import { env } from "@/env.mjs";
import s3 from "@/services/s3";
import constraintImage from "@/utils/constraintImage";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fileUpload from "express-fileupload";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import nc from "next-connect";
import { v4 as uuidv4 } from "uuid";

interface File1 {
  [key: string]: any;
}

export interface FileUploadRequest extends NextApiRequest {
  files: File1;
}

const handler = nc<FileUploadRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use(fileUpload())
  .post(async (req, res) => {
    let token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET!,
    });

    if (!token) {
      res.status(401).end("Unauthorized");
      return;
    }

    let file = req.files.file;

    const clubBucket = env.S3_ENV_TYPE === "development" ? "ku-clubs-development" : "ku-clubs";

    const logoKeyPath = `${file.md5}.webp`;

    await s3.send(
      new PutObjectCommand({
        Bucket: clubBucket,
        Key: `attachment/${logoKeyPath}`,
        Body: await constraintImage({
            buffer: file.data,
            quality: 80,
        }),
      })
    );

    const url = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: clubBucket,
        Key: `attachment/${logoKeyPath}`,
      })
    );

    const logoUrl = url.split("?")[0];
    res.json({ location: logoUrl });
  });

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
