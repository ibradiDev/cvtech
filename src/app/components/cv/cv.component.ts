import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ICv } from './../../interfaces/cv.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Buffer } from 'buffer';
import * as fs from 'fs';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.sass'],
})
export class CvComponent implements OnInit {
  @Input() obj!: any;
  photo!: File;
  cv!: { id: number; firstname: string; lastname: string; photoURL: SafeUrl };

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const buffer = Buffer.from(this.obj.photo_buffer);
    const blob = new Blob([buffer], { type: this.obj.photo_mimetype });
    const url = window.URL.createObjectURL(blob);

    this.cv = {
      id: <number>this.obj.cv_id,
      firstname: this.obj.cv_firstname,
      lastname: this.obj.cv_lastname,
      photoURL: <SafeUrl>this.domSanitizer.bypassSecurityTrustUrl(url),
    };
  }
}
