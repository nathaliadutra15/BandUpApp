import { Injectable } from '@angular/core';
import { IUser } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private autenticado: boolean = false;

  constructor() { }

  logar(userFromUser: IUser, userFromDB: IUser) {
    if (userFromUser.senha === userFromDB.senha &&
      userFromUser.usuario === userFromDB.usuario) {
      this.autenticado = true;
    }
  }

  getAutenticacao(): boolean{
    return this.autenticado;
  }
}
