import sharp from "sharp";

async function constraintImage({
  buffer,
  width,
  height,
  quality = 100,
  drop = 2,
}: {
  buffer: Buffer;
  width?: number;
  height?: number;
  quality?: number;
  drop?: number;
}): Promise<Buffer> {
  try {
    const { width: originalWidth, height: originalHeight } = await sharp(buffer).metadata();
    const processedImage = await sharp(buffer)
      .resize({
        width: width ? width : undefined,
        height: height ? height : undefined,
        fit: sharp.fit.inside,
      })
      .png({
        quality,
      })
      .toBuffer();

    if (processedImage.byteLength > 1 * 1e6) {
      // If the image size exceeds 1 MB, recursively reduce dimensions
      return constraintImage({
        buffer,
        width: originalWidth! - drop,
        height: originalHeight! - drop,
        quality,
        drop,
      });
    }

    return processedImage;
  } catch (error) {
    // Handle errors (e.g., log or throw a custom error)
    console.error("Error processing image:", error);
    throw error;
  }
}

export default constraintImage;
