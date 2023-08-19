import sharp from "sharp";

async function constraintImage(
  buffer: Buffer,
  width = 1000,
  height = 1000,
  quality = 82,
  drop = 2
): Promise<Buffer> {
  const done = await sharp(buffer)
    .resize({
      width,
      height,
      fit: sharp.fit.inside,
    })
    .png({
      quality,
    })
    .toBuffer();

  if (done.byteLength > 1000000 * 1) {
    return constraintImage(buffer, quality - drop);
  }

  return done;
}

export default constraintImage;
