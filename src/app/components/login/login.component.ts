import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, shareReplay } from 'rxjs';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit, OnDestroy {
  user: any;
  invalidData: boolean = false;
  subscription: Subscription = new Subscription();
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  async submit(loginForm: any): Promise<void> {
    const login = loginForm.value['login'];
    const password = loginForm.value['password'];
    this.subscription = (
      await this.userService.login({ login, password })
    ).subscribe({
      next: (res) => {
        const token: any = res;
        // console.log(token.access_token);
        sessionStorage.setItem('token', token.access_token);
        window.location.pathname = '/cvs';
        // this.router.navigateByUrl('/cvs', { skipLocationChange: false });
      },
      error: (err) => {
        if (err.status === 0) alert('🖥 Connection to server failed!');
        else if (err.status === 404) this.invalidData = true;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
