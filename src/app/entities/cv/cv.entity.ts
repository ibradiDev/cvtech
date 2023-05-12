import { SafeUrl } from '@angular/platform-browser';
import { UserEntity } from '../user/user.entity';

export interface CvEntity {
  id: number;
  firstname: string;
  lastname: string;
  job: string;
  email: string;
  phone: string;
  photo: any;
  owner: UserEntity;
}
