import { UserService } from './../../services/user.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  CanMatch,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root',
})
export class AccessPermissionGuard
  implements CanActivate, CanMatch, CanLoad, CanActivateChild
{
  hasAccess!: any;

  constructor(private userService: UserService) {
    let token = sessionStorage.getItem('token');
    if (token) {
      const user = AppComponent.getUserInfosFromToken(token);
      this.hasAccess = user.role == 'admin' ?? false;
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.hasAccess;
  }

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.hasAccess;
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.hasAccess;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.hasAccess;
  }
}
