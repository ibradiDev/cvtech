import { Subscription } from 'rxjs';
import { CvEntity } from '../../entities/cv/cv.entity';
import { AppComponent } from 'src/app/app.component';
import { CvService } from './../../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ICv } from 'src/app/interfaces/cv.interface';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create-update-cv',
  templateUrl: './create-update-cv.component.html',
  styleUrls: ['./create-update-cv.component.sass'],
})
export class CreateUpdateCvComponent implements OnInit {
  editMode!: boolean;
  photoURL!: any;
  photoName!: any;
  photoFile!: File;
  cvForm!: FormGroup;
  owner!: any;
  subscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cvService: CvService,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    //const token: any = sessionStorage.getItem('token');
    // this.owner = AppComponent.getUserInfosFromToken(token);
    this.activatedRoute.params.subscribe((params) => {
      this.cvService.getCvByID(+params['id']).subscribe({
        next: (cv) => {
          this.editMode = true;
          // Pre-remplir les != champs de saisie pour une MAJ
          this.cvForm = new FormGroup({
            firstname: new FormControl(cv.firstname),
            lastname: new FormControl(cv.lastname),
            job: new FormControl(cv.job),
            email: new FormControl(cv.email),
            phone: new FormControl(cv.phone),
          });
          console.log(cv);
        },
        error: (err) => console.log(err),
      });
      //if (this.cv) this.photoFile = cv.photo ?? 'default.jpeg';
      //else this.photoFile = new File([], '');
    });
  }

  setPhotoURL(photo: File) {
    this.photoName = photo.name;
    this.photoURL = this.domSanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(photo)
    );
    this.photoFile = photo;
  }

  removePhoto() {
    // this.cvForm.controls['photo'].reset();
    this.photoName = null;
    this.photoURL = null;
    this.photoFile = new File([], '');
    // console.log('After remove', this.cvForm);
  }

  submit(formValue: any) {
    // delete formValue['photo'];
    this.subscription = this.cvService
      .createCv(formValue, this.photoFile)
      .subscribe({
        // next: (cv) => (this.cv = cv),
        next: (cv: any) => {
          // window.location.pathname = `cvs/${cv.id}`;
          this.router.navigateByUrl(`/cvs/${cv.id}`);
          console.log(cv);
        },
        error: (err) => console.log(err),
      });
  }
}
