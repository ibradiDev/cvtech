import { CvService } from 'src/app/services/cv.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cvs-table',
  templateUrl: './cvs-table.component.html',
  styleUrls: ['./cvs-table.component.sass'],
})
export class CvsTableComponent implements OnInit {
  cvs!: any;

  constructor(private cvService: CvService) {}

  ngOnInit(): void {
    // const token: any = sessionStorage.getItem('token');
    this.cvService.getAllForAdmin().subscribe((cvs) => (this.cvs = cvs));
  }
}
