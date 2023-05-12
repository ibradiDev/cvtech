import { Component, Input } from '@angular/core';
import { CvService } from 'src/app/services/cv.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tables-view',
  templateUrl: './tables-view.component.html',
  styleUrls: ['./tables-view.component.sass'],
})
export class TablesViewComponent {
  cvs!: any;
  users!: any;
  admins!: any;
  clickedBtn!: string;

  constructor(private cvService: CvService, private userSerivce: UserService) {}
  ngOnInit(): void {
    this.clickedBtn = window.location.pathname.split('/')[2];
    console.log(this.clickedBtn);

    this.userSerivce.getAllUsers().subscribe({
      next: (users) => (this.users = users),
      error: (err) => console.log(err),
    });

    this.userSerivce.getAllAdmins().subscribe({
      next: (admins) => (this.admins = admins),
      error: (err) => console.log(err),
    });

    this.admins = this.userSerivce.getAdmins();
  }
}
