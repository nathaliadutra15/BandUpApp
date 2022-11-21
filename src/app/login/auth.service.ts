import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private autenticado: boolean = false;
  private usuario: string;
  private userInfo;
  private isSignup: boolean = false;
  private signupUsername: string;
  private userImg;

  public options: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  
  constructor(private httpClient: HttpClient) { }

  logar(userFromUser: IUser, userFromDB: IUser) {
    if (userFromUser.senha === userFromDB.senha &&
      userFromUser.usuario === userFromDB.usuario) {
      this.usuario = userFromUser.usuario;
      this.autenticado = true;
      this.setUserImage();
    }
  }

  getAutenticacao() {
    return this.autenticado;
  }

  getUserAutenticado() {
    return this.usuario;
  }

  setUserInformation(userInformation) {
    this.userInfo = userInformation;
  }

  getUserInformation() {
    return this.userInfo;
  }

  setSignupUsername(username:string){
    this.signupUsername = username;
    this.isSignup = true;
  }

  isSignUp() {
    return this.isSignup;
  }

  getSignUpUsername() {
    return this.signupUsername;
  }

  setUserImage() {
    let img;
    console.log(this.usuario)
    try {
      this.httpClient.get(`http://localhost:3000/user/${this.getUserAutenticado()}`, this.options).subscribe((res) => {
       img = res[0].urlImg;
       console.log(img);
      }, err => {
        console.log(err);
      });
    } catch (error) {
      
    }
    this.userImg = img;
  }

  getUserImage(){
    console.log(this.userImg);
    return this.userImg;
  }

  getUserImageVisitor(username){
    let img;
    console.log(this.usuario)
    try {
      this.httpClient.get(`http://localhost:3000/user/${username}`, this.options).subscribe((res) => {
       img = res[0].urlImg;
       console.log(img);
      }, err => {
        console.log(err);
      });
    } catch (error) {
      
    }

    return img;
  }
}
