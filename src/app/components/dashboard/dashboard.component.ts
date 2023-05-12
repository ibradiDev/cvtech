import { IUser } from './../../interfaces/user.interface';
import { ICv } from './../../interfaces/cv.interface';
import { UserService } from './../../services/user.service';
import { CvService } from './../../services/cv.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  // @Input() user!: any;
  cvsAmount: any;
  usersAmount: any;
  adminsAmount: any;
  clickedBtn!: string;

  constructor(private cvService: CvService, private userSerivce: UserService) {}
  ngOnInit(): void {
    this.getCvs();
    this.getAdmins();
    this.getUsers();
  }

  getUsers() {
    // this.clickedBtn = 'users';
    this.userSerivce.getAllUsers().subscribe({
      next: (users: any) => (this.usersAmount = users?.length),
      error: (err) => console.log(err),
    });
  }

  getAdmins() {
    // this.clickedBtn = 'admins';
    // this.admins = this.userSerivce.getAdmins();
    this.userSerivce.getAllAdmins().subscribe({
      next: (admins: any) => (this.adminsAmount = admins?.length),
      error: (err) => console.log(err),
    });
  }

  getCvs() {
    // const token: any = sessionStorage.getItem('token');
    // this.clickedBtn = 'cvs';
    // this.cvService.getAll().subscribe();
    this.cvService.getAllForAdmin().subscribe({
      next: (cvs: any) => (this.cvsAmount = cvs?.length),
      error: (err) => console.log(err),
    });
  }
}
