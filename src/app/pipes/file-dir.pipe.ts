import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileDir',
})
export class FileDirPipe implements PipeTransform {
  dir: string = '../../../assets/images';

  transform(fileName: string | undefined, folderName: string): string {
    if (fileName !== null) {
      return folderName == 'cv'
        ? `${this.dir}/cv-images/${fileName}`
        : `${this.dir}/user-images/${fileName}`;
    } else return '';
  }
}
