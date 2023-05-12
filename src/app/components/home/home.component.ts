import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  autentified!: boolean;

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) this.autentified = true;
    else this.autentified = false;
  }
}
