import jsQR from 'jsqr';
import QRCodeReader from 'qrcode-reader';
import sharp from 'sharp';



async function getGrayscaleRawData(buffer: Buffer): Promise<{ data: Uint8ClampedArray; width: number; height: number }> {
  const { data, info } = await sharp(buffer)
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  return {
    data: new Uint8ClampedArray(data.buffer),
    width: info.width,
    height: info.height,
  };
}


export async function decodeQRFromBuffer(imageBuffer: Buffer): Promise<string | null> {
    const { data, width, height } = await getGrayscaleRawData(imageBuffer);

    const qrCode = jsQR(data, width, height);
    if (qrCode) {
      return qrCode.data;
    }
  
    return null;
}
