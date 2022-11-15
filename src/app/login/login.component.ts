import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { IUser } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public usuario: IUser = new IUser();
  public loginType: string;
  public userError: string;
  public options: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) {
    this.loginType = "signin";
  }

  ngOnInit(): void {
  }

  checkTipoLogin() {
    if (this.loginType == "signup") {
      this.cadastrarUsuario();
    } else {
      this.fazerLogin();
    }
  }

  fazerLogin() {
    this.userError = undefined;
    try {
      this.httpClient.get(`http://localhost:3000/user/${this.usuario.usuario}`, this.options).subscribe((res) => {
        this.authService.logar(this.usuario, res[0]);
        if (this.authService.getAutenticacao()) {
          this.router.navigate(['/']);
        } else {
          this.userError = "Usuário e senha não conferem."
        }
      }, err => {
        this.userError = err.error.message;
      })
    } catch (error) {
      console.log("ERRO:" + error);
    }
  }

  cadastrarUsuario() {
    try {
      let objCadastro = {
        email: this.usuario.email,
        usuario: this.usuario.usuario,
        senha: this.usuario.senha,
        nome: null,
        dataNasc: null,
        generoMusical:[],
        instrumentos:[],
        estadoUF: null,
        cidade: null,
        posts: [],
        createdAt: new Date,
        updatedAt: new Date
      }
      this.httpClient.post("http://localhost:3000/user/register/", JSON.stringify(objCadastro), this.options).subscribe((res) => {
      }, err => {
        this.userError = err.error.message;
      });
      this.userError = undefined;
    } catch (error) {
      console.log("ERRO:" + error);
    }
  }
}


