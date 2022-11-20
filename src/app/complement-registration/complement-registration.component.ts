import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-complement-registration',
  templateUrl: './complement-registration.component.html',
  styleUrls: ['./complement-registration.component.scss']
})
export class ComplementRegistrationComponent implements OnInit {
  public options: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public nome;
  public dataNasc;
  public generoMusical;
  public nomesInstrumentos = [];
  public niveisInstrumentos = [];
  public outroNomeInstrumento;
  public outroNivelInstrumento;
  public uf;
  public cidade;

  constructor(private httpClient: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  setInstrumentoChecado(event) {
    this.nomesInstrumentos.push(event.path[0].name.toString());
  }

  setNivelInstrumento(event) {
    this.niveisInstrumentos.push(event.path[0].name.toString());
  }

  setOutroNivelInstrumento(event) {
    this.outroNivelInstrumento = event.path[0].name.toString();
  }

  finalizarCadastro() {
    let objInstrumentos = [];

    this.nomesInstrumentos.forEach(instrumento => {
      this.niveisInstrumentos.forEach(nivel => {
        if (nivel.includes(instrumento)) {
          objInstrumentos.push({
            nomeInstrumento: instrumento,
            nivelExperiencia: nivel
          });
        }
      });
    });

    try {
      let objCadastro = {
        nome: this.nome.toLowerCase(),
        dataNasc: this.dataNasc,
        //generoMusical:[],
        instrumentos:objInstrumentos,
        estadoUF: this.uf,
        cidade: this.cidade.toLowerCase(),
        updatedAt: new Date
      }
      this.httpClient.patch(`http://localhost:3000/user/${this.authService.getSignUpUsername()}`, JSON.stringify(objCadastro), this.options).subscribe((res) => {
      this.router.navigate(['/profile/1']);
    }, err => {
       console.log(err);
      });
      
    } catch (error) {
      console.log("ERRO:" + error);
    } 
  }

}
