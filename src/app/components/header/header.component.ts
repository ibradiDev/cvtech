import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Subscription, buffer } from 'rxjs';
import { AppComponent } from './../../app.component';
import { UserService } from './../../services/user.service';
import { IUser } from './../../interfaces/user.interface';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  autentified!: boolean;
  user!: any;
  photoURL!: SafeUrl;
  subscription!: Subscription;
  userRole!: string;

  constructor(
    private userService: UserService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      const userInfos = AppComponent.getUserInfosFromToken(token);
      this.userRole = AppComponent.capitalizeFirst(userInfos.role);
      // console.log(user);
      this.autentified = true;
      this.subscription = this.userService
        .getByUsername(userInfos.username)
        .subscribe({
          next: (user) => {
            this.user = user;

            const buffer = Buffer.from(this.user.profil['buffer']['data']);
            const blob = new Blob([buffer], {
              type: this.user.profil['mimetype'],
            });
            const url = window.URL.createObjectURL(blob);
            this.photoURL = this.domSanitizer.bypassSecurityTrustUrl(url);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  logout() {
    if (this.autentified) {
      sessionStorage.removeItem('logged');
      sessionStorage.clear();
      window.location.pathname = 'home';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
