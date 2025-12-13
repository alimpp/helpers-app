import { FilesDataModel } from '~/model/Files';

export class FilesController extends FilesDataModel {
  constructor() {
    super();
  }
  public getCacheData() {}
  public async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return await this.Upload(`http://localhost:4000/files/upload`, formData);
  }
  async downloadFileById(id: string) {
    const file = this.read(id);
    if (!file) {
      this.updateObjectItem({ id: id });
    }
    return file
      ? `http://localhost:4000/files/${file.id}`
      : `http://localhost:4000/files/${id}`;
  }
}

export const filesController = new FilesController();
