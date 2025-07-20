import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'photos',
  
    public_id: (req: Request, file: Express.Multer.File) => {
      const ext = file.originalname.split('.').pop();
      return `${file.fieldname}-${Date.now()}.${ext}`;
    },
  } as any,
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(null, false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

export const uploadSingle = upload.single('image');
export const uploadImages = upload.array('images', 10);
