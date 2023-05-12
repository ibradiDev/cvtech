import { UserService } from './services/user.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  SimpleChanges,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'CvTech';
  userRole!: string;
  constructor(private router: Router, private userService: UserService) {}

  static capitalizeFirst(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * Get a token as entry, decode it and return an Obj containing user infos
   *
   * @return Object { username:string, email:string, role:string }
   */
  public static getUserInfosFromToken(token: string): {
    username: string;
    email: string;
    role: string;
  } {
    const data_string = token!.split('.')[1];
    let decodedString: any = Buffer.from(data_string, 'base64').toString(); // <=> atob(data_string)
    decodedString = decodedString.split(',');
    return {
      username: decodedString[0].split(':')[1].replaceAll('"', ''),
      email: decodedString[1].split(':')[1].replaceAll('"', ''),
      role: decodedString[2].split(':')[1].replaceAll('"', ''),
    };
  }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      // Decode the token data string
      const userInfos = AppComponent.getUserInfosFromToken(token);
      this.userRole = AppComponent.capitalizeFirst(userInfos.role);
      // console.log(this.userRole);
    }
  }
}
