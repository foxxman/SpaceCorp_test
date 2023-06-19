import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file: any): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg';

      const filePath = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      const fullPath = path.join(filePath, fileName);

      fs.writeFileSync(fullPath, file.buffer);
      return fullPath;
    } catch (error) {
      throw new HttpException(
        'File recording error ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeFile(fileName: string) {
    const filePath = path.resolve(__dirname, '..', 'static');
    const fullPath = path.join(filePath, fileName);
    if (fs.existsSync(fullPath))
      fs.unlink(fullPath, (err) => {
        if (err) {
          throw new HttpException(
            err.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        } else {
          return fileName;
        }
      });
  }
}
