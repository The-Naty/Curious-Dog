import { CloudStorage, ICloudStorage } from './cloud-storage.service';

class FileService {
  constructor(private storageClient: ICloudStorage = new CloudStorage()) {}

  public async uploadFile(file: Express.Multer.File) {
    return await this.storageClient.uploadFile(file);
  }
}

export default FileService;
