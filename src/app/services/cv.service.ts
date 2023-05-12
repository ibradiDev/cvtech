import { Observable } from 'rxjs';
import { UpdateCvDto } from './../dto/cv/updateCv.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCvDto } from '../dto/cv/AddCv.dto';
import { CvEntity } from '../entities/cv/cv.entity';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  _cvsURL = 'http://localhost:3000/cvs';
  _adminCvsURL = 'http://localhost:3000/cvs/get-for-admin';
  /*  cvTable: Array<CvEntity> = [
    {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@email.com',
      job: 'Infographist',
      phone: '+615 48494 84',
      photo: 'Apple.jpg',
      owner: 3,
    },
    {
      id: 2,
      firstname: 'John',
      lastname: 'Smith',
      email: 'john.smith@email.com',
      job: 'Software Engineer',
      phone: '+255 0159 384',
      owner: 1,
    },
    {
      id: 3,
      firstname: 'Killer',
      lastname: 'Man',
      email: 'killer.man@email.com',
      job: 'Assassin',
      phone: '+67 445 1052 8',
      owner: 2,
    },
    {
      id: 4,
      firstname: 'Aldo',
      lastname: 'Myriam',
      email: 'aldo.myriam@email.com',
      job: 'Frontend developer',
      owner: 1,
    },
  ]; */

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<CvEntity[]> {
    // return this.cvTable;
    return this.httpClient.get<CvEntity[]>(this._cvsURL);
  }

  getAllForAdmin(): Observable<CvEntity[]> {
    return this.httpClient.get<CvEntity[]>(this._adminCvsURL);
  }

  // getAllFor(owner: number): CvEntity[] {
  //   return this.cvTable.filter((cv) => cv.owner == owner);
  // }

  getCvByID(id: number): Observable<CvEntity> {
    return this.httpClient.get<CvEntity>(this._cvsURL + `/${+id}`);
  }

  // getCvFor(id: number, owner: number): CvEntity {
  //   return <CvEntity>this.cvTable.find((cv) => cv.id === id && cv.owner === owner);
  // }

  createCv(cvDTO: any, photo: File) {
    const formData = new FormData();
    formData.append('cv', JSON.stringify(cvDTO));
    formData.append('photo', photo);

    return this.httpClient.post(this._cvsURL, formData);
  }

  updateCv(id: number, cv: UpdateCvDto, owner: number) {}

  deleteCv(id: number, owner: number) {}
}
