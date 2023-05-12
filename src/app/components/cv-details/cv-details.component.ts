import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { UserService } from './../../services/user.service';
import { IUser } from './../../interfaces/user.interface';
import { CvService } from './../../services/cv.service';
import { ICv } from './../../interfaces/cv.interface';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CvEntity } from 'src/app/entities/cv/cv.entity';
import { Buffer } from 'buffer';
import { animateChild } from '@angular/animations';

@Component({
  selector: 'app-cv-details',
  templateUrl: './cv-details.component.html',
  styleUrls: ['./cv-details.component.sass'],
})
export class CvDetailsComponent implements OnInit, OnDestroy {
  cv!: CvEntity;
  photoURL!: SafeUrl;
  subscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cvService: CvService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.subscription = this.cvService.getCvByID(+params['id']).subscribe({
        next: (obj) => {
          const buffer = Buffer.from(obj.photo['buffer']['data']);
          const blob = new Blob([buffer], {
            type: obj.photo['mimetype'],
          });
          const url = window.URL.createObjectURL(blob);
          this.photoURL = <SafeUrl>(
            this.domSanitizer.bypassSecurityTrustUrl(url)
          );
          this.cv = obj;
        },
        error: (err) => console.log(err),
      });
    });
  }

  delete(cvID: number) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
