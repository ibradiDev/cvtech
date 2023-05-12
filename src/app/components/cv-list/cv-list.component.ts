import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { CvService } from './../../services/cv.service';
import { Component, OnInit } from '@angular/core';
import { Buffer } from 'buffer';
import { CvEntity } from 'src/app/entities/cv/cv.entity';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.sass'],
})
export class CvListComponent implements OnInit {
  obj_array!: any;
  owner!: any;
  user!: any;

  constructor(
    private cvService: CvService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.cvService.getAll().subscribe({
      next: (cvs) => {
        this.obj_array = cvs;
      },
      error: (err) => {
        if (err.status === 401) {
          alert('Token expiré');
          sessionStorage.clear();
          window.location.pathname = 'home';
        }
      },
    });
  }
}
