import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {
  public options: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  private isVisitor: boolean = false;
  private userProfile: string;

  constructor(private authService: AuthService, private router: Router, private httpClient: HttpClient) {
    if (this.authService.getUserAutenticado() != this.userProfile) {
      this.isVisitor = true;
    }
  }

  setUserProfile(username: string) {
    this.userProfile = username;
  }

  getUserProfile() {
    return this.userProfile;
  }

  IsVisitor() {
    return this.isVisitor;
  }

  userDetail():Object {
    try {
      this.httpClient.get(`http://localhost:3000/user/${this.userProfile}`, this.options).subscribe((res) => {
        return res[0];

      }, err => {
        return err;

      });
    } catch (error) {
      return error;
    }

  }

}
