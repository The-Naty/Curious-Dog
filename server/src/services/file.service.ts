import { ICloudStorage, cloudStorageInstance } from './cloud-storage.service';

export interface IFileService {
  uploadFile(file: Express.Multer.File): Promise<string>;
}
export class FileService {
  constructor(private storageClient: ICloudStorage = cloudStorageInstance) {}

  public async uploadFile(file: Express.Multer.File) {
    return this.storageClient.uploadFile(file);
  }
}
