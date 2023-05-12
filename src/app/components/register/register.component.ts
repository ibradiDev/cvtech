import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  photoURL!: any;
  photoName!: any;
  registerForm!: FormGroup;
  passError!: boolean;
  user!: any;
  photoFile!: File;
  subscription!: Subscription;

  constructor(
    private domSanitizer: DomSanitizer,
    private router: Router,
    private userService: UserService
  ) {}

  checkPassword() {
    const password1 = this.registerForm.get('password1');
    const password = this.registerForm.get('password');
    password?.valueChanges.subscribe((password) => {
      if (password != password1?.value) this.passError = true;
      else this.passError = false;
    });
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      phone: new FormControl(),
      password1: new FormControl(),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submit(): void {
    const user = {
      name: this.registerForm.value['name'],
      username: this.registerForm.value['username'],
      email: this.registerForm.value['email'],
      phone: this.registerForm.value['phone'],
      password: this.registerForm.value['password'],
    };

    this.subscription = this.userService
      .register(user, this.photoFile)
      .subscribe({
        next: async () => {
          (
            await this.userService.login({
              login: user.username,
              password: user.password,
            })
          ).subscribe({
            next: (res) => {
              const obj: any = res;
              sessionStorage.setItem('token', obj.access_token);
              window.location.pathname = '/cvs';
            },
            error: (err) => console.log('Login error :', err),
          });
        },
        error: (err: any) => console.log(err),
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
    this.photoName = null;
    this.photoURL = null;
    this.photoFile = new File([], '');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
