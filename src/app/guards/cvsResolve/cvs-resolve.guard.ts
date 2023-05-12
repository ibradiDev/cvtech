import { CvService } from './../../services/cv.service';
import { CvEntity } from '../../entities/cv/cv.entity';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CvsResolveGuard implements Resolve<any[]> {
  cvs!: any[];
  constructor(private cvsService: CvService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any[] {
    this.cvsService.getAll().subscribe({
      next: (cvs) => {
        this.cvs = cvs;
        // console.log('Resolve', this.cvs);
      },
      error: (err) => console.log(err),
    });
    return this.cvs;
  }
}
