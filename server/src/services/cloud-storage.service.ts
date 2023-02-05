import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import uuid from 'short-uuid';
import serviceAccount from '../../firebaseServiceAccount.json';
import { Bucket } from '@google-cloud/storage';

export interface ICloudStorage {
  uploadFile: (file: Express.Multer.File) => Promise<string>;
}

class CloudStorage implements ICloudStorage {
  private readonly bucket: Bucket;

  constructor() {
    initializeApp({
      credential: cert(serviceAccount as Record<string, any>),
      storageBucket: 'tazanaty-curious-dog.appspot.com',
    });

    this.bucket = getStorage().bucket();
  }

  public async uploadFile(file: Express.Multer.File) {
    const uploadableFile = this.bucket.file(file.originalname);
    await uploadableFile.save(file.buffer, {
      contentType: file.mimetype,
      predefinedAcl: 'publicRead',
      metadata: { firebaseStorageDownloadTokens: uuid.generate() },
    });
    return uploadableFile.publicUrl();
  }
}

const cloudStorageInstance = new CloudStorage();
export { cloudStorageInstance };
