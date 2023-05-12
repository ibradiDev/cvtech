import { UserEntity } from './../entities/user/user.entity';
import { UserRegisterDto } from '../dto/user/user-register.dto';
import { IUser } from './../interfaces/user.interface';
import { map, Observable, shareReplay } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  _usersURL = 'http://localhost:3000/users';
  _adminsURL = 'http://localhost:3000/users/admin-role';
  _loginURL = 'http://localhost:3000/users/login';
  _userTable: Array<any> = [
    {
      id: 1,
      name: 'John Smith',
      login: 'smith',
      email: 'john.smith@email.com',
      password: 'password',
      role: 'user',
    },
    {
      id: 2,
      name: 'Ibra Outis',
      login: 'ibra',
      email: 'ibra.outis@email.com',
      password: 'ibra',
      role: 'admin',
    },
    {
      id: 3,
      name: 'Thomas Davis',
      login: 'thomas',
      email: 'thomas.davis@email.com',
      password: 'password',
      role: 'user',
    },
  ];
  users: any;
  constructor(private httpClient: HttpClient) {}

  /*   logUser(login: string, password: string) {
    login = login.trim().normalize();
    password = password.trim().normalize();
    return this._userTable.find(
      (user) => user.login === login && user.password === password
    ); */

  async login(credentials: {
    login: string;
    password: string;
  }): Promise<Observable<Object>> {
    credentials.login = credentials.login.trim().normalize();
    credentials.password = credentials.password.trim().normalize();
    return this.httpClient.post(this._loginURL, credentials);
  }

  register(user: UserRegisterDto, photoFile: File): Observable<Object> {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    formData.append('photo', photoFile);

    return this.httpClient.post(this._usersURL + '/register', formData);
  }

  getAllUsers() {
    return this.httpClient.get(this._usersURL);
  }

  getAllAdmins() {
    return this.httpClient.get(this._adminsURL);
  }

  getUserByID(id: number) {
    return this._userTable.find((user) => user.id === id);
  }

  getByUsername(username: string): Observable<Object> {
    return this.httpClient.post(this._usersURL, { username: username });
    // return <IUser>this._userTable.find((user) => user.login === username);
  }

  getUsers(): IUser[] {
    return this._userTable.filter((user) => user.role === 'user');
  }

  getAdmins(): IUser[] {
    return this._userTable.filter((user) => user.role === 'admin');
  }

  deleteOne(id: number) {
    alert('Utilisateur supprimé!');
  }

  updateUser(id: number, newData: any) {}
}
