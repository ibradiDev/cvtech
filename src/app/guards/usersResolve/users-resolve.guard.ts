import { UserEntity } from './../../entities/user/user.entity';
import { IUser } from './../../interfaces/user.interface';
import { UserService } from './../../services/user.service';
// import { IUser } from './../../entities/user/user.interface';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Resolve,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersResolveGuard implements Resolve<UserEntity[]> {
  users!: any;
  constructor(private userService: UserService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): UserEntity[] | Observable<UserEntity[]> | Promise<UserEntity[]> {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log(users);
      },
      error: (err) => console.log(err),
    });
    return this.users;
  }
}
