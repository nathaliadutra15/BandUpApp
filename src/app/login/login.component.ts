import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { IUser } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public usuario: IUser = new IUser();
  public isSignup: string;
  public options: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {

  }

  cadUser() {
    console.log("CHAMOU");
    console.log(this.usuario);
  }


  cadastrarUsuario() {
    try {
      if (this.isSignup == "true") {
        let objCadastro = {
          email: this.usuario.email,
          usuario: this.usuario.usuario,
          senha: this.usuario.senha
        }

        this.httpClient.post("http://localhost:3000/user/register/", JSON.stringify(objCadastro), this.options).subscribe((res) => {
          console.log(res);
        }, err => {
          console.log(err);
        });
      }
    } catch (error) {
      console.log("ERRO:" + error);
    }

  }
}

