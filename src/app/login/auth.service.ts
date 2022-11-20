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
  
  constructor() { }

  logar(userFromUser: IUser, userFromDB: IUser) {
    if (userFromUser.senha === userFromDB.senha &&
      userFromUser.usuario === userFromDB.usuario) {
      this.usuario = userFromUser.usuario;
      this.autenticado = true;
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
}
